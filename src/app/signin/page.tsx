"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signIn } from "@/lib/auth-client";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "@/components/SocialIcons";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      const err = "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signIn.email({
        email: email.trim(),
        password: password,
      });

      if (error) {
        const msg = error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়";
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success("সফলভাবে সাইন ইন সম্পন্ন হয়েছে!");
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err: any) {
      const msg = err?.message || "সাইন ইন করার সময় ত্রুটি হয়েছে";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      await signIn.social({
        provider,
        callbackURL: redirectUrl,
      });
      toast.success(`${provider === "google" ? "গুগল" : "গিটহাব"} দিয়ে সাইন ইন হচ্ছে...`);
    } catch (err: any) {
      toast.error("সোশ্যাল লগইন প্রক্রিয়ায় সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">
          🛒
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          সাইন ইন
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          আপনার অ্যাকাউন্টে প্রবেশ করে বাজারের বিস্তারিত তথ্য দেখুন
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">
            ইমেইল ঠিকানা
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">
            পাসওয়ার্ড
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>সাইন ইন</span>
            </>
          )}
        </button>
      </form>

      {/* Social Login Options */}
      <div className="space-y-3 pt-2">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-400 font-medium">অথবা</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>গুগল</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <GitHubIcon className="w-4 h-4 text-gray-800" />
            <span>গিটহাব</span>
          </button>
        </div>
      </div>

      {/* Register Link */}
      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-xs sm:text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href={`/signup?redirect=${encodeURIComponent(redirectUrl)}`}
            className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-0.5"
          >
            <span>সাইন আপ করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense
          fallback={
            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 animate-pulse h-96" />
          }
        >
          <SignInContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
