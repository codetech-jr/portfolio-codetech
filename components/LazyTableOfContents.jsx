"use client";
import dynamic from "next/dynamic";

const LazyTableOfContents = dynamic(() => import("./sections/TableOfContents"), {
  ssr: false,
  loading: () => (
    <div className="bg-[#1B1F3B] rounded-lg border border-[#003B8D] p-4 w-full animate-pulse">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-4 h-4 bg-[#0C0C2C] rounded-full"></div>
        <div className="h-4 bg-[#0C0C2C] rounded w-32"></div>
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-[#0C0C2C] rounded w-3/4"></div>
        <div className="h-3 bg-[#0C0C2C] rounded w-1/2 ml-4"></div>
        <div className="h-3 bg-[#0C0C2C] rounded w-2/3 ml-4"></div>
        <div className="h-3 bg-[#0C0C2C] rounded w-4/5"></div>
      </div>
    </div>
  )
});

export default LazyTableOfContents;
