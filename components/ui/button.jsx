import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full cursor-pointer text-base font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
          default: "bg-[#00C6FF] text-[#0C0C2C] hover:bg-[#00C6FF]", 
                                                  primary: "bg-[#0C0C2C] text-white",
          outline: "border border-[#00C6FF] bg-transparent text-[#00C6FF] hover:bg-[#00C6FF]:text-[#0C0C2C]",
        },
        
      size: {
        default: "h-[44px] px-6",
        md: "h-[48px] px-6",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px]",
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
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
