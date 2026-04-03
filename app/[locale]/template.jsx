"use client";

import Motion from "@/components/ui/Motion";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <Motion as="div"
      key={pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.5 
      }}
    >
      { children }
    </Motion>
  );
}
