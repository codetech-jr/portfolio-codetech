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
        "flex h-[48px] w-full items-center justify-between rounded-md border border-white/10 bg-[#0C0C2C] px-4 py-5 text-base text-white/90 placeholder:text-white/60 focus:border-[#00C6FF] outline-none",
        className
      )}
      {...props} />
  );
}

export { Input }
