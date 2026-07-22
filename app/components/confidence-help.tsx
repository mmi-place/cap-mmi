"use client";

import type { Confidence, Evidence } from "../lib/data";
import { InfoTooltip } from "./info-tooltip";

const evidenceHelp: Record<Evidence, string> = {
  verifie:
    "Source officielle ou page de l’établissement confirmant directement l’information. Vérifiez l’année.",
  estimation:
    "Lecture reconstituée à partir d’indices concordants. À confirmer auprès de l’établissement.",
  inconnu:
    "Aucune preuve suffisante. Cela ne signifie ni acceptation ni refus.",
  contradictoire:
    "Les sources divergent. Consultez les preuves et demandez une confirmation écrite.",
};

const confidenceHelp: Record<Confidence, string> = {
  forte:
    "Confiance forte : plusieurs sources primaires concordent. Une estimation reste non officielle.",
  moyenne:
    "Confiance moyenne : une source institutionnelle soutient la lecture. Confirmation recommandée.",
  faible:
    "Confiance faible : indice secondaire, ancien ou incomplet. Confirmation écrite indispensable.",
};

export const chanceEstimateHelp =
  "La chance estimée combine le classement approximatif, la compatibilité MMI publiée et, lorsqu’il existe, le taux de proposition aux BUT3. C’est un repère qualitatif, jamais une probabilité individuelle d’admission.";

export const but3RateHelp =
  "Le taux BUT3 correspond aux propositions reçues par l’ensemble des candidats issus d’un BUT3. Il ne mesure pas le taux d’admission des seuls étudiants MMI.";

type EvidenceIndicatorProps = {
  evidence: Evidence;
  confidence: Confidence;
  label?: string;
  className?: string;
};

export function EvidenceIndicator({
  evidence,
  confidence,
  label,
  className = "",
}: EvidenceIndicatorProps) {
  const visibleLabel =
    label ??
    (evidence === "verifie"
      ? "Vérifié"
      : evidence === "estimation"
        ? `Estimation · confiance ${confidence}`
        : evidence === "contradictoire"
          ? `Contradictoire · confiance ${confidence}`
          : `Inconnu · confiance ${confidence}`);

  return (
    <InfoTooltip
      label={`Comprendre le niveau de preuve : ${visibleLabel}`}
      text={`${evidenceHelp[evidence]} ${confidenceHelp[confidence]}`}
    >
      <span className={className}>{visibleLabel}</span>
    </InfoTooltip>
  );
}
