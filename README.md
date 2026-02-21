# 🥭 Mango

A type-safe multilingual translation library powered by [lingo.dev](https://lingo.dev). Translate any JavaScript object into multiple languages in one call — with full TypeScript support.

## How it works

Mango follows a clear backend/frontend split:

| Backend | Frontend |
|---|---|
| `mg.translate()` called here | no translation at runtime |
| lingo.dev API called here | just reads `field[lang]` |
| API key stays safe ✅ | `useMango()` to switch lang |
| returns multilingual object | no API calls, instant switch |

**Input →**
```ts
{ title: "Hello World", slug: "hello-world" }
```

**Output →**
```ts
{ title: { en: "Hello World", hi: "नमस्ते दुनिया", fr: "Bonjour le Monde" }, slug: "hello-world" }
```

## Features

- **One call, all languages** — translate any nested object or array in a single `mg.translate()` call
- **Type-safe** — `exclude` paths are autocompleted from your type; return type reflects exactly what changed
- **Smart skipping** — URLs, emails, numbers, dates, slugs, and hex colors are never sent to the API
- **Exclude paths** — opt specific fields out of translation using dot-notation (`"author.email"`, `"tags[]"`)
- **React ready** — `MangoProvider` + `useMango()` hook for instant language switching on the client
- **No API key on client** — translation happens on the server; frontend only reads the result
- **Progress callback** — track translation progress with an `onProgress` handler
- **Fast mode** — trade quality for speed when needed

## Packages

| Package | Description |
|---|---|
| [`@mango/core`](./packages/core) | Core translation engine — `Mango` class, types, traversal logic |
| [`@mango/react`](./packages/react) | React bindings — `MangoProvider`, `useMango()` hook, `t()` helper |

## Quick Start

### 1. Install

```bash
# npm
npm install @mango/core @mango/react

# pnpm
pnpm add @mango/core @mango/react
```

### 2. Define a shared languages constant

```ts
// lib/constants.ts
export const LANGS = ["en", "hi", "fr"] as const
export type Lang = typeof LANGS[number] // "en" | "hi" | "fr"
```

> The same `LANGS` must be used in both `new Mango()` on the server and `<MangoProvider>` on the client.

### 3. Translate on the server

```ts
import { Mango } from "@mango/core"
import { LANGS } from "./lib/constants"

const mango = new Mango({
  api_key: process.env.LINGO_API_KEY!,  // stays on the server ✅
  langs: [...LANGS],
  sourceLang: "en",
})

const post = {
  id: "abc-123",
  title: "Getting Started",
  body: "Welcome to the guide.",
  author: { name: "Jane", email: "jane@example.com" },
}

const translated = await mango.translate(post, {
  exclude: ["id", "author.email"],  // autocompleted from post's type ✅
})

// translated.title        → { en: "Getting Started", hi: "...", fr: "..." }
// translated.id           → "abc-123"           (excluded)
// translated.author.email → "jane@example.com"  (excluded)
```

### 4. Display on the client

```tsx
import { MangoProvider, useMango } from "@mango/react"
import { LANGS } from "./lib/constants"
import type { Translated } from "@mango/core"

type Post = { id: string; title: string; body: string; author: { name: string; email: string } }
type TranslatedPost = Translated<Post, "id" | "author.email", Lang>

export default function Page({ post }: { post: TranslatedPost }) {
  return (
    <MangoProvider langs={[...LANGS]} defaultLang="en">
      <PostView post={post} />
    </MangoProvider>
  )
}

function PostView({ post }: { post: TranslatedPost }) {
  const { t, lang, setLang, langs } = useMango()

  return (
    <article>
      <h1>{t(post.title)}</h1>
      <p>{t(post.body)}</p>

      {langs.map((l) => (
        <button key={l} onClick={() => setLang(l)} disabled={l === lang}>
          {l}
        </button>
      ))}
    </article>
  )
}
```

## Configuration

See individual package docs for full configuration options:

- [`@mango/core` — `MangoConfig`, `TranslateOptions`](./packages/core/README.md#configuration)
- [`@mango/react` — `MangoProviderProps`, `useMango`](./packages/react/README.md#configuration)

## Security

Never use `@mango/core` in client-side (browser) code — the `api_key` will be exposed in your bundle. Always call `mango.translate()` in a server action, API route, or build script. See the [`@mango/core` security guide](./packages/core/README.md#security) for safe patterns.
