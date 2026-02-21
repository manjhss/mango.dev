"use client"

import { MangoProvider as MangoProviderInner } from "@mango.dev/react"

interface MangoProviderProps<Langs extends string[]> {
  langs: Langs
  defaultLang: Langs[number]
  children?: React.ReactNode
}

export function MangoProvider<Langs extends string[]>({
  children,
  ...props
}: MangoProviderProps<Langs>) {
  return <MangoProviderInner {...props}>{children as any}</MangoProviderInner>
}
