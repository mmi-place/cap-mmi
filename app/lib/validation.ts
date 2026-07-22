import { z } from "zod";

const shortText = z.string().trim().min(1).max(300);
const longText = z.string().trim().min(1).max(5000);

export const sourceSchema = z.object({
  label: shortText,
  url: z.string().trim().url().max(1000).refine(
    (value) => value.startsWith("https://") || value.startsWith("http://"),
    "La source doit utiliser HTTP ou HTTPS.",
  ),
  level: z.enum(["officielle", "institution", "secondaire", "linkedin"]),
});

const statisticsSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  places: z.number().int().nonnegative().nullable(),
  applicants: z.number().int().nonnegative().nullable(),
  overallOfferRate: z.number().min(0).max(100).nullable(),
  but3Applicants: z.number().int().nonnegative().nullable(),
  but3Offers: z.number().int().nonnegative().nullable(),
  but3OfferRate: z.number().min(0).max(100).nullable(),
  but3Acceptances: z.number().int().nonnegative().nullable(),
  warning: z.string().trim().max(2000),
});

export const programSchema = z.object({
  id: z.string().trim().min(3).max(140).regex(/^[a-z0-9-]+$/),
  type: z.enum(["master", "ingenieur", "autre"]),
  institution: shortText,
  degree: shortText,
  title: shortText,
  specialty: shortText,
  status: shortText,
  recognition: shortText,
  city: shortText,
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  region: shortText,
  mode: shortText,
  entry: shortText,
  directYear2: shortText,
  duration: shortText,
  cost: shortText,
  capacity: z.number().int().nonnegative().nullable(),
  portfolio: shortText,
  mmiEligibility: longText,
  evidence: z.enum(["verifie", "estimation", "inconnu", "contradictoire"]),
  confidence: z.enum(["forte", "moyenne", "faible"]),
  prerequisites: z.array(shortText).max(30),
  outcomes: z.array(shortText).max(30),
  statistics: statisticsSchema.optional(),
  sources: z.array(sourceSchema).min(1).max(30),
  verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dataVersion: z.string().trim().min(1).max(40),
  note: z.string().trim().max(5000).optional(),
});

export const contributionInputSchema = z.object({
  kind: z.enum(["erreur", "modification", "ajout"]),
  programId: z.string().trim().max(140).optional().default(""),
  name: z.string().trim().max(120).optional().default(""),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]).optional().default(""),
  message: z.string().trim().min(20).max(5000),
  sourceUrls: z.array(
    z.string().trim().url().max(1000).refine(
      (value) => value.startsWith("https://") || value.startsWith("http://"),
      "Les sources doivent utiliser HTTP ou HTTPS.",
    ),
  ).max(5).default([]),
  website: z.string().max(0).optional().default(""),
});

export type ContributionInput = z.infer<typeof contributionInputSchema>;
