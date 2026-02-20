"use client";

import { useEffect, useState } from "react";
import { BlogPostList } from "@/components/blog-post";
import { TranslatedPost } from "@/lib/blog-data";
import { LangSwitcher } from "@/components/lang-switcher";
import { Separator } from "@/components/ui/separator";
import { PlaygroundExample } from "@/components/playground-example";

export default function Page() {
  // const [posts, setPosts] = useState<TranslatedPost[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((res) => res.json())
  //     .then(({ data, status, message }) => {
  //       if (status === "error") throw new Error(message)
  //       setPosts(data)
  //     })
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false))
  // }, [])

  return (
    <main>
      <PlaygroundExample />
    </main>
  );
}
