"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product, toBengaliDigits } from "@/lib/api";
import { FALLBACK_PRODUCTS } from "@/lib/mock-data";

interface PriceTickerProps {
  products?: Product[];
}

export default function PriceTicker({ products: initialProducts }: PriceTickerProps) {
  const [products, setProducts] = useState<Product[]>(
    initialProducts && initialProducts.length > 0 ? initialProducts : FALLBACK_PRODUCTS
  );

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      return;
    }

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, [initialProducts]);

  if (!products || products.length === 0) return null;

  // Duplicate items to make seamless continuous marquee loop
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-white text-gray-800 text-xs sm:text-sm py-2 overflow-hidden border-b border-gray-100 shadow-2xs">
      <div className="flex animate-marquee whitespace-nowrap">
        {tickerItems.map((p, idx) => {
          const dir = p.change?.dir || "flat";
          const pct = p.change?.pct ?? 0;
          const isUp = dir === "up";
          const isDown = dir === "down";

          return (
            <Link
              key={`${p.id}-${idx}`}
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-2 mx-3.5 hover:text-emerald-700 transition-colors cursor-pointer group"
            >
              <span className="text-base">{p.image || p.categoryIcon || "🛒"}</span>
              <span className="font-medium text-gray-700 group-hover:underline">
                {p.nameBn}
              </span>
              <span className="font-bold text-gray-900">
                {toBengaliDigits(p.today)} টাকা/{p.unit === "kg" ? "কেজি" : p.unit}
              </span>
              <span
                className={`inline-flex items-center text-xs px-1.5 py-0.5 rounded font-semibold border ${
                  isUp
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : isDown
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}
              >
                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                {toBengaliDigits(pct)}%
              </span>
              <span className="text-gray-300 mx-1.5">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
