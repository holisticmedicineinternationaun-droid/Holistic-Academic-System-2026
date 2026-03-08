import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "منظومة الطب الشمولي الأكاديمية",
  description: "المنصة الشمولية للبحث العلمي والتدريب الأكاديمي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-[#020617] text-slate-100 min-h-screen`}
      >
        <div className="fixed inset-0 z-[-1] opacity-40">
           <img 
            src="/dashboard_bg.png" 
            alt="background" 
            className="w-full h-full object-cover"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
