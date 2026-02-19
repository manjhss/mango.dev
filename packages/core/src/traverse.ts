import type { LingoDotDevEngine } from "lingo.dev/sdk"

// ─── Skip patterns ────────────────────────────────────────────────────────────

const SKIP_PATTERNS = [
  /^https?:\/\//i, // URLs
  /^ftp:\/\//i, // FTP links
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // email addresses
  /^\d+(\.\d+)?$/, // numbers (integers and decimals)
  /^#[0-9a-fA-F]{3,8}$/, // hex colors
  /^\d{4}-\d{2}-\d{2}/, // dates in YYYY-MM-DD format
  /^[a-z0-9]*[-_][a-z0-9-_]*$/, // slugs (e.g. "hello-world", "user_123")
]

function shouldSkipString(value: string): boolean {
  if (value.trim().length === 0) return true
  return SKIP_PATTERNS.some((pattern) => pattern.test(value.trim()))
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

function isExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.some((excluded) => {
    if (excluded === path) return true
    if (excluded.endsWith("[]")) {
      const base = excluded.slice(0, -2)
      if (path.startsWith(`${base}[`)) return true
    }
    if (excluded.includes("[].")) {
      const regex = new RegExp(
        "^" + excluded.replace(/\[\]/g, "\\[\\d+\\]") + "$"
      )
      if (regex.test(path)) return true
    }
    return false
  })
}

// ─── Core traversal ───────────────────────────────────────────────────────────

export async function traverse(
  value: unknown,
  path: string,
  excludePaths: string[],
  langs: string[],
  sourceLang: string,
  engine: LingoDotDevEngine,
  seen: Set<object>,
  fast?: boolean,
  onProgress?: (progress: number) => void,
): Promise<unknown> {
  if (value === null || value === undefined) return value
  if (typeof value === "number" || typeof value === "boolean") return value

  // string — use batchLocalizeText to translate to all langs in one call
  if (typeof value === "string") {
    if (isExcluded(path, excludePaths)) return value
    if (shouldSkipString(value)) return value

    const targetLangs = langs.filter((l) => l !== sourceLang)
    const result: Record<string, string> = { [sourceLang]: value }

    if (targetLangs.length > 0) {
      try {
        // One API call → all target langs at once
        const translations = await engine.batchLocalizeText(value, {
          sourceLocale: sourceLang as never,
          targetLocales: targetLangs as never[],
          ...(fast !== undefined && { fast }),
        })
        targetLangs.forEach((lang, i) => {
          result[lang] = translations[i] ?? value
        })
      } catch {
        targetLangs.forEach((lang) => { result[lang] = value })
      }
    }

    onProgress?.(100)
    return result
  }

  // array
  if (Array.isArray(value)) {
    if (isExcluded(path, excludePaths)) return value
    const results: unknown[] = []
    for (let i = 0; i < value.length; i++) {
      results.push(
        await traverse(
          value[i],
          `${path}[${i}]`,
          excludePaths,
          langs,
          sourceLang,
          engine,
          seen,
          fast,
          onProgress,
        )
      )
      onProgress?.(Math.round(((i + 1) / value.length) * 100))
    }
    return results
  }

  // object
  if (typeof value === "object") {
    if (seen.has(value as object)) return value
    seen.add(value as object)

    if (isExcluded(path, excludePaths)) {
      seen.delete(value as object)
      return value
    }

    const keys = Object.keys(value as object)
    const result: Record<string, unknown> = {}
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const childPath = path ? `${path}.${key}` : key
      result[key] = await traverse(
        (value as Record<string, unknown>)[key],
        childPath,
        excludePaths,
        langs,
        sourceLang,
        engine,
        seen,
        fast,
        onProgress,
      )
      onProgress?.(Math.round(((i + 1) / keys.length) * 100))
    }

    seen.delete(value as object)
    return result
  }

  return value
}
