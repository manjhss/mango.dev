"use client";

import { useZMango } from "@/store/mango";
import { LangSwitcher } from "./lang-switcher";
import { Switcher } from "./example";
import { ButtonGroup } from "./ui/button-group";

export function Toolbar() {
  const { isActive, toggleActive } = useZMango();

  return (
    <ButtonGroup className="items-center gap-2 p-2 rounded-lg bg-mango-primary/10 border border-mango-primary">
      <div className={"text-sm text-mango-primary-foreground font-medium uppercase tracking-wide"}>
        Mango.dev
      </div>

      <div className="flex items-center gap-2">
        <Switcher
          checked={isActive}
          onCheckedChange={toggleActive}
          variant="mango"
        />
        <LangSwitcher />
      </div>
    </ButtonGroup>
  );
}
