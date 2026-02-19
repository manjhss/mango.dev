"use client"

import { useContext } from "react"
import { MangoContext } from "./context"

/**
 * useMango — access the current language, switch languages, and translate fields.
 *
 * Must be used inside a <MangoProvider>.
 *
 * @example
 * const { lang, setLang, t } = useMango()
 *
 * <h1>{t(post.title)}</h1>
 * <button onClick={() => setLang("hi")}>हिंदी</button>
 */
export function useMango<Langs extends string[]>() {
  const ctx = useContext(MangoContext)

  if (!ctx) {
    throw new Error(
      "[Mango] useMango() must be used inside a <MangoProvider>. " +
        "Wrap your app (or the relevant subtree) with <MangoProvider langs={LANGS} defaultLang=\"en\">."
    )
  }

  const context = ctx

  /**
   * Resolves any field — translated or not — to a displayable value.
   *
   * - Multilingual map → returns field[lang] with fallback to langs[0]
   * - Primitive (string, number, boolean) → returns as-is
   *
   * @example
   * t(post.title)   // { en: "Hello", hi: "नमस्ते" } → "Hello" or "नमस्ते"
   * t(post.id)      // 42 → 42
   * t(post.slug)    // "hello-world" → "hello-world"
   */
  function t(field: Record<string, string> | string | number | boolean): string | number | boolean {
    if (field === null || field === undefined) return ""
    if (typeof field !== "object") return field
    return field[context.lang] ?? field[context.langs[0]] ?? ""
  }

  return {
    /** Current active language */
    lang: context.lang as Langs[number],
    /** Switch to a different language (type-safe — only accepts langs in provider) */
    setLang: context.setLang as (lang: Langs[number]) => void,
    /** Resolve a multilingual field to the current language string */
    t,
    /** All available languages */
    langs: context.langs as Langs,
  }
}
