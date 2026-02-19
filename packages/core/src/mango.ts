import { LingoDotDevEngine } from "lingo.dev/sdk"
import { traverse } from "./traverse"
import type { MangoConfig, Paths, TranslateOptions, Translated } from "./types"

export class Mango<Langs extends string[]> {
  readonly langs: Langs
  readonly sourceLang: Langs[number]
  private readonly engine: LingoDotDevEngine

  constructor(config: MangoConfig<Langs>) {
    this.langs = config.langs
    this.sourceLang = config.sourceLang
    this.engine = new LingoDotDevEngine({
      apiKey: config.api_key,
      ...(config.batchSize !== undefined && { batchSize: config.batchSize }),
      ...(config.idealBatchItemSize !== undefined && { idealBatchItemSize: config.idealBatchItemSize }),
    })
  }

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
      seen,
      options?.fast,
      options?.onProgress,
    )

    return result as Translated<T, Excluded, Langs[number]>
  }
}
