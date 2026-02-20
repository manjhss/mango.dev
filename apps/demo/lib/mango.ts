import { Mango } from "@mango/core"
import { LANGS } from "./constants"

// Server-side only — API key never sent to client
export const mg = new Mango({
  api_key: process.env.LINGODOTDEV_API_KEY!,
  langs: [...LANGS],
  sourceLang: "en",
})
