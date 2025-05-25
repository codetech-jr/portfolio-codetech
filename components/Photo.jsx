"use client"

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
    return (
        // 1. Main container for the Photo component.
        //    Uses flexbox to center its direct child (the motion.div wrapper).
        <div className="w-full h-full relative flex justify-center items-center">
            {/* 2. Wrapper for both the image and the SVG circle.
                   - It's centered by the parent flex container.
                   - `position: relative` makes it a positioning context for its absolute children.
                   - Its dimensions are set to match the SVG's intended display size at different breakpoints.
                     (Base: 300x300, XL: SVG width 586px, SVG height 506px)
            */}
            <motion.div 
                initial={{opacity: 0}}
                animate={{
                    opacity: 1,
                    transition: { delay: 2, duration: 0.4, ease: "easeIn"},
                }}
                className="relative w-[300px] h-[300px] xl:w-[586px] xl:h-[506px]"
            >
                {/* 3. Image Container (motion.div)
                       - `position: absolute` and centered using `top/left/transform`.
                       - Sized for the image content.
                       - `mix-blend-lighten` is kept as in your original code.
                */}
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{
                        opacity: 1,
                        transition: { delay: 2.4, duration: 0.4, ease: "easeInOut"},
                    }}
                    className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] 
                               mix-blend-lighten absolute top-1/2 left-1/2 
                               transform -translate-x-1/2 -translate-y-1/2"
                >
                    <Image
                        src="/assets/alejo.png" // Ensure this path is correct
                        alt="Foto de Alejo"
                        fill // `fill` makes the image expand to its parent div's dimensions
                        priority
                        quality={100}
                        // `object-cover` maintains aspect ratio, `rounded-full` makes it circular.
                        // Keeping `mix-blend-lighten` as per your original.
                        className="object-cover rounded-full mix-blend-lighten" 
                    />
                </motion.div>

                {/* 4. Animated SVG circle
                       - `position: absolute`, `top-0 left-0 w-full h-full` makes it fill its parent (the sized motion.div wrapper).
                       - It comes after the image div in the DOM, so it will render on top if both are absolute with same/no z-index.
                       - `viewBox` defines the SVG's internal coordinate system.
                       - `preserveAspectRatio` (default "xMidYMid meet") will ensure the viewBox content
                         (the circle) is scaled and centered correctly, especially if the SVG element's
                         aspect ratio (e.g., 586x506 on XL) doesn't match the viewBox's aspect ratio (506x506).
                */}
                <motion.svg 
                    className="absolute top-0 left-0 w-full h-full" 
                    fill="transparent"
                    viewBox="0 0 506 506" // SVG coordinate system
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.circle 
                        cx="253" // Centered: 506 / 2
                        cy="253" // Centered: 506 / 2
                        r="250"  // Radius within viewBox coordinates
                        stroke="#00C6FF" 
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{strokeDasharray: "24 10 0 0"}}
                        animate= {{
                            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                            rotate: [120, 360], // Rotates circle around its cx, cy
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </motion.svg>
            </motion.div>
        </div>
    );
};

export default Photo;