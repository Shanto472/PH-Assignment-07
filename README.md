# 🛒 বাজার দর (BazarDor) — Daily Commodity Market Tracker

> Monitor real-time, authentic commodity and daily essentials prices across Bangladesh with a single click. Accurate wholesale and retail pricing from major division markets at your fingertips.

---

## 🌐 Live & Repository Links
- **Live Deployment:** [https://ph-assignment-07-eta.vercel.app/](https://ph-assignment-07-eta.vercel.app/)
- **GitHub Repository:** [https://github.com/Shanto472/PH-Assignment-07](https://github.com/Shanto472/PH-Assignment-07)

---

## 📖 Project Overview
**বাজার দর (BazarDor)** is a modern, high-performance, and responsive daily commodity market monitoring web application built with **Next.js 16 (App Router)** and **Tailwind CSS v4**. It allows everyday consumers, wholesale shoppers, and retail merchants to track and compare current wholesale and retail prices of rice, lentils, oil, fresh vegetables, fish, meat, dairy, eggs, and spices across various divisions and prominent wholesale markets in Bangladesh (such as Karwan Bazar, Green Market, and Khatunganj).

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack React framework with Server Components & Client Components |
| **TypeScript** | Static type safety and enhanced developer experience |
| **Tailwind CSS v4** | Modern utility-first CSS styling and fluid animations |
| **BetterAuth** | Secure authentication system (Email/Password & Social OAuth) |
| **SQLite (`better-sqlite3`)** | Fast, embedded database engine for auth sessions and user storage |
| **Lucide React** | Sleek, modern iconography |
| **react-hot-toast** | Dynamic toast notifications for authentication & redirects |
| **Google Fonts (`Hind Siliguri`)** | Native typography tailored for Bengali and English text |

---

## 🌟 5 Key Features

### 1. Live White Price Ticker Marquee (Fixed on All Pages)
A continuous marquee ticker with a clean white background permanently positioned beneath the navigation bar. It displays real-time price updates for daily commodities including product names, current rates, units, and color-coded change indicators (**▲ Red for price rise**, **▼ Green for price drop**, and **— Gray for no change**). Hovering over the ticker pauses the animation smoothly.

### 2. Market Risers & Fallers Analytics (Home Page)
The homepage automatically analyzes price trends across all items and presents two dedicated sections:
- **আজ দাম বেড়েছে ▲ (Top Risers):** Highlights commodities with significant price jumps over the previous day (styled in Red).
- **আজ দাম কমেছে ▼ (Top Fallers):** Highlights great deals for shoppers where prices have dropped (styled in Green).
- **সব পণ্য (#সব-পণ্য):** The Hero CTA button provides a smooth one-click scroll to browse the entire product catalog.

### 3. Protected Product Details & Regional Market Breakdown (`/product/[slug]`)
Access to detailed product statistics requires user authentication. Unauthenticated users are redirected to the sign-in page with a prompt toast notification. Logged-in users can view:
- Commodity overview, category tags, and packaging units.
- Dedicated summary cards: Lowest Price, Average Price, and Highest Price.
- Market-wise comparison table with Division filter (Dhaka, Chittagong, Rajshahi, Khulna, etc.) and search functionality.

### 4. Challenge C1: Numeric Sorting with Bengali Numerals (`/category/[slug]`)
The category page features a dedicated sorting bar matching the Figma layout with options:
- **ডিফল্ট (Default)**
- **দাম: কম থেকে বেশি (Price: Low to High)**
- **দাম: বেশি থেকে কম (Price: High to Low)**
Prices formatted with Bengali numerals (e.g., `৳৭০/কেজি`) are correctly converted and compared numerically (`Number(today)`), preventing lexicographical string-sorting bugs.

### 5. Challenge C3: BetterAuth Profile & Live Information Update
- Complete user profile overview at `/profile`.
- An "Update Information" (তথ্য আপডেট করুন) button that redirects to `/profile/update`.
- Integrated with BetterAuth's official `authClient.updateUser({ name })` method to dynamically update user credentials with instant feedback and toast notifications.

---

## 🏆 Challenge Requirements Implementation

### 🔹 Challenge C1: Sort Dropdown (সাজান)
- Built on category pages with a custom clean dropdown bar containing chevron indicators.
- Parses Bengali digits (`০-৯`) into native JavaScript integers before performing comparative sorts, ensuring consistent ordering whether ascending or descending.

### 🔹 Challenge C2: Comprehensive GitHub README
- Well-structured and formatted in English covering project architecture, tech stack, 5 core features, API endpoints, and step-by-step installation instructions.

### 🔹 Challenge C3: Update Information Feature
- Located under `/profile/update`.
- Contains an accessible input form allowing users to change their display name.
- Implements `authClient.updateUser({ name })` following BetterAuth documentation guidelines with seamless redirect back to `/profile`.

---

## 🚀 Additional Highlights & UX Polish
- **Custom 404 Page:** Friendly Bengali error view with a "হোম পেজে ফিরে যান" button for any invalid category or product slug.
- **Skeleton Loaders:** Fluid animated skeleton placeholders while fetching data asynchronously from the API.
- **Dynamic Bengali Date:** Automated display of today's Bengali weekday, date, and month on the Navbar header.
- **Full Responsive Layout:** Optimized grid collapses and touch-friendly controls across mobile, tablet, and desktop viewports.

---

## 🔗 API Endpoints Used

Primary Base URL: `https://api.api-store.workers.dev/api/bazardor`

- **All Products:** `GET /products`
- **Category Filter:** `GET /products?category={category_slug}`
- **Single Product:** `GET /products/{id}`
- **All Categories:** `GET /categories`
- **Single Category:** `GET /categories/{slug}`

*(Includes built-in resilient fallback handlers to safeguard against Cloudflare 429 rate limits).*

---

## 💻 Local Setup & Installation

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Shanto472/PH-Assignment-07.git
cd PH-Assignment-07
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Ensure your `.env.local` contains:
```env
BETTER_AUTH_SECRET=your-random-32-char-secret-key-bazardor
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Production Build Test
```bash
npm run build
npm run start
```

---

## 👨‍💻 Author
- **Md. Shanto Ali** ([@Shanto472](https://github.com/Shanto472))
- Programming Hero — Assignment 07
