# @mango/core

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
npm install @mango/core

# pnpm
pnpm add @mango/core

# yarn
yarn add @mango/core
```

## Usage

### Basic example

```ts
import { Mango } from "@mango/core";

const mango = new Mango({
  api_key: "your-lingo-dev-api-key",
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
| `api_key`            | `string`   | ✅        | —       | Your lingo.dev API key                           |
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

`@mango/core` requires a lingo.dev API key. **Never use it in client-side (browser) code** — the key will be exposed in your JavaScript bundle.

**Safe patterns:**

- **Server actions / API routes** — call `mango.translate()` on the server only. The key never reaches the client.

  ```ts
  // app/actions.ts (Next.js server action)
  "use server";
  import { Mango } from "@mango/core";

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
