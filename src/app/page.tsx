import { getAllStocks } from "@/lib/sheets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const stocks = await getAllStocks();

  return (
    <>
      <Header />

      <main>
        {/* ─── HERO ─── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "80px 24px 100px",
            textAlign: "center",
          }}
        >
          {/* Background blobs */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "900px",
              height: "600px",
              background:
                "radial-gradient(ellipse, rgba(0,106,215,0.25) 0%, rgba(33,39,123,0.15) 40%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "10%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(154,217,234,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}
          >
            {/* Pill badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(0,106,215,0.15)",
                border: "1px solid rgba(0,106,215,0.35)",
                borderRadius: "100px",
                marginBottom: "28px",
                fontSize: "13px",
                color: "#9AD9EA",
                fontWeight: "500",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9AD9EA",
                  boxShadow: "0 0 8px rgba(154,217,234,0.8)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
              Dữ liệu cập nhật liên tục &nbsp;·&nbsp; {stocks.length} mã cổ phiếu
            </div>

            <h1
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: "900",
                lineHeight: 1.1,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Tra Cứu{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #9AD9EA 0%, #006AD7 50%, #21277B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Khuyến Nghị
              </span>
              <br />
              Mã Cổ Phiếu VN
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "#9AD9EA",
                lineHeight: "1.7",
                marginBottom: "44px",
                opacity: 0.85,
                maxWidth: "600px",
                margin: "0 auto 44px",
              }}
            >
              Nền tảng tư vấn và phân tích khuyến nghị đầu tư các mã cổ phiếu
              thị trường chứng khoán Việt Nam — HOSE, HNX, UPCOM.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#search"
                style={{
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #006AD7, #21277B)",
                  borderRadius: "12px",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "700",
                  boxShadow: "0 4px 24px rgba(0,106,215,0.5)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                🔍 Tìm mã cổ phiếu
              </a>
              <a
                href="#stocks"
                style={{
                  padding: "14px 32px",
                  background: "rgba(154,217,234,0.1)",
                  border: "1px solid rgba(154,217,234,0.3)",
                  borderRadius: "12px",
                  color: "#9AD9EA",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📊 Xem tất cả
              </a>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto 64px",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { label: "Mã khuyến nghị", value: `${stocks.length}+`, icon: "📈" },
              { label: "Thị trường", value: "HOSE · HNX · UPCOM", icon: "🏛️" },
              { label: "Cập nhật", value: "Hàng ngày", icon: "🔄" },
              { label: "Phân tích", value: "Chuyên sâu", icon: "🎯" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,106,215,0.12) 0%, rgba(33,39,123,0.25) 100%)",
                  border: "1px solid rgba(154,217,234,0.15)",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#fff",
                    marginBottom: "4px",
                    background: "linear-gradient(90deg, #9AD9EA, #006AD7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "#5F83B1" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SEARCH + STOCK LIST ─── */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 80px",
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              Danh Sách Khuyến Nghị
            </h2>
            <p style={{ color: "#5F83B1", fontSize: "15px" }}>
              Tìm kiếm và tra cứu khuyến nghị cho từng mã cổ phiếu
            </p>
          </div>

          <SearchBar stocks={stocks} />
        </section>

        {/* ─── SEO CONTENT BLOCK ─── */}
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(0,106,215,0.08), rgba(33,39,123,0.15))",
            borderTop: "1px solid rgba(154,217,234,0.1)",
            padding: "64px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#9AD9EA",
                marginBottom: "20px",
              }}
            >
              Về StockAdvisor – Tư Vấn Cổ Phiếu Việt Nam
            </h2>
            <div
              style={{
                color: "#5F83B1",
                fontSize: "15px",
                lineHeight: "1.9",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <p>
                <strong style={{ color: "#9AD9EA" }}>StockAdvisor VN</strong> là
                nền tảng tra cứu và tư vấn khuyến nghị mã cổ phiếu dành cho nhà
                đầu tư cá nhân tại thị trường chứng khoán Việt Nam. Chúng tôi
                cung cấp phân tích khuyến nghị chi tiết cho các mã cổ phiếu niêm
                yết tại{" "}
                <strong style={{ color: "#9AD9EA" }}>HOSE, HNX và UPCOM</strong>.
              </p>
              <p>
                Mỗi mã cổ phiếu đi kèm với nhận định và khuyến nghị từ đội ngũ
                phân tích, giúp nhà đầu tư có thêm góc nhìn tham khảo trước khi
                ra quyết định. Dữ liệu được cập nhật định kỳ để đảm bảo tính thời
                sự và độ chính xác.
              </p>
              <p
                style={{
                  padding: "16px",
                  background: "rgba(95,131,177,0.1)",
                  borderLeft: "3px solid #006AD7",
                  borderRadius: "0 8px 8px 0",
                  fontSize: "13px",
                  fontStyle: "italic",
                }}
              >
                ⚠️ Lưu ý: Thông tin trên website chỉ mang tính chất tham khảo,
                không phải lời khuyên đầu tư chính thức. Nhà đầu tư cần tự nghiên
                cứu và chịu trách nhiệm với các quyết định của mình.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
