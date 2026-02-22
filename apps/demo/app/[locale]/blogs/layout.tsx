import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mango.dev — Multilingual Blog Demo",
  description: "A live demo showcasing Mango.dev: switch languages and watch dynamic blog content translate in real time. Built for Lingo.dev Multilingual Hackathon #2.",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
