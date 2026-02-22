# apps/demo

The demo app for Mango.dev — a complete mini-website that introduces the library, guides users through setup, and shows it working live.

**[Live →](https://mangodotdev.vercel.app)**

## What's inside

Three pages, each serving a different purpose:

- **`/`** — Landing page. Explains what Mango.dev is, lists features, and links to the packages on npm.
- **`/get-started`** — Integration guide. 7 steps from install to rendering translated content, with a sticky sidebar and copy-button code blocks.
- **`/blogs`** — Live demo. Blog posts fetched from an API, translated server-side with `mg.translate()`, and rendered with `useMango()`. Switch languages with the toolbar to see it in action.

The blogs page is also what makes this more than just docs — it's a real working example of Mango.dev with actual API calls, locale routing via next-intl, and the React layer all wired together.

## Stack

- **Next.js** (App Router) — framework
- **next-intl** — locale routing and static UI string translations (`/en`, `/hi`, `/fr`)
- **`@mango.dev/core`** — server-side object translation via `mg.translate()`
- **`@mango.dev/react`** — `MangoProvider` + `useMango()` + `t()` for client-side rendering
- **Tailwind CSS** + **base-ui** — styling and headless UI primitives
- **HugeIcons** — icon set

## How it's wired

The blogs page makes a request to `/api/posts`. That route fetches raw post data and runs it through `mg.translate()` — one call that returns every string field as a multilingual map (`{ en, hi, fr }`). The translated posts are sent to the client.

On the client, `MangoProvider` holds the active language. `useMango()` gives components `t()`, which reads `post.title[currentLang]` automatically. The language switcher updates both the next-intl URL locale and the Mango lang state — keeping static UI and dynamic content in sync.

The API key lives only in `.env.local`. The client never sees it.

## Pages

| Route | Purpose |
|---|---|
| `/[locale]` | Landing page — what Mango.dev is, features, packages |
| `/[locale]/get-started` | Step-by-step integration guide |
| `/[locale]/blogs` | Live demo — blog posts translated in real time via `mg.translate()` |
