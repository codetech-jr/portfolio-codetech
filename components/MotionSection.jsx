"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MotionSection({ children, className, id, delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.section>
  );
}
