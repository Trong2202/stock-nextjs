import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StockAdvisor VN – Tư Vấn Mã Cổ Phiếu Việt Nam",
    template: "%s | StockAdvisor VN",
  },
  description:
    "Nền tảng tra cứu và tư vấn khuyến nghị mã cổ phiếu thị trường chứng khoán Việt Nam. Cập nhật liên tục các phân tích và khuyến nghị đầu tư mã cổ phiếu HOSE, HNX, UPCOM.",
  keywords: [
    "mã cổ phiếu",
    "khuyến nghị cổ phiếu",
    "tư vấn đầu tư chứng khoán",
    "chứng khoán Việt Nam",
    "HOSE",
    "HNX",
    "UPCOM",
    "phân tích cổ phiếu",
    "stock advisor",
  ],
  authors: [{ name: "StockAdvisor VN" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "StockAdvisor VN – Tư Vấn Mã Cổ Phiếu",
    description:
      "Tra cứu khuyến nghị mã cổ phiếu thị trường Việt Nam. Phân tích, tư vấn đầu tư cập nhật.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
