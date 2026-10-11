"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession, signOut } from "@/lib/auth-client";
import { User, Mail, Calendar, Edit3, LogOut, ShieldCheck, ArrowRight } from "lucide-react";
import { toBengaliDigits } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-16 flex-1 w-full">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-56 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const createdAtFormatted = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "সাম্প্রতিক";

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-xl space-y-8">
          {/* Header & Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-100 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-4xl font-black uppercase shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-50">
              {user.name ? user.name.charAt(0) : "U"}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {user.name || "ব্যবহারকারী"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  সক্রিয় সদস্য
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <Mail className="w-4 h-4 text-gray-400" />
                {user.email}
              </p>
            </div>

            {/* C3: Update Information Button linking to /profile/update */}
            <Link
              href="/profile/update"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>তথ্য আপডেট করুন</span>
            </Link>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                পূর্ণ নাম
              </span>
              <p className="text-base font-bold text-gray-900">{user.name || "—"}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                ইমেইল ঠিকানা
              </span>
              <p className="text-base font-bold text-gray-900 truncate">{user.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 sm:col-span-2">
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                অ্যাকাউন্ট খোলার তারিখ
              </span>
              <p className="text-base font-bold text-gray-900">
                {createdAtFormatted}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <Link
              href="/"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
            >
              <span>বাজার দরে ফিরে যান</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold text-sm transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
