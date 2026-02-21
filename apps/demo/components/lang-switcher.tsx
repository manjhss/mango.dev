"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
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
import { useMango } from "@mango.dev/react";
import { useEffect } from "react";

const LANG_LABELS: Record<string, string> = {
  en: "en",
  hi: "hi",
  fr: "fr",
};

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const {lang, setLang} = useMango()

  useEffect(() => {
    setLang(locale)
  }, [locale, setLang])

  console.log(lang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">{locale}</Button>} />

      <DropdownMenuContent align="end" className={"mt-1"}>
        <DropdownMenuGroup>
          {routing.locales.map((l) => (
            <DropdownMenuItem
              key={l}
              className={cn("font-medium")}
              onClick={() => router.replace(pathname, { locale: l })}
            >
              {LANG_LABELS[l] ?? l}
              {locale === l && (
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

