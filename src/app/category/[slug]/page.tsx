import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryView from "@/components/CategoryView";
import {
  getAllProducts,
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/api";
import { ArrowLeft, AlertCircle } from "lucide-react";


interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // Fetch category details and all products for ticker
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  // Find category metadata
  const currentCategory =
    categories.find(
      (c) =>
        c.slug.toLowerCase() === decodedSlug.toLowerCase() ||
        c.id.toLowerCase() === decodedSlug.toLowerCase()
    ) || (await getCategoryBySlug(decodedSlug));

  // If category does not exist, show empty/404 state with CTA
  if (!currentCategory) {
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
                ক্যাটাগরি পাওয়া যায়নি
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                অনুরোধকৃত &quot;{decodedSlug}&quot; ক্যাটাগরিটি আমাদের সিস্টেমে খুঁজে পাওয়া যায়নি।
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

  // Fetch products in this category
  let categoryProducts = await getProductsByCategory(currentCategory.slug);

  // Fallback: if category filter API returned empty, filter from all products
  if (categoryProducts.length === 0) {
    categoryProducts = allProducts.filter(
      (p) =>
        p.category?.toLowerCase() === currentCategory.slug.toLowerCase() ||
        p.category?.toLowerCase() === currentCategory.id.toLowerCase() ||
        p.categoryNameBn?.toLowerCase() === currentCategory.nameBn.toLowerCase()
    );
  }

  // If category has no items: show Empty state with CTA button “হোম পেজে ফিরে যান”
  if (categoryProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAF7]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-16 flex-1">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-5 shadow-sm">
            <div className="text-5xl">{currentCategory.icon || "🧺"}</div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                {currentCategory.nameBn} - কোনো পণ্য নেই
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই। অনুগ্রহ করে অন্য কোনো ক্যাটাগরি দেখুন।
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
        <CategoryView
          category={currentCategory}
          initialProducts={categoryProducts}
        />
      </main>
      <Footer />
    </div>
  );
}
