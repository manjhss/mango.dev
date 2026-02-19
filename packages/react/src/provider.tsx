"use client"

import React, { useState } from "react"
import { MangoContext } from "./context"

export interface MangoProviderProps<Langs extends string[]> {
  /** All supported languages — must match what Mango class was initialized with */
  langs: Langs
  /** Default active language shown on first render */
  defaultLang: Langs[number]
  children: React.ReactNode
}

/**
 * MangoProvider — wraps your app and provides language context.
 *
 * No API key needed here — translation happens on the backend.
 * This is purely for reading and switching the active language.
 *
 * @example
 * const LANGS = ["en", "hi", "fr"] as const
 *
 * <MangoProvider langs={LANGS} defaultLang="en">
 *   <App />
 * </MangoProvider>
 */
export function MangoProvider<Langs extends string[]>({
  langs,
  defaultLang,
  children,
}: MangoProviderProps<Langs>) {
  const [lang, setLang] = useState<Langs[number]>(defaultLang)

  return (
    <MangoContext.Provider value={{ lang, setLang, langs }}>
      {children}
    </MangoContext.Provider>
  )
}
