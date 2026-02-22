"use client";

import { Example, ExampleWrapper } from "@/components/example";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalCircle01Icon,
  BookmarkAdd02Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMango } from "@mango.dev/react";
import { Post, POSTS, TranslatedPost } from "@/lib/data";
import { Skeleton } from "./ui/skeleton";
import { useZMango } from "@/store/mango";
import { Toolbar } from "./toolbar";
import { useRouter } from "next/navigation";

export function BlogExample({
  posts,
  loading,
}: {
  posts: TranslatedPost[];
  loading: boolean;
}) {
  const router = useRouter();

  const { isActive } = useZMango();
  const t = useTranslations("playground");

  const postsToShow = isActive ? posts : POSTS;

  return (
    <main className="min-h-screen mx-auto w-full max-w-5xl min-w-0 flex flex-col gap-8 p-4">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} />
        Back
      </button>

      <header className="flex flex-col gap-4 sm:flex-row items-start justify-between mt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-3xl">🥭</span> {t("header.title")}
          </h1>
          <p className="text-muted-foreground pt-1">
            {t("header.description")}
          </p>
        </div>
        <Toolbar />
      </header>

      <ExampleWrapper>
        {postsToShow.map((post) => (
          <CardExample key={post.username} post={post} loading={loading} />
        ))}
      </ExampleWrapper>

      <footer className="text-center text-sm text-muted-foreground">
        {t("footer.builtBy")}{" "}
        <Link
          href="https://x.com/manjhss"
          target="_blank"
          className="font-medium underline underline-offset-3"
        >
          manjhss
        </Link>{" "}
        {t("footer.for")}{" "}
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

function CardExample({
  post,
  loading,
}: {
  post: Post | TranslatedPost;
  loading: boolean;
}) {
  const { t: m } = useMango();
  const t = useTranslations("playground.cardExample");

  const isPostTranslated = (
    post: Post | TranslatedPost,
  ): post is TranslatedPost => {
    return (
      typeof post.title !== "string" && typeof post.description !== "string"
    );
  };

  return (
    <Example variant="mango" className="items-center justify-center">
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        <div className="bg-mango-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        />
        <CardHeader>
          <CardTitle>
            {isPostTranslated(post) ? (
              loading ? (
                <Skeleton className="h-5 w-3/4" />
              ) : (
                m(post.title)
              )
            ) : (
              post.title
            )}
          </CardTitle>
          <CardDescription>
            {isPostTranslated(post) ? (
              loading ? (
                <DescriptionSkeleton />
              ) : (
                m(post.description)
              )
            ) : (
              post.description
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant={"mango"}>
            <HugeiconsIcon
              icon={BookmarkAdd02Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            {t("card.bookmark")}
          </Button>
          <Badge variant="secondary" className="ml-auto">
            @{post.username}
          </Badge>
        </CardFooter>
      </Card>
    </Example>
  );
}

function DescriptionSkeleton() {
  return (
    <div className="space-y-1">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-2/4" />
    </div>
  );
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

function FormExample() {
  const t = useTranslations("playground.formExample");

  const roleItems = [
    { label: t("card.fields.role.items.developer"), value: "developer" },
    { label: t("card.fields.role.items.designer"), value: "designer" },
    { label: t("card.fields.role.items.manager"), value: "manager" },
    { label: t("card.fields.role.items.other"), value: "other" },
  ];

  return (
    <Example title={t("title")} description={t("description")} variant="lingo">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("card.title")}</CardTitle>
          <CardDescription>{t("card.description")}</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon">
              <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="small-form-name">
                    {t("card.fields.name.label")}
                  </FieldLabel>
                  <Input
                    id="small-form-name"
                    placeholder={t("card.fields.name.placeholder")}
                    variant="lingo"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="small-form-role">
                    {t("card.fields.role.label")}
                  </FieldLabel>
                  <Select items={roleItems} defaultValue={null}>
                    <SelectTrigger id="small-form-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {roleItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="small-form-framework">
                  {t("card.fields.framework.label")}
                </FieldLabel>
                <Combobox items={frameworks}>
                  <ComboboxInput
                    id="small-form-framework"
                    placeholder={t("card.fields.framework.placeholder")}
                    variant="lingo"
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>
                      {t("card.fields.framework.empty")}
                    </ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
              <Field>
                <FieldLabel htmlFor="small-form-comments">
                  {t("card.fields.comments.label")}
                </FieldLabel>
                <Textarea
                  id="small-form-comments"
                  placeholder={t("card.fields.comments.placeholder")}
                  variant="lingo"
                />
              </Field>
              <Field orientation="horizontal">
                <Button type="submit" variant={"lingo"}>
                  {t("card.submit")}
                </Button>
                <Button variant="outline" type="button">
                  {t("card.cancel")}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Example>
  );
}
