import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailsView from "@/components/ProductDetailsView";
import { getAllProducts, getProductBySlug } from "@/lib/api";
import { AlertCircle, ArrowLeft } from "lucide-react";


interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const [allProducts, product] = await Promise.all([
    getAllProducts(),
    getProductBySlug(decodedSlug),
  ]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-20 flex-1 flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-5 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                পণ্যটি খুঁজে পাওয়া যায়নি
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                অনুরোধকৃত &quot;{decodedSlug}&quot; পণ্যটি আমাদের তালিকাভুক্ত নয় অথবা সাময়িকভাবে অনুপলব্ধ।
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1">
        <ProductDetailsView product={product} />
      </main>
      <Footer />
    </div>
  );
}
