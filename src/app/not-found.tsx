import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, SearchAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl shadow-inner">
            🧺
          </div>

          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-emerald-800 tracking-tight block">
              ৪০৪
            </span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
            </h1>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              আপনি যে পণ্য বা ক্যাটাগরি খুঁজছেন তা বিদ্যমান নেই অথবা অন্য কোনো ঠিকানায় স্থানান্তর করা হয়েছে।
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-5 h-5" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
