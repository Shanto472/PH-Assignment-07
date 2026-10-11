import React from "react";
import Navbar from "@/components/Navbar";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      <div className="h-9 bg-emerald-900/60 animate-pulse" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        <div className="h-32 bg-white rounded-3xl border border-gray-100 p-6 animate-pulse" />
        <ProductGridSkeleton count={8} />
      </main>
    </div>
  );
}
