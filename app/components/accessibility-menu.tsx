"use client";

import {
  Accessibility,
  Check,
  RotateCcw,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type TextSize = "normal" | "large" | "xlarge";
type ReadingBackground = "standard" | "ivory" | "blue";

type AccessibilitySettings = {
  contrast: boolean;
  readableFont: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  textSize: TextSize;
  readingBackground: ReadingBackground;
};

const STORAGE_KEY = "cap-mmi-accessibility";

const defaultSettings: AccessibilitySettings = {
  contrast: false,
  readableFont: false,
  underlineLinks: false,
  reduceMotion: false,
  textSize: "normal",
  readingBackground: "standard",
};

const textSizes: { value: TextSize; label: string; sample: string }[] = [
  { value: "normal", label: "Normal", sample: "100 %" },
  { value: "large", label: "Grand", sample: "112 %" },
  { value: "xlarge", label: "Très grand", sample: "125 %" },
];

const backgrounds: { value: ReadingBackground; label: string; color: string }[] = [
  { value: "standard", label: "Clair", color: "bg-white" },
  { value: "ivory", label: "Ivoire", color: "bg-[#fff4d6]" },
  { value: "blue", label: "Bleu pâle", color: "bg-[#eaf4ff]" },
];

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.dataset.contrast = settings.contrast ? "high" : "standard";
  root.dataset.readableFont = settings.readableFont ? "true" : "false";
  root.dataset.underlineLinks = settings.underlineLinks ? "true" : "false";
  root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  root.dataset.textSize = settings.textSize;
  root.dataset.readingBackground = settings.readingBackground;
}

function isAccessibilitySettings(value: unknown): value is AccessibilitySettings {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AccessibilitySettings>;
  return (
    typeof candidate.contrast === "boolean" &&
    typeof candidate.readableFont === "boolean" &&
    typeof candidate.underlineLinks === "boolean" &&
    typeof candidate.reduceMotion === "boolean" &&
    ["normal", "large", "xlarge"].includes(candidate.textSize ?? "") &&
    ["standard", "ivory", "blue"].includes(
      candidate.readingBackground ?? "",
    )
  );
}

function readStoredSettings(): AccessibilitySettings {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    if (isAccessibilitySettings(parsed)) return parsed;
  } catch {
    return defaultSettings;
  }
  return defaultSettings;
}

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applySettings(readStoredSettings());
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      )
        setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const updateSettings = (next: AccessibilitySettings) => {
    setSettings(next);
    applySettings(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The options still apply for the current page when storage is blocked.
    }
  };

  const toggle = (
    key: "contrast" | "readableFont" | "underlineLinks" | "reduceMotion",
  ) => updateSettings({ ...settings, [key]: !settings[key] });

  const reset = () => {
    updateSettings(defaultSettings);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false);
            return;
          }
          const stored = readStoredSettings();
          setSettings(stored);
          applySettings(stored);
          setOpen(true);
        }}
        className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
        aria-label="Ouvrir les options d’accessibilité"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        title="Options d’accessibilité"
      >
        <Accessibility size={19} aria-hidden="true" />
      </button>

      {open && (
        <div
          id="accessibility-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="accessibility-title"
          className="fixed inset-x-0 top-16 z-[80] max-h-[calc(100vh-4rem)] overflow-y-auto rounded-b-3xl border-y border-slate-300 bg-white p-5 text-slate-950 shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[390px] sm:rounded-3xl sm:border"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-teal-700">
                Affichage et navigation
              </p>
              <h2 id="accessibility-title" className="mt-1 text-xl font-bold">
                Options d’accessibilité
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
              aria-label="Fermer les options d’accessibilité"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Ces choix sont enregistrés uniquement dans ce navigateur.
          </p>

          <fieldset className="mt-5 border-t border-slate-200 pt-4">
            <legend className="text-sm font-bold">Taille du texte</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {textSizes.map((size) => (
                <label
                  key={size.value}
                  className={`accessibility-choice cursor-pointer rounded-xl border p-2.5 text-center ${settings.textSize === size.value ? "border-teal-700 bg-teal-50 text-teal-950" : "border-slate-200 bg-white text-slate-700"}`}
                >
                  <input
                    type="radio"
                    name="accessibility-text-size"
                    value={size.value}
                    checked={settings.textSize === size.value}
                    onChange={() =>
                      updateSettings({ ...settings, textSize: size.value })
                    }
                    className="sr-only"
                  />
                  <span className="block text-sm font-semibold">{size.label}</span>
                  <span className="mt-1 block text-xs opacity-70">{size.sample}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5 border-t border-slate-200 pt-4">
            <legend className="text-sm font-bold">Fond de lecture complet</legend>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Le fond choisi s’applique aussi aux cartes, formulaires et panneaux.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {backgrounds.map((background) => (
                <label
                  key={background.value}
                  className={`accessibility-choice cursor-pointer rounded-xl border p-2.5 text-center text-slate-900 ${settings.readingBackground === background.value ? "border-teal-700 ring-2 ring-teal-700/15" : "border-slate-200"} ${background.color}`}
                >
                  <input
                    type="radio"
                    name="accessibility-background"
                    value={background.value}
                    checked={settings.readingBackground === background.value}
                    onChange={() =>
                      updateSettings({
                        ...settings,
                        readingBackground: background.value,
                      })
                    }
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">{background.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 space-y-2 border-t border-slate-200 pt-4">
            {[
              ["contrast", "Contraste noir sur blanc", "Supprime les couleurs décoratives et renforce toutes les bordures"],
              ["readableFont", "Police OpenDyslexic", "Police conçue pour la dyslexie, avec lignes et mots plus espacés"],
              ["underlineLinks", "Souligner les liens", "Repérer les liens sans dépendre de la couleur"],
              ["reduceMotion", "Réduire les animations", "Désactiver transitions et déplacements"],
            ].map(([key, label, description]) => {
              const settingKey = key as
                | "contrast"
                | "readableFont"
                | "underlineLinks"
                | "reduceMotion";
              const enabled = settings[settingKey];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(settingKey)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 p-3 text-left hover:border-teal-300"
                  aria-pressed={enabled}
                >
                  <span>
                    <strong className="block text-sm text-slate-950">{label}</strong>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-600">
                      {description}
                    </span>
                  </span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full border ${enabled ? "border-teal-700 bg-teal-700 text-white" : "border-slate-300 bg-white text-transparent"}`}
                    aria-hidden="true"
                  >
                    <Check size={15} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/methode#accessibilite"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-teal-800 underline underline-offset-4"
            >
              Démarche d’accessibilité
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              <RotateCcw size={15} aria-hidden="true" />
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
