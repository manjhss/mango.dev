import type { Translated } from "@mango/core";
import type { Lang } from "@/lib/constants";

// dummy post shape
export interface Post {
  id: number;
  username: string;
  title: string;
  body: string;
}

export type TranslatedPost = Translated<
  Post,
  "id" | "username", // non-translatable fields
  Lang
>;

export const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    username: "alice_wonder",
    title: "The Future of Artificial Intelligence",
    body: "Artificial intelligence is transforming industries at a rapid pace. From healthcare to finance, AI-powered tools are helping humans make better decisions, automate repetitive tasks, and uncover insights that were previously impossible to find.",
  },
  {
    id: 2,
    username: "chris_dev",
    title: "Why TypeScript is Taking Over the Web",
    body: "TypeScript has grown from a niche tool to the default choice for modern web development. Its static type system catches bugs at compile time, improves editor tooling, and makes large codebases far easier to maintain and refactor.",
  },
  {
    id: 3,
    username: "sara_tech",
    title: "Understanding Edge Computing",
    body: "Edge computing moves processing closer to where data is generated, reducing latency and bandwidth usage. As IoT devices multiply and real-time applications demand instant responses, edge infrastructure is becoming a critical part of modern architecture.",
  },
];
