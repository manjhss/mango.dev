import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Layers01Icon,
  CodeIcon,
  FilterIcon,
  ReactIcon,
  LockPasswordIcon,
  Loading03Icon,
  ZapIcon,
  GithubIcon,
  ArrowUpRight03Icon,
} from "@hugeicons/core-free-icons";

const FEATURES = [
  {
    icon: Layers01Icon,
    label: "One call, all languages",
    description:
      "Translate any nested object or array in a single mg.translate() call.",
  },
  {
    icon: CodeIcon,
    label: "Type-safe exclude paths",
    description:
      "Autocomplete on your schema — TypeScript error if the path doesn't exist.",
  },
  {
    icon: FilterIcon,
    label: "Smart skipping",
    description: "URLs, emails, numbers, and dates are never sent to the API.",
  },
  {
    icon: ReactIcon,
    label: "React layer",
    description:
      "MangoProvider + useMango() + t() for instant client-side lang switching.",
  },
  {
    icon: LockPasswordIcon,
    label: "API key stays on server",
    description:
      "Frontend only receives langs — api_key is never exposed to the client.",
  },
  {
    icon: Loading03Icon,
    label: "Progress callback",
    description: "Track translation progress with an onProgress handler.",
  },
  {
    icon: ZapIcon,
    label: "Fast mode",
    description: "Prioritize speed over quality when needed.",
  },
];

const PACKAGES = [
  {
    name: "@mango.dev/core",
    link: "https://github.com/manjhss/mango.dev/tree/main/packages/core",
    description: "Core translation engine, TypeScript types, and utility functions.",
  },
  {
    name: "@mango.dev/react",
    link: "https://github.com/manjhss/mango.dev/tree/main/packages/react",
    description: "React bindings for Mango.dev, including MangoProvider and useMango hook.",
  },
];

export const metadata: Metadata = {
  title: "Mango.dev — Type-safe Multilingual Translations",
  description: "Translate any JavaScript object into multiple languages — one call, all langs. Built on lingo.dev. Fully type-safe.",
};

export default function Page() {
  return (
    <main className="min-h-screen mx-auto w-full max-w-5xl min-w-0 flex flex-col gap-8 p-4">
      {/* Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-3xl">🥭</span> Mango.dev
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          A type-safe multilingual translation library powered by{" "}
          <Link
            href="https://lingo.dev"
            className="text-lingo-primary underline font-semibold"
          >
            Lingo.dev
          </Link>
          . Translate any JavaScript object into multiple languages in one call
          — with full TypeScript support.
        </p>

        <div className="flex items-center gap-3 pt-1 flex-wrap">
          <Link href="/en/get-started">
            <Button variant="mango" size="lg">
              Get Started
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={2}
              />
            </Button>
          </Link>
          <Link href="/en/blogs">
            <Button variant="outline" size="lg">
              Live Demo
              <HugeiconsIcon
                icon={ArrowUpRight03Icon}
                size={16}
                strokeWidth={2}
              />
            </Button>
          </Link>
          <Link
            href="https://github.com/manjhss/mango.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg">
              <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
              GitHub
            </Button>
          </Link>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="flex flex-col gap-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex gap-4 p-4 rounded-md bg-mango-primary/10 border border-mango-primary border-dashed"
            >
              <Button variant="outline" size="icon-lg">
                <HugeiconsIcon
                  icon={f.icon}
                  size={16}
                  strokeWidth={2}
                  className="text-mango-primary-foreground"
                />
              </Button>

              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  {f.label}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Packages */}
      <section className="flex flex-col gap-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Packages
        </h2>

        <div className="rounded-lg border border-border overflow-hidden divide-y divide-border px-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-8 px-5 py-4 hover:bg-muted/40 transition-colors items-center"
            >
              <div className="text-base font-mono shrink-0">
                <Link href={pkg.link} className="font-semibold text-mango-primary-foreground underline">{pkg.name}</Link>
              </div> -

              <p className="text-base text-muted-foreground">{pkg.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground pt-8">
        Built by{" "}
        <Link
          href="https://x.com/manjhss"
          target="_blank"
          className="font-medium underline underline-offset-3"
        >
          manjhss
        </Link>{" "}
        for Multilingual Hackathon #2 by{" "}
        <Link
          href="https://lingo.dev"
          target="_blank"
          className="font-medium underline underline-offset-3"
        >
          Lingo.dev
        </Link>
      </footer>
    </main>
  );
}
