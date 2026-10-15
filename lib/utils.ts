export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** 2 -> "02" */
export function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const CARD_RADIUS = "rounded-3xl sm:rounded-4xl";
