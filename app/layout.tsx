import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display, M_PLUS_Rounded_1c, Noto_Serif_JP, Inter } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const mplusRounded1c = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  variable: "--font-mplus",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});



export const metadata: Metadata = {
  title: "Singapore Itinerary",
  description: "シンガポール旅行しおり",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Singapore Trip",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/icon.svg",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
              <body className={`${notoSansJP.variable} ${playfairDisplay.variable} ${mplusRounded1c.variable} ${notoSerifJP.variable} ${inter.variable} font-sans`}>
        {/* スキップリンク */}
        <a 
          href="#main" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
        >
          メインコンテンツにスキップ
        </a>
        
        <main id="main">
          <AuthGuard>
            {children}
          </AuthGuard>
        </main>
      </body>
    </html>
  );
}
