import React from "react";
import Navbar from "@/components/Navbar";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      <div className="h-9 bg-emerald-900/60 animate-pulse" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 flex-1 w-full">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <ProductGridSkeleton count={8} />
        </div>
      </main>
    </div>
  );
}
