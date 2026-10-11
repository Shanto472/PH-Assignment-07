"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

interface CategoryNavItem {
  name: string;
  slug: string;
  icon: string;
}

const CATEGORIES: CategoryNavItem[] = [
  { name: "সকল পণ্য", slug: "", icon: "🛒" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [bengaliDate, setBengaliDate] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    setBengaliDate(getBengaliDate());
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট সম্পন্ন হয়েছে");
      setIsUserDropdownOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Bar: Logo, Date, and Auth */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={26}
                height={26}
                className="object-contain"
                onError={(e) => {
                  // Fallback to emoji if logo image doesn't render
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-xl">🛒</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
                বাজার দর
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  লাইভ
                </span>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {bengaliDate || "আজকের বাজার দর"}
              </span>
            </div>
          </Link>

          {/* Desktop Right Auth Section */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-lg" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors cursor-pointer text-gray-800 font-medium text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {session.user.name ? session.user.name.charAt(0) : "U"}
                  </div>
                  <span className="max-w-[120px] truncate">{session.user.name || "ব্যবহারকারী"}</span>
                  <ChevronDown className="w-4 h-4 text-emerald-700" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-emerald-100 py-2 z-50"
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {session.user.name || "ব্যবহারকারী"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-emerald-600" />
                      আমার প্রোফাইল
                    </Link>

                    <Link
                      href="/profile/update"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      তথ্য আপডেট করুন
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="মেনু খুলুন"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Middle / Second Row: Category navigation pills */}
      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const href = cat.slug === "" ? "/" : `/category/${cat.slug}`;
              const isActive =
                cat.slug === ""
                  ? pathname === "/"
                  : pathname === `/category/${cat.slug}` ||
                    pathname.startsWith(`/category/${cat.slug}/`);

              return (
                <Link
                  key={cat.slug || "all"}
                  href={href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs font-semibold scale-105"
                      : "text-gray-600 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200/70"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="pt-2 border-b border-gray-100 pb-3">
            {session?.user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {session.user.name ? session.user.name.charAt(0) : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800"
                  >
                    <User className="w-3.5 h-3.5" />
                    প্রোফাইল
                  </Link>
                  <Link
                    href="/profile/update"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    আপডেট
                  </Link>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm text-rose-600 bg-rose-50 rounded-lg font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 rounded-lg border border-emerald-600 text-emerald-700 font-medium text-sm hover:bg-emerald-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-3 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* White Price Ticker (Moving Line) on Every Page */}
      <PriceTicker />
    </header>
  );
}
