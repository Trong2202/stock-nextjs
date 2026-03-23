import { getAllStocks } from "@/lib/sheets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

export const revalidate = 3600;

export const metadata = {
  title: "Danh Sách Khuyến Nghị Cổ Phiếu | StockAdvisor VN",
  description: "Trang tra cứu toàn bộ danh sách các mã cổ phiếu đang được khuyến nghị từ StockAdvisor VN.",
};

export default async function DanhSachPage() {
  const stocks = await getAllStocks();

  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh", padding: "40px 24px 80px" }}>
        <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "900",
                color: "#fff",
                marginBottom: "12px",
                background: "linear-gradient(90deg, #9AD9EA, #006AD7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Danh Sách Khuyến Nghị
            </h1>
            <p style={{ color: "#5F83B1", fontSize: "16px", maxWidth: "600px" }}>
              Xem toàn bộ danh mục {stocks.length} mã cổ phiếu đang được StockAdvisor theo dõi và khuyến nghị trên thị trường chứng khoán Việt Nam.
            </p>
          </div>

          <SearchBar stocks={stocks} showAllOnEmpty={true} />
        </section>
      </main>

      <Footer />
    </>
  );
}
