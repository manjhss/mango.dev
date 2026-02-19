import type { LingoDotDevEngine } from "lingo.dev/sdk"

// ─── Skip patterns ────────────────────────────────────────────────────────────

const SKIP_PATTERNS = [
  /^https?:\/\//i,                          // URLs
  /^ftp:\/\//i,                             // FTP URLs
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // emails
  /^\d+(\.\d+)?$/,                          // pure numbers as strings
  /^#[0-9a-fA-F]{3,8}$/,                   // hex colors
  /^\d{4}-\d{2}-\d{2}/,                    // ISO dates
  /^[a-z0-9-_]+$/,                          // slugs / identifiers
]

function shouldSkipString(value: string): boolean {
  if (value.trim().length === 0) return true
  return SKIP_PATTERNS.some((pattern) => pattern.test(value.trim()))
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

function isExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.some((excluded) => {
    // exact match
    if (excluded === path) return true
    // array wildcard: "tags[]" matches "tags[0]", "tags[1]", etc.
    if (excluded.endsWith("[]")) {
      const base = excluded.slice(0, -2)
      if (path.startsWith(`${base}[`)) return true
    }
    // nested array wildcard: "users[].name" matches "users[0].name"
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
  seen: Set<object>
): Promise<unknown> {
  // null / undefined / number / boolean → return as-is
  if (value === null || value === undefined) return value
  if (typeof value === "number" || typeof value === "boolean") return value

  // string
  if (typeof value === "string") {
    // excluded path → return as-is
    if (isExcluded(path, excludePaths)) return value
    // skip patterns (URLs, emails, dates, slugs…) → return as-is
    if (shouldSkipString(value)) return value

    // translate: call lingo.dev localizeObject for each target lang
    const targetLangs = langs.filter((l) => l !== sourceLang)

    // Build the multilingual map starting with sourceLang
    const result: Record<string, string> = { [sourceLang]: value }

    if (targetLangs.length > 0) {
      try {
        // localizeObject accepts { [key]: string } and returns translated map
        const translated = await engine.localizeObject(
          { text: value },
          { sourceLocale: sourceLang, targetLocale: targetLangs[0] }
        )
        // Fill all target langs — lingo.dev returns one locale at a time
        // so we call it per target lang
        result[targetLangs[0]] = (translated as Record<string, string>).text ?? value

        // For remaining langs, call separately
        for (let i = 1; i < targetLangs.length; i++) {
          const lang = targetLangs[i]
          try {
            const t = await engine.localizeObject(
              { text: value },
              { sourceLocale: sourceLang, targetLocale: lang }
            )
            result[lang] = (t as Record<string, string>).text ?? value
          } catch {
            result[lang] = value // fallback to source
          }
        }
      } catch {
        // fallback: fill all langs with source value
        for (const lang of targetLangs) {
          result[lang] = value
        }
      }
    }

    return result
  }

  // array
  if (Array.isArray(value)) {
    if (isExcluded(path, excludePaths)) return value
    const results: unknown[] = []
    for (let i = 0; i < value.length; i++) {
      const itemPath = `${path}[${i}]`
      results.push(
        await traverse(
          value[i],
          itemPath,
          excludePaths,
          langs,
          sourceLang,
          engine,
          seen
        )
      )
    }
    return results
  }

  // object
  if (typeof value === "object") {
    // circular reference guard
    if (seen.has(value as object)) return value
    seen.add(value as object)

    if (isExcluded(path, excludePaths)) {
      seen.delete(value as object)
      return value
    }

    const result: Record<string, unknown> = {}
    for (const key of Object.keys(value as object)) {
      const childPath = path ? `${path}.${key}` : key
      result[key] = await traverse(
        (value as Record<string, unknown>)[key],
        childPath,
        excludePaths,
        langs,
        sourceLang,
        engine,
        seen
      )
    }

    seen.delete(value as object)
    return result
  }

  // fallback
  return value
}
