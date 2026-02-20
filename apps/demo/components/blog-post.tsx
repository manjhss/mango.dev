"use client";

import { useMango } from "@mango/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TranslatedPost } from "@/lib/blog-data";

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: TranslatedPost }) {
  const { t } = useMango();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary">#{t(post.id)}</Badge>
          <Badge variant="outline">@{t(post.username)}</Badge>
        </div>
        <CardTitle className="text-base leading-snug">
          {t(post.title)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(post.body)}
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PostSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-5 w-10 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
    </Card>
  );
}

// ─── Main list ────────────────────────────────────────────────────────────────

export function BlogPostList({
  posts,
  loading,
  error,
}: {
  posts: TranslatedPost[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-4">
      {/* Error */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6 text-sm text-destructive">
            ⚠️ {error}
          </CardContent>
        </Card>
      )}

      {/* Loading skeletons */}
      {loading &&
        !error &&
        Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}

      {/* Posts */}
      {!loading &&
        !error &&
        posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
