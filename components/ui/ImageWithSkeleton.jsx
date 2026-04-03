"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithSkeleton({ src, alt = '', width = 16, height = 9, className = '', priority = false, quality = 80, sizes }) {
  const [loaded, setLoaded] = useState(false);

  const paddingTop = height && width ? `${(height / width) * 100}%` : '56.25%';

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ paddingTop }}>
      {!loaded && (
        <div aria-hidden="true" className="absolute inset-0 bg-slate-200 dark:bg-[#0C0C2C] animate-pulse" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`object-cover ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
