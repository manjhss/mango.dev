# @mango.dev/core

A TypeScript-first library that translates any JavaScript object into multiple languages in one call, powered by [lingo.dev](https://lingo.dev).

## Features

- **Deep object traversal** — translates strings inside nested objects, arrays, and mixed structures
- **Type-safe API** — `Paths<T>` and `Translated<T, Excluded, Lang>` utility types give full IntelliSense on your data shape
- **Smart skipping** — automatically ignores URLs, emails, numbers, hex colors, dates, and slugs
- **Exclude paths** — opt specific fields out of translation using dot-notation paths (`"user.email"`, `"tags[]"`)
- **Progress callback** — receive 0–100 progress updates during translation
- **Fast mode** — trade quality for speed when needed
- **Configurable batching** — tune `batchSize` and `idealBatchItemSize` for your use case

## Installation

```bash
# npm
npm install @mango.dev/core

# pnpm
pnpm add @mango.dev/core

# yarn
yarn add @mango.dev/core
```

## Usage

### Basic example

```ts
import { Mango } from "@mango.dev/core";

// Get your API key at https://lingo.dev — free Hobby tier is sufficient
// Store it in an environment variable, never hardcode it
const mango = new Mango({
  api_key: process.env.LINGODOTDEV_API_KEY!,
  langs: ["en", "es", "fr", "de"],
  sourceLang: "en",
});

const data = {
  title: "Hello World",
  description: "A simple greeting",
};

const translated = await mango.translate(data);

// translated.title  → { en: "Hello World", es: "Hola Mundo", fr: "Bonjour le Monde", de: "Hallo Welt" }
// translated.description → { en: "...", es: "...", fr: "...", de: "..." }
```

### Nested objects & arrays

```ts
const product = {
  id: "prod-123",           // skipped — slug pattern
  price: 9.99,              // skipped — number
  name: "Running Shoes",
  tags: ["sport", "outdoor"],
  details: {
    material: "Mesh",
    care: "Machine washable",
  },
};

const result = await mango.translate(product);
// result.name     → { en: "Running Shoes", es: "Zapatos para Correr", ... }
// result.tags[0]  → { en: "sport", es: "deporte", ... }
// result.id       → "prod-123"  (unchanged)
// result.price    → 9.99        (unchanged)
```

### Translating an array of items

Wrap arrays in an object so that `exclude` autocomplete shows real field names instead of array prototype methods (`map`, `at`, `concat`…).

```ts
const posts = [
  { id: 1, title: "Hello World", body: "My first post." },
  { id: 2, title: "Getting Started", body: "Here is how to begin." },
];

// ✅ wrap in an object
const result = await mango.translate({ posts });

// result.posts[0].title → { en: "Hello World", es: "Hola Mundo", fr: "Bonjour le Monde", ... }
// result.posts[0].body  → { en: "My first post.", es: "Mi primera publicación.", ... }
// result.posts[0].id    → 1  (unchanged — number)
```

### Excluding paths

```ts
const article = {
  slug: "my-article",
  author: "jane@example.com",
  title: "Getting Started",
  body: "Welcome to the guide.",
};

const result = await mango.translate(article, {
  exclude: ["slug", "author"],
});

// result.slug   → "my-article"      (excluded)
// result.author → "jane@example.com" (excluded)
// result.title  → { en: "...", es: "...", ... }
```

### Progress tracking

```ts
const result = await mango.translate(largeDataset, {
  onProgress: (progress) => {
    console.log(`Translation progress: ${progress}%`);
  },
});
```

### Fast mode

```ts
const result = await mango.translate(data, { fast: true });
```

## Configuration

### `MangoConfig`

| Option               | Type       | Required | Default | Description                                      |
| -------------------- | ---------- | -------- | ------- | ------------------------------------------------ |
| `api_key`            | `string`   | ✅        | —       | Your [lingo.dev](https://lingo.dev) API key — get one free at lingo.dev |
| `langs`              | `string[]` | ✅        | —       | All languages to translate into (includes source)|
| `sourceLang`         | `string`   | ✅        | —       | The language of the input data                   |
| `batchSize`          | `number`   | ❌        | `50`    | Max items per API request (max: 250)             |
| `idealBatchItemSize` | `number`   | ❌        | `500`   | Target word count per batch (max: 2500)          |

### `TranslateOptions`

| Option       | Type                        | Description                                        |
| ------------ | --------------------------- | -------------------------------------------------- |
| `exclude`    | `Paths<T>[]`                | Dot-notation paths to skip during translation      |
| `fast`       | `boolean`                   | Prioritize speed over translation quality          |
| `onProgress` | `(progress: number) => void`| Callback fired with progress value between 0–100  |

## Security

`@mango.dev/core` requires a lingo.dev API key. **Never use it in client-side (browser) code** — the key will be exposed in your JavaScript bundle.

**Safe patterns:**

- **Server actions / API routes** — call `mango.translate()` on the server only. The key never reaches the client.

  ```ts
  // app/actions.ts (Next.js server action)
  "use server";
  import { Mango } from "@mango.dev/core";

  const mango = new Mango({ api_key: process.env.LINGODOTDEV_API_KEY!, ... });

  export async function translatePosts(posts) {
    return mango.translate({ posts });
  }
  ```

- **Build-time translation** — translate once during the build, persist the results, and ship only the translated data to the client. No API key in production at all.

- **Environment variable** — always load the key from an environment variable, never hardcode it.

  ```ts
  const mango = new Mango({ api_key: process.env.LINGODOTDEV_API_KEY!, ... });
  ```

## Type Utilities

### `Paths<T>`

> **Not intended for direct use.** `Paths<T>` works silently behind the scenes to power autocomplete and type-checking on the `exclude` option. You never need to import or call it yourself.

### `Translated<T, Excluded, Lang>`

Transforms a type so that all non-excluded string fields become `Record<Lang, string>`.

```ts
type Result = Translated<{ title: string; id: string }, "id", "en" | "es">
// → { title: Record<"en" | "es", string>; id: string }
```

## How it works

`mg.translate()` does three things in sequence: **traverse → skip → translate**.

```
mg.translate({ posts }, { exclude: ["posts[].id"] })
         |
         v
+-----------------------------------------------------+
|                   traverse()                        |
|                                                     |
|  walks every node in the object tree recursively    |
|                                                     |
|  for each node:                                     |
|                                                     |
|  number / boolean -----------------> return as-is   |
|                                                     |
|  string                                             |
|    +-- excluded path? -----------> return as-is     |
|    +-- URL / email / slug /                         |
|    |   hex / date / number? ------> return as-is    |
|    +-- translatable                                 |
|              |                                      |
|              v                                      |
|    engine.batchLocalizeText(value, {                |
|      sourceLocale: "en",                            |
|      targetLocales: ["hi", "fr"]  <- one API call   |
|    })                               per string      |
|              |                                      |
|              v                                      |
|    { en: "...", hi: "...", fr: "..." }              |
|                                                     |
|  array  --> recurse each item with indexed path     |
|  object --> recurse each key with dot-notation      |
+-----------------------------------------------------+
         |
         v
  Translated<T, Excluded, Lang>  <- fully typed result
```

**Key behaviours:**
- Each translatable string is one `batchLocalizeText` call — all target languages returned at once, not one call per language
- Circular references are tracked via a `seen: Set<object>` and safely skipped
- `exclude` paths support dot-notation (`"author.email"`), array wildcards (`"tags[]"`), and nested array fields (`"posts[].id"`)

## How Lingo.dev is used

Mango.dev doesn't implement any translation logic itself. Under the hood it uses `LingoDotDevEngine` from the [lingo.dev SDK](https://lingo.dev):

```
new Mango({ api_key, langs })
        |
        v
  LingoDotDevEngine          <- from "lingo.dev/sdk"
        |
        +-- handles API communication
        +-- batches strings for efficiency
        +-- retries on failure
        +-- batchLocalizeText(value, { sourceLocale, targetLocales })
```

Mango.dev's job is the layer on top — traversing your object tree, deciding what to skip, mapping results back to the original shape, and exposing a type-safe TypeScript API. The actual AI translation is entirely handled by Lingo.dev.
