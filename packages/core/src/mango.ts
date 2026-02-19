import { LingoDotDevEngine } from "lingo.dev/sdk"
import { traverse } from "./traverse"
import type { MangoConfig, Paths, TranslateOptions, Translated } from "./types"

/**
 * Mango — type-safe multilingual translation layer over lingo.dev SDK.
 *
 * @example
 * const mg = new Mango({
 *   api_key: process.env.LINGO_API_KEY!,
 *   langs: ["en", "hi", "fr"],
 *   sourceLang: "en"
 * })
 *
 * const translated = await mg.translate<Product>(data, {
 *   exclude: ["id", "user.email"]
 * })
 * // { id: 1, name: { en: "Apple", hi: "सेब", fr: "Pomme" } }
 */
export class Mango<Langs extends string[]> {
  readonly langs: Langs
  readonly sourceLang: Langs[number]
  private readonly engine: LingoDotDevEngine

  constructor(config: MangoConfig<Langs>) {
    this.langs = config.langs
    this.sourceLang = config.sourceLang
    this.engine = new LingoDotDevEngine({ apiKey: config.api_key })
  }

  /**
   * Translates any JavaScript data structure into a multilingual map.
   *
   * - Strings become `Record<Lang, string>`
   * - Excluded paths keep their original type
   * - Numbers, booleans, null, undefined pass through unchanged
   * - Arrays and nested objects are recursed
   * - Circular references are handled safely
   *
   * @param data - The data to translate (any JS value)
   * @param options - Optional config: `exclude` paths to skip
   * @returns Promise resolving to the translated structure
   */
  async translate<T, Excluded extends Paths<T> = never>(
    data: T,
    options?: TranslateOptions<Excluded>
  ): Promise<Translated<T, Excluded, Langs[number]>> {
    const excludePaths = (options?.exclude ?? []) as string[]
    const seen = new Set<object>()

    const result = await traverse(
      data,
      "",
      excludePaths,
      this.langs as string[],
      this.sourceLang as string,
      this.engine,
      seen
    )

    return result as Translated<T, Excluded, Langs[number]>
  }
}
