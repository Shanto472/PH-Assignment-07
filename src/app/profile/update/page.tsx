"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession, updateUser } from "@/lib/auth-client";
import { User, ArrowLeft, CheckCircle2, Save } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error("তথ্য আপডেট করতে অনুগ্রহ করে সাইন ইন করুন");
        router.push("/signin?redirect=/profile/update");
      } else {
        setName(session.user.name || "");
      }
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const err = "অনুগ্রহ করে একটি বৈধ নাম লিখুন";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);

    try {
      // BetterAuth update-user API: authClient.updateUser({ name })
      const { data, error } = await updateUser({
        name: name.trim(),
      });

      if (error) {
        const msg = error.message || "তথ্য আপডেট করা যায়নি";
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success("তথ্য সফলভাবে আপডেট সম্পন্ন হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      const msg = err?.message || "তথ্য আপডেটের সময় ত্রুটি হয়েছে";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
        <Navbar />
        <main className="max-w-md mx-auto px-4 py-16 flex-1 w-full">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm animate-pulse space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded-xl" />
            <div className="h-10 bg-gray-200 rounded-xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-12 flex-1 w-full flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-xl space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>প্রোফাইলে ফিরে যান</span>
            </Link>

            <h1 className="text-2xl font-black text-gray-900 tracking-tight pt-2">
              তথ্য আপডেট করুন
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              আপনার অ্যাকাউন্টের নাম পরিবর্তন করে নতুন তথ্য সংরক্ষণ করুন
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                আপনার নাম
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নতুন নাম লিখুন"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email (Read-only for reference) */}
            <div className="space-y-1.5 opacity-60">
              <label className="block text-xs font-semibold text-gray-500">
                ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                disabled
                value={session.user.email}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Update Information Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
