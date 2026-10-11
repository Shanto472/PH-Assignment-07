import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getAllProducts } from "@/lib/api";
import { TrendingUp, TrendingDown, LayoutGrid, Sparkles } from "lucide-react";


export default async function HomePage() {
  const products = await getAllProducts();

  // Top 6 risers
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  // Top 6 fallers
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      {/* 1. Navbar (includes sticky Category tabs & White Price Ticker) */}
      <Navbar />

      {/* 2. Hero / Banner */}
      <Hero />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16 flex-1">
        {/* Section A: আজ দাম বেড়েছে ▲ (Price Increase = Red) */}
        <section id="দাম-বেড়েছে" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                <TrendingUp className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-rose-700 font-bold">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  গতকালের তুলনায় যেসব পণ্যের দাম বৃদ্ধি পেয়েছে (শীর্ষ ৬টি পণ্য)
                </p>
              </div>
            </div>
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 w-fit">
              {risers.length} টি পণ্য
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে ▼ (Price Decrease = Green) */}
        <section id="দাম-কমেছে" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <TrendingDown className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-emerald-700 font-bold">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  ক্রেতাদের জন্য সুসংবাদ! যেসব পণ্যের দাম আজ হ্রাস পেয়েছে (শীর্ষ ৬টি পণ্য)
                </p>
              </div>
            </div>
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
              {fallers.length} টি পণ্য
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য (Anchor #সব-পণ্য) */}
        <section id="সব-পণ্য" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center shadow-xs">
                <LayoutGrid className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের হালনাগাদ দর তালিকা
                </p>
              </div>
            </div>
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 w-fit">
              মোট {products.length} টি পণ্য তালিকাভুক্ত
            </span>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500">কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
