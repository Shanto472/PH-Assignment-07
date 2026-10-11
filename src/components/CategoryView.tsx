"use client";

import React, { useState, useMemo } from "react";
import { Product, Category, toBengaliDigits } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { ChevronDown } from "lucide-react";

interface CategoryViewProps {
  category: Category;
  initialProducts: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryView({
  category,
  initialProducts,
}: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    let list = [...initialProducts];

    // Challenge C1: Sort by numeric price value
    if (sortOption === "price-asc") {
      list.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return list;
  }, [initialProducts, sortOption]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Category Header Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50/80 border border-gray-100/60 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
          {category.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {category.nameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            {toBengaliDigits(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* 2. Challenge C1 Sorting Control Bar (Matches Figma / 4th SS) */}
      <div className="bg-white rounded-2xl py-3.5 px-6 border border-gray-100 shadow-xs flex items-center justify-end">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-gray-600 font-medium">সাজান</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-800 text-xs sm:text-sm font-medium py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3. Product Cards Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 space-y-4">
          <div className="text-5xl">🧺</div>
          <h3 className="text-xl font-bold text-gray-900">
            কোনো পণ্য খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-1">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
