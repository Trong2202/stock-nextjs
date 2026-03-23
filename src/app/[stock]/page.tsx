import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllStocks, getStockByCode } from "@/lib/sheets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ stock: string }>;
}

export async function generateStaticParams() {
  const stocks = await getAllStocks();
  return stocks.map((s) => ({ stock: s.stock }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stock } = await params;
  const code = stock.toUpperCase();
  const data = await getStockByCode(code);

  if (!data) {
    return { title: `${code} – Không tìm thấy` };
  }

  const description = `${data.tomtat?.slice(0, 120) || data.recommend?.slice(0, 120) || ""}`;

  return {
    title: `${code} – Khuyến Nghị Cổ Phiếu`,
    description: `Phân tích và khuyến nghị đầu tư mã cổ phiếu ${code}${data.nganh ? ` ngành ${data.nganh}` : ""}. ${description}`,
    keywords: [
      `mã cổ phiếu ${code}`,
      `khuyến nghị ${code}`,
      `phân tích ${code}`,
      data.nganh || "",
      "chứng khoán Việt Nam",
    ].filter(Boolean),
    openGraph: {
      title: `${code} – Khuyến Nghị | StockAdvisor VN`,
      description: `Xem phân tích và khuyến nghị đầu tư mã ${code}${data.nganh ? ` (${data.nganh})` : ""}.`,
    },
  };
}

export default async function StockDetailPage({ params }: Props) {
  const { stock } = await params;
  const code = stock.toUpperCase();
  const data = await getStockByCode(code);

  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Khuyến nghị mã cổ phiếu ${code}`,
    description: data.tomtat?.slice(0, 200) || data.recommend?.slice(0, 200),
    author: { "@type": "Organization", name: "StockAdvisor VN" },
    publisher: { "@type": "Organization", name: "StockAdvisor VN" },
    dateModified: new Date().toISOString(),
  };

  const recommendParagraphs = (data.recommend || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Breadcrumb */}
        <nav style={{
          marginBottom: "32px", display: "flex", alignItems: "center",
          gap: "8px", fontSize: "14px", color: "#5F83B1",
        }}>
          <Link href="/" style={{ color: "#5F83B1", textDecoration: "none" }}>Trang chủ</Link>
          <span>›</span>
          <Link href="/#stocks" style={{ color: "#5F83B1", textDecoration: "none" }}>Danh sách</Link>
          <span>›</span>
          <span style={{ color: "#9AD9EA", fontWeight: "600" }}>{code}</span>
        </nav>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,106,215,0.2), rgba(33,39,123,0.45))",
          border: "1px solid rgba(154,217,234,0.25)",
          borderRadius: "24px",
          padding: "36px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px",
            background: "radial-gradient(circle, rgba(0,106,215,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
            <h1 style={{
              background: "linear-gradient(135deg, #006AD7, #21277B)",
              color: "#fff",
              padding: "10px 28px",
              borderRadius: "12px",
              fontSize: "36px",
              fontWeight: "900",
              letterSpacing: "0.08em",
              boxShadow: "0 4px 24px rgba(0,106,215,0.5)",
              margin: 0,
            }}>
              {code}
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.nganh && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "5px 14px",
                  background: "rgba(154,217,234,0.12)",
                  border: "1px solid rgba(154,217,234,0.3)",
                  borderRadius: "100px",
                  fontSize: "13px", color: "#9AD9EA", fontWeight: "500",
                  width: "fit-content",
                }}>
                  🏭 {data.nganh}
                </span>
              )}
              <p style={{ color: "#5F83B1", fontSize: "14px", margin: 0 }}>
                Mã cổ phiếu · Thị trường Việt Nam
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Tóm tắt */}
          {data.tomtat && (
            <section style={{
              background: "linear-gradient(135deg, rgba(0,106,215,0.1), rgba(33,39,123,0.2))",
              border: "1px solid rgba(154,217,234,0.15)",
              borderRadius: "18px",
              padding: "32px",
            }}>
              <h2 style={{
                fontSize: "17px", fontWeight: "700", color: "#9AD9EA",
                marginBottom: "16px", paddingBottom: "12px",
                borderBottom: "1px solid rgba(154,217,234,0.15)",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{
                  width: "4px", height: "20px",
                  background: "linear-gradient(180deg, #9AD9EA, #5F83B1)",
                  borderRadius: "2px", display: "inline-block",
                }} />
                Tóm tắt
              </h2>
              <p style={{ color: "#c8d8ea", fontSize: "15px", lineHeight: "1.8", margin: 0 }}>
                {data.tomtat}
              </p>
            </section>
          )}

          {/* Khuyến nghị */}
          {data.recommend && (
            <section style={{
              background: "linear-gradient(135deg, rgba(0,106,215,0.08), rgba(33,39,123,0.2))",
              border: "1px solid rgba(154,217,234,0.15)",
              borderRadius: "18px",
              padding: "32px",
            }}>
              <h2 style={{
                fontSize: "17px", fontWeight: "700", color: "#9AD9EA",
                marginBottom: "16px", paddingBottom: "12px",
                borderBottom: "1px solid rgba(154,217,234,0.15)",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{
                  width: "4px", height: "20px",
                  background: "linear-gradient(180deg, #006AD7, #21277B)",
                  borderRadius: "2px", display: "inline-block",
                }} />
                Khuyến Nghị Đầu Tư
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {recommendParagraphs.map((para, i) => (
                  <p key={i} style={{ color: "#c8d8ea", fontSize: "15px", lineHeight: "1.8", margin: 0 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Disclaimer */}
              <div style={{
                marginTop: "24px", padding: "14px 18px",
                background: "rgba(95,131,177,0.1)",
                borderLeft: "3px solid #006AD7",
                borderRadius: "0 8px 8px 0",
                fontSize: "13px", color: "#5F83B1", fontStyle: "italic",
              }}>
                ⚠️ Thông tin chỉ mang tính tham khảo. Nhà đầu tư tự chịu trách nhiệm với quyết định của mình.
              </div>
            </section>
          )}

          {/* Back */}
          <div>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 28px",
              background: "linear-gradient(135deg, #006AD7, #21277B)",
              borderRadius: "12px", color: "#fff", textDecoration: "none",
              fontSize: "15px", fontWeight: "600",
              boxShadow: "0 4px 20px rgba(0,106,215,0.4)",
            }}>
              ← Xem danh sách
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
