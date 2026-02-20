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
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { LangSwitcher } from "./lang-switcher";

export function PlaygroundExample() {
  return (
    <main className="min-h-screen mx-auto w-full max-w-5xl min-w-0 content-center items-start space-y-12">
      <header className="flex items-start justify-between border-b border-dashed pb-4">
        <div>
          <h1 className="text-xl font-medium tracking-tight">Playground</h1>
          <p className="text-muted-foreground text pt-1">
            Try changing the language and toggle the Mango and Lingo.dev switch
            to see the difference.
          </p>
        </div>
        <LangSwitcher />
      </header>

      <ExampleWrapper>
        <CardExample />
        <FormExample />
      </ExampleWrapper>

      <footer className="text-center text-xs text-muted-foreground border-t border-dashed pt-4">
        Both powered by{" "}
        <Link
          href="https://lingo.dev"
          className="text-foreground hover:underline"
        >
          Lingo.dev
        </Link>
      </footer>
    </main>
  );
}

function CardExample() {
  return (
    <Example
      title="Mango"
      description="Translates dynamic content from your server."
      variant="mango"
      className="items-center justify-center"
    >
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        <div className="bg-mango-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        />
        <CardHeader>
          <CardTitle>The Future of Artificial Intelligence</CardTitle>
          <CardDescription>
            AI is reshaping industries — from healthcare to finance, helping
            humans decide faster, automate more, and uncover insights at scale.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant={"mango"}>
            <HugeiconsIcon
              icon={BookmarkAdd02Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            Bookmark
          </Button>
          <Badge variant="secondary" className="ml-auto">
            <Link href="https://x.com/manjhss">@manjhss</Link>
          </Badge>
        </CardFooter>
      </Card>
    </Example>
  );
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

const roleItems = [
  { label: "Developer", value: "developer" },
  { label: "Designer", value: "designer" },
  { label: "Manager", value: "manager" },
  { label: "Other", value: "other" },
];

function FormExample() {
  return (
    <Example
      title="Lingo.dev"
      description="Translates static content directly."
      variant="lingo"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Please fill in your details below</CardDescription>
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
                  <FieldLabel htmlFor="small-form-name">Name</FieldLabel>
                  <Input
                    id="small-form-name"
                    placeholder="Enter your name"
                    variant="lingo"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="small-form-role">Role</FieldLabel>
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
                  Framework
                </FieldLabel>
                <Combobox items={frameworks}>
                  <ComboboxInput
                    id="small-form-framework"
                    placeholder="Select a framework"
                    variant="lingo"
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
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
                <FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
                <Textarea
                  id="small-form-comments"
                  placeholder="Add any additional comments"
                  variant="lingo"
                />
              </Field>
              <Field orientation="horizontal">
                <Button type="submit" variant={"lingo"}>
                  Submit
                </Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Example>
  );
}
