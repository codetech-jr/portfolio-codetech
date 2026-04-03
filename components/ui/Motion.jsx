"use client"

import React, { useEffect, useState } from "react";

// Small dynamic wrapper for framer-motion
// Renders a plain HTML element as fallback until framer-motion loads on client
const MOTION_KEYS = new Set([
  "initial",
  "animate",
  "whileInView",
  "whileHover",
  "whileTap",
  "transition",
  "viewport",
  "onAnimationComplete",
]);

function filterProps(props) {
  const out = {};
  for (const k in props) {
    if (!MOTION_KEYS.has(k)) out[k] = props[k];
  }
  return out;
}

export default function Motion({ as = "div", children, ...props }) {
  const [motion, setMotion] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("framer-motion")
      .then((m) => {
        if (mounted) setMotion(() => m.motion);
      })
      .catch(() => {
        /* ignore; fallback will render plain elements */
      });
    return () => {
      mounted = false;
    };
  }, []);

  const Tag = motion ? motion[as] || motion.div : as;

  if (typeof Tag === "string") {
    return React.createElement(Tag, filterProps(props), children);
  }

  return <Tag {...props}>{children}</Tag>;
}
