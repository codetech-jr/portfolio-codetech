import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-[48px] w-full items-center justify-between rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0C0C2C] px-4 py-5 text-base text-slate-900 dark:text-white/90 placeholder:text-slate-400 dark:placeholder:text-white/60 focus:border-accent outline-none transition-colors",
        className
      )}
      {...props} />
  );
}

export { Input }
