"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signUp, signIn } from "@/lib/auth-client";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "@/components/SocialIcons";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      const err = "অনুগ্রহ করে আপনার নাম প্রদান করুন";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (!email.trim()) {
      const err = "অনুগ্রহ করে ইমেইল প্রদান করুন";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (password.length < 6) {
      const err = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });

      if (error) {
        const msg = error.message || "নিবন্ধন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।";
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success("নিবন্ধন সফলভাবে সম্পন্ন হয়েছে! এখন সাইন ইন করুন।");
        // Navigate to signin page as per requirements
        router.push(`/signin?redirect=${encodeURIComponent(redirectUrl)}`);
      }
    } catch (err: any) {
      const msg = err?.message || "নিবন্ধন করার সময় অপ্রত্যাশিত সমস্যা হয়েছে";
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
    } catch {
      toast.error("সোশ্যাল লগইন প্রক্রিয়ায় সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">
          🌾
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          নতুন অ্যাকাউন্ট খুলুন
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          নিয়মিত সঠিক বাজার দর জানতে আপনার অ্যাকাউন্ট তৈরি করুন
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-700">
            পূর্ণ নাম
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

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
            পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
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
              <UserPlus className="w-5 h-5" />
              <span>সাইন আপ করুন</span>
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

      {/* Login Link */}
      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-xs sm:text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href={`/signin?redirect=${encodeURIComponent(redirectUrl)}`}
            className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-0.5"
          >
            <span>সাইন ইন করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense
          fallback={
            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 animate-pulse h-96" />
          }
        >
          <SignUpContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
