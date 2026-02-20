"use client";

import { useEffect, useState } from "react";
import { BlogPostList } from "@/components/blog-post";
import { TranslatedPost } from "@/lib/blog-data";
import { LangSwitcher } from "@/components/lang-switcher";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [posts, setPosts] = useState<TranslatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(({ data, status, message }) => {
        if (status === "error") throw new Error(message)
        setPosts(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <div className="text-5xl mb-3">🥭</div>
            <h1 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Mango Blog
            </h1>
          </div>

          <LangSwitcher />
        </header>

        <Separator />

        <BlogPostList posts={posts} loading={loading} error={error} />
      </div>
    </main>
  );
}
