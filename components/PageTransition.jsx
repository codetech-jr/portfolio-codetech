"use client";

import Motion from "@/components/ui/Motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const AnimatePresence = dynamic(() => import('framer-motion').then(m => m.AnimatePresence), { ssr: false });

const PageTransition = ({ children }) => {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
                <div key={pathname}>
                    <Motion as="div"
                        initial={{opacity: 1}}
                        animate ={{
                            opacity: 0, 
                            transition: {delay: 1, duration: 0.4, ease: "easeInOut"},
                        }}
                        className="h-screen w-screen fixed bg-[#1B1F3B] top-0 pointer-events-none"
                    >
                    </Motion>
                    {children}
                </div>
            </AnimatePresence>
    );
};

export default PageTransition;