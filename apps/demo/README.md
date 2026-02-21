# Mango — Demo App

A multilingual blog demo built with [Next.js](https://nextjs.org) showcasing how `@mango/core` and `@mango/react` work together in a real app.

## What it demonstrates

- Blog posts translated from English into **Hindi** and **French** using `@mango/core` on the server
- URL-based locale routing (`/en`, `/hi`, `/fr`) via [next-intl](https://next-intl.dev)
- Language switcher synced between next-intl's router and `useMango()` from `@mango/react`
- `t()` rendering translated post fields (`title`, `description`) in the active language
- API key stays server-side — client only receives the translated data

## Features

- **`/api/posts`** — API route that calls `mg.translate()` to translate posts server-side
- **`MangoProvider`** — wraps the locale layout, supplies language context to all child components
- **`useMango()`** — used in card components to render translated fields with `t()`
- **`LangSwitcher`** — dropdown that changes the URL locale and syncs `setLang` from `useMango()`
- **`TranslatedPost` type** — typed using `Translated<Post, "username", Lang>` for full autocomplete

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in this directory:

```bash
cp .env.example .env.local
```

Then add your lingo.dev API key:

```env
LINGODOTDEV_API_KEY=your_api_key_here
```

> Get your API key at [lingo.dev](https://lingo.dev).

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/en` by default.

## How Mango is wired in

### Server — `lib/mango.ts`

A single `Mango` instance is created server-side using the API key from environment variables:

```ts
import { Mango } from "@mango/core"
import { LANGS } from "./constants"

export const mg = new Mango({
  api_key: process.env.LINGODOTDEV_API_KEY!,
  langs: [...LANGS],
  sourceLang: "en",
})
```

### API route — `app/api/posts/route.ts`

Posts are translated here and returned to the client:

```ts
const translated = await mg.translate(
  { posts },
  { exclude: ["posts[].username"], fast: true }
)
```

> During development, pre-translated mock data (`TRANSLATED_POSTS`) is used to avoid unnecessary API calls.

### Client — `app/[locale]/layout.tsx`

`MangoProvider` wraps every locale page with the same `LANGS`:

```tsx
<MangoProvider langs={[...routing.locales]} defaultLang={routing.defaultLocale}>
  {children}
</MangoProvider>
```

### Components — `useMango()`

Translated fields are rendered using `t()` from `useMango()`:

```tsx
const { t } = useMango()

<h2>{t(post.title)}</h2>
<p>{t(post.description)}</p>
```

## Configuration

| Variable | Description |
|---|---|
| `LINGODOTDEV_API_KEY` | Your lingo.dev API key — **server-side only** |

Languages are defined in `lib/constants.ts`:

```ts
export const LANGS = ["en", "hi", "fr"] as const
```

To add a new language, add it to `LANGS` and create the corresponding next-intl message file in `i18n/`.

