export const LANGS = ["en", "hi", "fr"] as const;
export type Lang = (typeof LANGS)[number];
