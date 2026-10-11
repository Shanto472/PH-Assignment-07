import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ShoppingBasket, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-[#F8FAF7] border-b border-emerald-100/60 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-200 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              🌾 নিত্যপ্রয়োজনীয় পণ্যের বাজার দর
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              আজকের বাজার দর <br />
              <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                জানুন এক ক্লিকেই
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              সারা দেশের প্রধান প্রধান পাইকারি ও খুচরা বাজারের নির্ভরযোগ্য ও হালনাগাদ
              পণ্যের দামের তালিকা। কোনো বাড়তি ঝামেলা ছাড়াই বাজারের সঠিক দর যাচাই করুন।
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#সব-পণ্য"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBasket className="w-5 h-5" />
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium px-2 py-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>রিয়েল-টাইম বাজারের দাম আপডেট</span>
              </div>
            </div>
          </div>

          {/* Right Banner/Hero Image Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-emerald-200/40 rounded-3xl blur-2xl transform rotate-3" />
              
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর গ্রোসারি ঝুড়ি"
                  width={500}
                  height={500}
                  priority
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
