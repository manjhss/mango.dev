"use client";

import { useMango } from "@mango/react";
import { Lang } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const LANG_LABELS: Record<Lang, string> = {
  en: "en",
  hi: "hi",
  fr: "fr",
};

export function LangSwitcher() {
  const { lang, setLang, langs } = useMango();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">{lang}</Button>} />

      <DropdownMenuContent align="end" className={"mt-1"}>
        <DropdownMenuGroup>
          {langs.map((l) => (
            <DropdownMenuItem
              key={l}
              className={cn("font-medium")}
              onClick={() => setLang(l)}
            >
              {LANG_LABELS[l as Lang] ?? l}
              {lang === l && (
                <DropdownMenuShortcut>
                  <HugeiconsIcon icon={Tick02Icon} size={18} />
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
