"use client";
import dynamic from "next/dynamic";

const LazyComments = dynamic(() => import("./ui/Comments"), {
  ssr: false,
  loading: () => (
    <div className="mt-12 bg-[#1B1F3B] rounded-lg p-6 border border-[#003B8D] animate-pulse">
      <div className="h-6 bg-[#0C0C2C] w-1/4 mb-4 rounded"></div>
      <div className="space-y-3">
        <div className="h-4 bg-[#0C0C2C] rounded w-full"></div>
        <div className="h-4 bg-[#0C0C2C] rounded w-3/4"></div>
        <div className="h-24 bg-[#0C0C2C] rounded w-full mt-4"></div>
      </div>
    </div>
  )
});

export default LazyComments;
