import React from "react";
import Link from "next/link";
import { Product, formatPrice, formatUnit, toBengaliDigits } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dir = product.change?.dir || "flat";
  const pct = product.change?.pct ?? 0;
  const isUp = dir === "up";
  const isDown = dir === "down";

  // Price increase = RED (bad for consumer), Price decrease = GREEN (good for consumer)
  const badgeClass = isUp
    ? "bg-rose-50 text-rose-600 border-rose-200"
    : isDown
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-gray-100 text-gray-700 border-gray-200";

  const changeSymbol = isUp ? "▲ " : isDown ? "▼ " : "— ";

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-emerald-100/80 shadow-xs hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Top Row: Category tag and Change Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
          <span>{product.categoryIcon || "🏷️"}</span>
          <span>{product.categoryNameBn || "সাধারণ"}</span>
        </span>

        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${badgeClass}`}
        >
          {changeSymbol}
          {toBengaliDigits(pct)}%
        </span>
      </div>

      {/* Middle: Icon & Product Details */}
      <div className="my-2 flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-emerald-100/60 transition-transform">
          {product.image || product.categoryIcon || "🛒"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Row: Today's Price and Arrow */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="block text-xs text-gray-500 font-medium">আজকের দাম</span>
          <span className="text-lg sm:text-xl font-black text-gray-900 group-hover:text-emerald-800 transition-colors">
            {formatPrice(product.today)}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
