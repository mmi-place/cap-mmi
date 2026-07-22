import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { programs as basePrograms, type Program, type Source } from "./data";
import { programSchema, type ContributionInput } from "./validation";

export type ProposalStatus = "pending" | "approved" | "rejected";
export type Proposal = Omit<ContributionInput, "website"> & {
  id: string;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
};

type StoredContent = {
  version: 1;
  programEdits: Record<string, Program>;
  addedPrograms: Program[];
  proposals: Proposal[];
};

const emptyStore = (): StoredContent => ({
  version: 1,
  programEdits: {},
  addedPrograms: [],
  proposals: [],
});

const dataDirectory =
  process.env.APP_DATA_DIR ||
  path.join(/* turbopackIgnore: true */ process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "content.json");
let writeQueue: Promise<void> = Promise.resolve();

async function readStore(): Promise<StoredContent> {
  try {
    const raw = JSON.parse(await readFile(dataFile, "utf8")) as Partial<StoredContent>;
    const programEdits = Object.fromEntries(
      Object.entries(raw.programEdits || {}).map(([id, program]) => [
        id,
        programSchema.parse(program),
      ]),
    );
    return {
      version: 1,
      programEdits,
      addedPrograms: (raw.addedPrograms || []).map((program) =>
        programSchema.parse(program),
      ),
      proposals: Array.isArray(raw.proposals) ? raw.proposals : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyStore();
    throw error;
  }
}

async function writeStore(store: StoredContent): Promise<void> {
  await mkdir(dataDirectory, { recursive: true, mode: 0o750 });
  const temporaryFile = `${dataFile}.${process.pid}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(store, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporaryFile, dataFile);
}

async function mutateStore<T>(
  mutation: (store: StoredContent) => T | Promise<T>,
): Promise<T> {
  let result!: T;
  writeQueue = writeQueue
    .catch(() => undefined)
    .then(async () => {
      const store = await readStore();
      result = await mutation(store);
      await writeStore(store);
    });
  await writeQueue;
  return result;
}

export async function getPrograms(): Promise<Program[]> {
  const store = await readStore();
  const base = basePrograms.map((program) => store.programEdits[program.id] || program);
  return [...base, ...store.addedPrograms];
}

export async function getAllSources(): Promise<Source[]> {
  const programs = await getPrograms();
  return Array.from(
    new Map(
      programs.flatMap((program) => program.sources).map((source) => [source.url, source]),
    ).values(),
  );
}

export async function saveProgram(input: unknown): Promise<Program> {
  const program = programSchema.parse(input);
  return mutateStore((store) => {
    const baseExists = basePrograms.some((item) => item.id === program.id);
    const addedIndex = store.addedPrograms.findIndex((item) => item.id === program.id);
    if (baseExists) store.programEdits[program.id] = program;
    else if (addedIndex >= 0) store.addedPrograms[addedIndex] = program;
    else store.addedPrograms.push(program);
    return program;
  });
}

export async function addProposal(input: ContributionInput): Promise<Proposal> {
  return mutateStore((store) => {
    const now = new Date().toISOString();
    const proposal: Proposal = {
      id: randomUUID(),
      kind: input.kind,
      programId: input.programId,
      name: input.name,
      email: input.email,
      message: input.message,
      sourceUrls: input.sourceUrls,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    store.proposals.unshift(proposal);
    return proposal;
  });
}

export async function getProposals(): Promise<Proposal[]> {
  return (await readStore()).proposals;
}

export async function setProposalStatus(
  id: string,
  status: ProposalStatus,
): Promise<Proposal | null> {
  return mutateStore((store) => {
    const proposal = store.proposals.find((item) => item.id === id);
    if (!proposal) return null;
    proposal.status = status;
    proposal.updatedAt = new Date().toISOString();
    return proposal;
  });
}
