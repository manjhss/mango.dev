"use client";

import { PlaygroundExample } from "@/components/playground-example";

import { TranslatedPost } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState<TranslatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts", {cache: "force-cache"})
      .then((res) => res.json())
      .then(({ data, status, message }) => {
        if (status === "error") throw new Error(message);
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <PlaygroundExample posts={posts} loading={loading} />
    </main>
  );
}
