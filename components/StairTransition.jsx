"use client";


import Motion from "@/components/ui/Motion";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";
const AnimatePresence = dynamic(() => import('framer-motion').then(m => m.AnimatePresence), { ssr: false });

// components
import Stairs from "./Stairs"

const StairTransition = () => {
    const pathname = usePathname();
    return (
    <>
        <AnimatePresence mode="wait">
            <div key={pathname}>
                <div className="h-screen w-screen fixed top-0 left-0 right-0 
                pointer-events-none z-40 flex">
                    <Stairs />
                </div>

                <Motion as="div"
                className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex bg-white dark:bg-[#1B1F3B]"
                initial={{ opacity: 1}}
                animate={{
                    opacity: 0,
                    transition: {delay: 1, duration: 0.4, ease: "easeInOut"},
                }}
                />
            </div>
        </AnimatePresence>
    </>

    )
    
}

export default StairTransition;