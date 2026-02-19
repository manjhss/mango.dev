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

  /**
   * Resolves a multilingual field to the current language string.
   * Falls back to the first lang in the array (sourceLang) if the
   * current lang is missing.
   *
   * @example
   * t(post.title)  // returns post.title[lang] or post.title[langs[0]]
   */
  function t(field: Record<string, string>): string {
    return field[ctx.lang] ?? field[ctx.langs[0]] ?? ""
  }

  return {
    /** Current active language */
    lang: ctx.lang as Langs[number],
    /** Switch to a different language (type-safe — only accepts langs in provider) */
    setLang: ctx.setLang as (lang: Langs[number]) => void,
    /** Resolve a multilingual field to the current language string */
    t,
    /** All available languages */
    langs: ctx.langs as Langs,
  }
}
