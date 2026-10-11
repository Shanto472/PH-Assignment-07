import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Side */}
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right Side */}
          <p className="text-xs sm:text-sm text-gray-500 italic md:text-right">
            “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
          </p>
        </div>
      </div>
    </footer>
  );
}
