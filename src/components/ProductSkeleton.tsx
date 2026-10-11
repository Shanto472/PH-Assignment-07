import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs animate-pulse flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
        <div className="h-5 w-14 bg-gray-200 rounded-full" />
      </div>
      <div className="flex items-center gap-3.5 my-2">
        <div className="w-14 h-14 bg-gray-200 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-14 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
