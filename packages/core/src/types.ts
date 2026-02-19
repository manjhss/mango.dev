// ─── Depth-limited path extraction ───────────────────────────────────────────

type Depth = [never, 0, 1, 2, 3, 4, 5];

/**
 * Extracts all dot-notation paths from a type T with array support and depth limit.
 *
 * Supported formats:
 *   "id"              → primitive field
 *   "user.email"      → nested field
 *   "tags"            → array field
 *   "tags[]"          → all items in array
 *   "users[].name"    → field inside array items
 */
export type Paths<T, Prefix extends string = "", D extends number = 5> = [
  D,
] extends [never]
  ? never
  : {
      [K in keyof T & string]: T[K] extends (infer Item)[]
        ? Item extends object
          ?
              | `${Prefix}${K}`
              | `${Prefix}${K}[]`
              | Paths<Item, `${Prefix}${K}[].`, Depth[D]>
          : `${Prefix}${K}` | `${Prefix}${K}[]`
        : T[K] extends object
          ? `${Prefix}${K}` | Paths<T[K], `${Prefix}${K}.`, Depth[D]>
          : `${Prefix}${K}`;
    }[keyof T & string];

// ─── Translated return type ───────────────────────────────────────────────────

/**
 * Recursively transforms a type T so that:
 *   - excluded fields keep their original type
 *   - string fields become Record<Lang, string>
 *   - string[] fields become Record<Lang, string>[]
 *   - object fields are recursed
 *   - number/boolean/etc stay as-is
 */
export type Translated<T, Excluded extends string, Lang extends string> = {
  [K in keyof T]: K extends Excluded
    ? T[K] // excluded → original type
    : T[K] extends string
      ? Record<Lang, string> // string → multilingual map
      : T[K] extends (infer Item)[]
        ? Item extends string
          ? Record<Lang, string>[] // string[] → translated array
          : Item extends object
            ? Translated<Item, Excluded, Lang>[] // object[] → recurse
            : T[K]
        : T[K] extends object
          ? Translated<T[K], Excluded, Lang> // object → recurse
          : T[K]; // number/bool/etc → as-is
};

// ─── Mango config ─────────────────────────────────────────────────────────────

export interface MangoConfig<Langs extends string[]> {
  api_key: string;
  langs: Langs;
  sourceLang: Langs[number];
  /** Max items per API request (default: 50, max: 250) */
  batchSize?: number;
  /** Target word count per batch (default: 500, max: 2500) */
  idealBatchItemSize?: number;
}

// ─── Translate options ────────────────────────────────────────────────────────

export interface TranslateOptions<Excluded extends string> {
  exclude?: Excluded[];
  /** Prioritize speed over quality */
  fast?: boolean;
  /** Progress callback — called with 0–100 as translation progresses */
  onProgress?: (progress: number) => void;
}
