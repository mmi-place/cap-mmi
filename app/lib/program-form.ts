import type { Source } from "./data";

export function sourceLines(sources: Source[]): string {
  return sources
    .map((source) => `${source.label} | ${source.url} | ${source.level}`)
    .join("\n");
}

export function parseSourceLines(value: string): Source[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.split("|").map((item) => item.trim()))
    .filter((parts) => parts.length === 3 && parts.every(Boolean))
    .map(([label, url, level]) => ({
      label,
      url,
      level: level as Source["level"],
    }));
}

export function parseListLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
