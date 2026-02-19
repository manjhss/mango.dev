import { createContext } from "react"

export interface MangoContextValue<Langs extends string[] = string[]> {
  lang: Langs[number]
  setLang: (lang: Langs[number]) => void
  langs: Langs
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MangoContext = createContext<MangoContextValue<any> | null>(null)
