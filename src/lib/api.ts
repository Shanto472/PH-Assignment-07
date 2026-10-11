import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./mock-data";

export const BASE_API_URL = "https://api.api-store.workers.dev/api/bazardor";
export const ALT_API_URL = "https://api.abcz.workers.dev/api/bazardor";

export interface MarketData {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets: MarketData[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export const bengaliDigitsMap: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBengaliDigits(value: number | string): string {
  if (value === undefined || value === null) return "";
  const str = typeof value === "number" ? value.toLocaleString("en-US") : value.toString();
  return str.replace(/\d/g, (d) => bengaliDigitsMap[d] || d);
}

export function formatPrice(price: number | string): string {
  if (price === undefined || price === null || isNaN(Number(price))) return "০ টাকা";
  return `${toBengaliDigits(price)} টাকা`;
}

export function formatUnit(unit: string): string {
  if (!unit) return "";
  const lower = unit.toLowerCase().trim();
  if (lower === "kg" || lower === "কেজি") return "প্রতি কেজি";
  if (lower === "litre" || lower === "liter" || lower === "লিটার") return "প্রতি লিটার";
  if (lower === "dozen" || lower === "ডজন") return "প্রতি ডজন";
  if (lower === "piece" || lower === "পিস" || lower === "হালি") return "প্রতি পিস";
  if (lower.startsWith("প্রতি")) return lower;
  return `প্রতি ${unit}`;
}

export function getBengaliDate(): string {
  try {
    const now = new Date();
    const days = [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ];
    const months = [
      "জানুয়ারি",
      "ফেব্রুয়ারি",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ];
    const dayName = days[now.getDay()];
    const dateNum = toBengaliDigits(now.getDate());
    const monthName = months[now.getMonth()];
    const yearNum = toBengaliDigits(now.getFullYear());
    return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
  } catch {
    return "আজকের বাজার দর";
  }
}

async function safeFetchJson<T>(path: string): Promise<T | null> {
  // 1. Try Primary BASE_API_URL
  try {
    const res = await fetch(`${BASE_API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}

  // 2. Try Secondary ALT_API_URL
  try {
    const res2 = await fetch(`${ALT_API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (res2.ok) {
      return await res2.json();
    }
  } catch {}

  return null;
}

// Fetch all products
export async function getAllProducts(): Promise<Product[]> {
  const data = await safeFetchJson<Product[] | { products: Product[] }>("/products");
  if (data) {
    const list = Array.isArray(data) ? data : (data as any).products;
    if (Array.isArray(list) && list.length > 0) return list;
  }
  return FALLBACK_PRODUCTS;
}

// Fetch categories
export async function getCategories(): Promise<Category[]> {
  const data = await safeFetchJson<Category[] | { categories: Category[] }>("/categories");
  if (data) {
    const list = Array.isArray(data) ? data : (data as any).categories;
    if (Array.isArray(list) && list.length > 0) return list;
  }
  return FALLBACK_CATEGORIES;
}

// Fetch products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await safeFetchJson<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return FALLBACK_PRODUCTS.filter(
    (p) =>
      p.category?.toLowerCase() === categorySlug.toLowerCase() ||
      p.slug.toLowerCase().includes(categorySlug.toLowerCase())
  );
}

// Fetch single product by slug or id
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (/^\d+$/.test(slug)) {
    const byId = await safeFetchJson<Product>(`/products/${slug}`);
    if (byId && byId.id) return byId;
  }

  const all = await getAllProducts();
  const found = all.find(
    (p) =>
      p.slug === slug ||
      p.id.toString() === slug ||
      encodeURIComponent(p.slug) === slug
  );
  return found || null;
}

// Fetch category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await safeFetchJson<Category>(`/categories/${encodeURIComponent(slug)}`);
  if (data && (data.slug || data.id)) return data;

  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}
