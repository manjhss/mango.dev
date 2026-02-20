# @mango/react

React bindings for `@mango/core` — provides a context provider and hook to read and switch languages in your React app.

## Features

- **`MangoProvider`** — wraps your app and supplies language context to all child components
- **`useMango`** hook — access the current language, switch languages, and resolve multilingual fields
- **`t()` helper** — resolves any translated field (or plain primitive) to a displayable string for the active language
- **Type-safe language switching** — `setLang` only accepts languages defined in the provider
- **Fallback support** — if a translation is missing for the active language, falls back to the first language in the list
- **React 18+ compatible**, built for client components

## Installation

```bash
# npm
npm install @mango/react @mango/core

# pnpm
pnpm add @mango/react @mango/core

# yarn
yarn add @mango/react @mango/core
```

**Peer dependencies:** `react >= 18`, `react-dom >= 18`

## Usage

### 1. Wrap your app with `MangoProvider`

The `langs` array **must match exactly** what you passed to `new Mango({ langs })` in your backend/server code.

```tsx
import { MangoProvider } from "@mango/react";

const LANGS = ["en", "es", "fr"] as const;

export default function App() {
  return (
    <MangoProvider langs={LANGS} defaultLang="en">
      <YourApp />
    </MangoProvider>
  );
}
```

### 2. Render translated fields with `useMango()` — `t()`

Type your component props with `Translated<T>` from `@mango/core` to get full autocomplete on `t()` calls.

```tsx
import { useMango } from "@mango/react";
import type { Translated } from "@mango/core";

type Post = { title: string; body: string; slug: string };
type TranslatedPost = Translated<Post, "slug", "en" | "es" | "fr">;
// → { title: Record<"en"|"es"|"fr", string>; body: Record<...>; slug: string }

export function PostCard({ post }: { post: TranslatedPost }) {
  const { t } = useMango();

  return (
    <div>
      <h1>{t(post.title)}</h1>
      <p>{t(post.body)}</p>
      <p>{t(post.slug)}</p>
    </div>
  );
}
```

### 3. Switch languages with `useMango()` — `setLang`

```tsx
import { useMango } from "@mango/react";

export function LanguageSwitcher() {
  const { lang, setLang, langs } = useMango();

  return (
    <div>
      {langs.map((l) => (
        <button key={l} onClick={() => setLang(l)} disabled={l === lang}>
          {l}
        </button>
      ))}
    </div>
  );
}
```

### 4. How `t()` works

`t()` resolves any field — translated or plain — to a displayable value for the active language.

```ts
// Translated field (from @mango/core output)
t(post.title)  // { en: "Hello", es: "Hola", fr: "Bonjour" } → "Hello" (if lang is "en")

// Primitive field — returned as-is
t(post.id)     // 42          → 42
t(post.slug)   // "my-post"   → "my-post"
```

If the active language has no translation, `t()` falls back to the first language in the `langs` list.

## Configuration

### `MangoProviderProps`

| Prop          | Type             | Required | Description                                           |
| ------------- | ---------------- | -------- | ----------------------------------------------------- |
| `langs`       | `string[]`       | ✅        | All supported languages — must match `@mango/core` config |
| `defaultLang` | `string`         | ✅        | Active language on first render                       |
| `children`    | `React.ReactNode`| ✅        | Child components                                      |

### `useMango` return value

| Property  | Type                            | Description                                              |
| --------- | ------------------------------- | -------------------------------------------------------- |
| `lang`    | `string`                        | Currently active language                                |
| `setLang` | `(lang: string) => void`        | Switch the active language                               |
| `t`       | `(field) => string \| number \| boolean` | Resolve a multilingual field to the active language |
| `langs`   | `string[]`                      | All available languages                                  |

> `useMango()` must be called inside a `<MangoProvider>` — it throws a descriptive error otherwise.
