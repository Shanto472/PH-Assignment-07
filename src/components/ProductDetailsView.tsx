"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import {
  Product,
  formatPrice,
  formatUnit,
  toBengaliDigits,
} from "@/lib/api";
import {
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  Calendar,
  Lock,
  Search,
  Filter,
} from "lucide-react";

interface ProductDetailsViewProps {
  product: Product;
}

export default function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [marketSearch, setMarketSearch] = useState<string>("");

  // Protected route check
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("পণ্য বিবরণ দেখতে অনুগ্রহ করে সাইন ইন করুন", { id: "auth-guard" });
      router.push(`/signin?redirect=/product/${product.slug || product.id}`);
    }
  }, [session, isPending, router, product]);

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-48 bg-white rounded-3xl border border-gray-100 p-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-gray-200 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">লগইন প্রয়োজন</h2>
        <p className="text-sm text-gray-500">
          পণ্যের বিস্তারিত বাজার দর এবং বাজারভিত্তিক প্রতিবেদন দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে সাইন ইন করুন।
        </p>
        <Link
          href={`/signin?redirect=/product/${product.slug || product.id}`}
          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  // Calculate market stats
  const markets = product.markets || [];
  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
            markets.length
        )
      : product.today;

  // Extract unique divisions
  const divisions = Array.from(new Set(markets.map((m) => m.division))).filter(
    Boolean
  );

  // Filter markets
  const filteredMarkets = markets.filter((m) => {
    const matchesDiv =
      selectedDivision === "all" || m.division === selectedDivision;
    const matchesSearch =
      !marketSearch.trim() ||
      m.market.toLowerCase().includes(marketSearch.toLowerCase()) ||
      m.division.toLowerCase().includes(marketSearch.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  const dir = product.change?.dir || "flat";
  const pct = product.change?.pct ?? 0;
  const isUp = dir === "up";
  const isDown = dir === "down";

  return (
    <div className="space-y-8">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম</span>
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-gray-900 transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.nameBn}</span>
      </div>

      {/* Top - Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-5xl sm:text-6xl shrink-0 shadow-inner">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {product.categoryIcon} {product.categoryNameBn || product.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                  {formatUnit(product.unit)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isUp
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : isDown
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {isUp ? "▲ " : isDown ? "▼ " : "— "}
                  {toBengaliDigits(pct)}% পরিবর্তন
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                সারা দেশের প্রধান বাজারসমূহে {product.nameBn} এর পাইকারি ও খুচরা বিক্রয়মূল্যের সার্বিক বিশ্লেষণ।
              </p>
            </div>
          </div>

          {/* Today's Average Price Badge */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 rounded-2xl border border-emerald-200/80 text-center md:text-right shrink-0">
            <span className="text-xs font-semibold text-emerald-800 block">
              আজকের সাধারণ বাজার দর
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-800 block mt-1">
              {formatPrice(product.today)}
            </span>
            <span className="text-xs text-gray-500 font-medium block mt-0.5">
              {formatUnit(product.unit)}
            </span>
          </div>
        </div>
      </div>

      {/* Price - Summary (3 Cards: Minimum, Maximum, Average) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Minimum Price */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
              {formatPrice(minPrice)}
            </p>
            <p className="text-xs text-gray-400 mt-1">{formatUnit(product.unit)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            ▼
          </div>
        </div>

        {/* Average Price */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">গড় দাম</p>
            <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
              {formatPrice(avgPrice)}
            </p>
            <p className="text-xs text-gray-400 mt-1">{formatUnit(product.unit)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
            ≈
          </div>
        </div>

        {/* Maximum Price */}
        <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-2xl sm:text-3xl font-black text-rose-700 mt-1">
              {formatPrice(maxPrice)}
            </p>
            <p className="text-xs text-gray-400 mt-1">{formatUnit(product.unit)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">
            ▲
          </div>
        </div>
      </div>

      {/* Historical Context / Trends */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-3 rounded-xl bg-gray-50">
          <span className="text-xs text-gray-500 block">আজকের দর</span>
          <span className="text-base sm:text-lg font-bold text-gray-900 block mt-1">
            {formatPrice(product.today)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <span className="text-xs text-gray-500 block">গতকালের দর</span>
          <span className="text-base sm:text-lg font-bold text-gray-900 block mt-1">
            {formatPrice(product.yesterday || product.today)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <span className="text-xs text-gray-500 block">গত সপ্তাহের দর</span>
          <span className="text-base sm:text-lg font-bold text-gray-900 block mt-1">
            {formatPrice(product.lastWeek || product.today)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-gray-50">
          <span className="text-xs text-gray-500 block">গত মাসের দর</span>
          <span className="text-base sm:text-lg font-bold text-gray-900 block mt-1">
            {formatPrice(product.lastMonth || product.today)}
          </span>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market by Market Breakdown) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-700" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              বিভিন্ন জেলা ও বিভাগের প্রধান বাজারসমূহের খুচরা ও পাইকারি মূল্যের তুলনামূলক চিত্র
            </p>
          </div>

          {/* Division Filter & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="বাজার খুঁজুন..."
                value={marketSearch}
                onChange={(e) => setMarketSearch(e.target.value)}
                className="w-full sm:w-44 pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {divisions.length > 0 && (
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="py-1.5 px-3 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white font-medium text-gray-700 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">সকল বিভাগ ({markets.length})</option>
                {divisions.map((d) => (
                  <option key={d} value={d}>
                    {d} বিভাগ
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Markets Table */}
        {filteredMarkets.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            এই শর্তে কোনো বাজারের তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-emerald-950 text-xs sm:text-sm font-bold border-b border-emerald-100">
                  <th className="py-3.5 px-4">বাজারের নাম</th>
                  <th className="py-3.5 px-4">বিভাগ</th>
                  <th className="py-3.5 px-4 text-right">সর্বনিম্ন দর</th>
                  <th className="py-3.5 px-4 text-right">সর্বোচ্চ দর</th>
                  <th className="py-3.5 px-4 text-right">গড় বিস্তার</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {filteredMarkets.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-emerald-700">
                        {toBengaliDigits(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-rose-700">
                        {toBengaliDigits(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-800">
                        {toBengaliDigits(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
