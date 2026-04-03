"use client";

import Motion from "@/components/ui/Motion";

// variants - use transform (y) to avoid layout shifts (CLS)
const stairAnimation = {
    initial: {
        y: "0%",
    },
    animate: {
        y: "100%",
    },
    exit: {
        y: ["100%", "0%"],
    },
};

const reverseIndex = (index) => {
    const totalSteps = 6;
    return totalSteps - index - 1;
};

const Stairs = () => {
    return (
        <>
        
        {

        }

        {[...Array(6)].map((_, index) => (
            <Motion as="div"
                key={index}
                variants={stairAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                    delay: reverseIndex(index) * 0.1,
                }}
                className="absolute inset-0 bg-white"
                style={{ zIndex: index, willChange: 'transform' }}
            />
        ))}
        </>
    )
}

export default Stairs;