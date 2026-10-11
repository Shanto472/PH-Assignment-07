import React from "react";
import Navbar from "@/components/Navbar";

export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      <div className="h-9 bg-emerald-900/60 animate-pulse" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-pulse flex-1">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-48 bg-white rounded-3xl border border-gray-100 p-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        </div>
      </main>
    </div>
  );
}
