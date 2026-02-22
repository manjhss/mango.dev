import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";

export function Switcher({
  variant,
  checked,
  onCheckedChange,
}: {
  variant?: "mango" | "lingo";
  checked?: boolean;
  onCheckedChange?: () => void;
}) {
  return (
    <Switch
      variant={variant}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
  );
}

function ExampleWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="w-full">
      <div
        data-slot="example-wrapper"
        className={cn(
          "grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-8 2xl:max-w-6xl",

          className,
        )}
        {...props}
      />
    </div>
  );
}

function Example({
  title,
  description,
  variant,
  children,
  className,
  containerClassName,
  checked,
  onCheckedChange,
  ...props
}: React.ComponentProps<"div"> & {
  title?: any;
  description?: any;
  variant?: "mango" | "lingo";
  containerClassName?: string;
  checked?: boolean;
  onCheckedChange?: () => void;
}) {
  return (
    <div
      data-slot="example"
      className={cn(
        "mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch",
        containerClassName,
      )}
      {...props}
    >
      <div className="px-1.5 pb-2 flex items-start justify-between">
        <div>
          {title && (
            <div
              className={cn(
                "text-sm font-medium uppercase tracking-wide",
                variant === "mango" && "text-mango-primary-foreground",
                variant === "lingo" && "text-lingo-primary",
              )}
            >
              {title}
            </div>
          )}
          {description && (
            <div className="text-muted-foreground text-sm">{description}</div>
          )}
        </div>
      </div>
      <div
        data-slot="example-content"
        className={cn(
          "bg-background text-foreground flex min-w-0 flex-1 flex-col items-start gap-6 border border-dashed p-4 sm:p-6 *:[div:not([class*='w-'])]:w-full",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { ExampleWrapper, Example };
