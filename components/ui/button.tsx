import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-xl text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
  {
    variants: {
      variant: {
        default: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-muted text-muted-foreground hover:bg-muted/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline lowercase tracking-normal font-normal",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        xs: "h-7 gap-1.5 px-3 text-[9px]",
        sm: "h-9 gap-2 px-4",
        lg: "h-12 px-8 text-[12px]",
        icon: "size-11 p-0",
        "icon-xs": "size-7 p-0",
        "icon-sm": "size-9 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  rounded = false,
  hidden = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    hidden?: boolean,
    rounded?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  if (hidden) return null

  if (rounded) {
    className = cn(className, "rounded-full")
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
