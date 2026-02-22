"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "install",
    number: "01",
    title: "Install",
    description: "Install the packages via npm, pnpm, or yarn.",
    code: `npm install @mango.dev/core @mango.dev/react`,
    lang: "bash",
    note: null,
  },
  {
    id: "api-key",
    number: "02",
    title: "Add your API key",
    description:
      "Get your key from lingo.dev — the free Hobby tier is enough. Add it to your .env.local file.",
    code: `# .env.local\nLINGODOTDEV_API_KEY=your_api_key_here`,
    lang: "bash",
    note: "Get your API key at lingo.dev/en/app",
  },
  {
    id: "langs",
    number: "03",
    title: "Define your languages",
    description:
      "Define LANGS once as a const. It flows to both backend and frontend — no repetition.",
    code: `// lib/constants.ts\nexport const LANGS = ["en", "hi", "fr"] as const\nexport type Lang = typeof LANGS[number] // "en" | "hi" | "fr"`,
    lang: "ts",
    note: null,
  },
  {
    id: "init",
    number: "04",
    title: "Initialize Mango on the server",
    description:
      "Create the Mango instance in a server-only file. The API key never leaves the server.",
    code: `// lib/mango.ts\nimport { Mango } from "@mango.dev/core"\nimport { LANGS } from "./constants"\n\nexport const mg = new Mango({\n  api_key: process.env.LINGODOTDEV_API_KEY!,\n  langs: [...LANGS],\n  sourceLang: "en",\n})`,
    lang: "ts",
    note: null,
  },
  {
    id: "provider",
    number: "05",
    title: "Wrap your app with MangoProvider",
    description:
      "MangoProvider only needs langs — no API key. Completely safe for the frontend.",
    code: `// app/layout.tsx\nimport { MangoProvider } from "@mango.dev/react"\nimport { LANGS } from "@/lib/constants"\n\nexport default function RootLayout({ children }) {\n  return (\n    <MangoProvider langs={[...LANGS]} defaultLang="en">\n      <html><body>{children}</body></html>\n    </MangoProvider>\n  )\n}`,
    lang: "tsx",
    note: null,
  },
  {
    id: "translate",
    number: "06",
    title: "Translate your data on the server",
    description:
      "Pass any object to mg.translate(). Mango traverses it recursively, translates every string field, and returns the same shape with multilingual maps.",
    code: `// app/api/posts/route.ts\nimport { mg } from "@/lib/mango"\n\nexport async function GET() {\n  const res = await fetch("https://your-api.com/posts")\n  const posts = await res.json()\n\n  const { posts: translated } = await mg.translate(\n    { posts },\n    { exclude: ["posts[].id", "posts[].userId"] }\n  )\n\n  return NextResponse.json({ data: translated })\n}\n\n// output shape:\n// {\n//   id: 1,           <- excluded, original\n//   title: {\n//     en: "Hello",\n//     hi: "\\u0928\\u092e\\u0938\\u094d\\u0924\\u0947",\n//     fr: "Bonjour"\n//   }\n// }`,
    lang: "ts",
    note: "Wrap arrays in a named object before passing — gives proper TypeScript autocomplete on exclude paths.",
  },
  {
    id: "display",
    number: "07",
    title: "Display on the frontend",
    description:
      "useMango() gives you lang, setLang, and t(). t() resolves field[currentLang] with sourceLang as fallback.",
    code: `// components/PostList.tsx\n"use client"\nimport { useMango } from "@mango.dev/react"\n\nexport function PostList({ posts }) {\n  const { t, setLang } = useMango()\n\n  return (\n    <>\n      <button onClick={() => setLang("en")}>EN</button>\n      <button onClick={() => setLang("hi")}>HI</button>\n      <button onClick={() => setLang("fr")}>FR</button>\n\n      {posts.map(post => (\n        <div key={post.id}>\n          <h2>{t(post.title)}</h2>\n          <p>{t(post.body)}</p>\n        </div>\n      ))}\n    </>\n  )\n}`,
    lang: "tsx",
    note: null,
  },
] as const;

// ─── CodeBlock ────────────────────────────────────────────────────────────────

function CodeBlock({
  code,
  lang,
  copyLabel,
  copiedLabel,
}: {
  code: string;
  lang: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative mt-3 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">{lang}</span>
        <button
          onClick={copy}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed bg-zinc-950 text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Page() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<string>(STEPS[0].id);
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveStep(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    STEPS.forEach(({ id }) => {
      const el = stepRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollToStep(id: string) {
    stepRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen mx-auto w-full max-w-5xl min-w-0 flex flex-col gap-8 p-4">
      {/* Top bar — back button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} />
          Back
        </button>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-3xl">🥭</span> Get Started with Mango.dev
      </h1>

      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-16 space-y-1">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => scrollToStep(step.id)}
                className={cn(
                  "w-full text-left flex items-center gap-2.5 rounded-md px-3 py-2 text-base transition-colors",
                  activeStep === step.id
                    ? "text-mango-primary-foreground font-medium bg-mango-primary/10 border border-mango-ring/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-mango-primary/10",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-mono tabular-nums",
                    activeStep === step.id
                      ? "text-mango-primary-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {step.number}
                </span>
                {step.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {STEPS.map((step, i) => (
            <section
              key={step.id}
              id={step.id}
              ref={(el) => {
                stepRefs.current[step.id] = el;
              }}
              className="scroll-mt-16 pb-14"
            >
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  variant="outline"
                  className="font-mono text-xs text-mango-primary-foreground border-mango-ring/40 bg-mango-primary/10"
                >
                  {step.number}
                </Badge>
                <h2 className="text-xl font-semibold">{step.title}</h2>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                {step.description}
              </p>

              <CodeBlock
                code={step.code}
                lang={step.lang}
                copyLabel="Copy"
                copiedLabel="Copied!"
              />

              {step.note && (
                <p className="mt-3 text-sm text-muted-foreground pl-1">
                  💡 {step.note}
                </p>
              )}

              {i < STEPS.length - 1 && <Separator className="mt-14" />}
            </section>
          ))}

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
      </div>
    </main>
  );
}
