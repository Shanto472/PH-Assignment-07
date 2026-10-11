import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) - নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
  description: "সারা দেশের প্রধান প্রধান বাজারের পণ্যের নির্ভরযোগ্য ও হালনাগাদ আজকের বাজার দর।",
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body
        className={`${hindSiliguri.className} min-h-screen flex flex-col bg-[#F8FAF7] text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
            },
            success: {
              style: {
                background: "#065f46",
              },
            },
            error: {
              style: {
                background: "#991b1b",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
