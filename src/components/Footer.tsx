export default function Footer() {
  return (
    <footer style={{
      marginTop: "80px",
      borderTop: "1px solid rgba(154, 217, 234, 0.12)",
      background: "rgba(13, 27, 62, 0.6)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px 32px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px",
          marginBottom: "40px",
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontSize: "20px",
              fontWeight: "700",
              background: "linear-gradient(90deg, #9AD9EA, #006AD7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "12px",
            }}>StockAdvisor VN</div>
            <p style={{ color: "#5F83B1", fontSize: "14px", lineHeight: "1.7" }}>
              Nền tảng tư vấn và khuyến nghị mã cổ phiếu thị trường chứng khoán Việt Nam. Dữ liệu cập nhật định kỳ.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: "#9AD9EA", fontSize: "14px", fontWeight: "600", marginBottom: "16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Thị trường
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["HOSE", "HNX", "UPCOM"].map(m => (
                <li key={m}><span style={{ color: "#5F83B1", fontSize: "14px" }}>{m}</span></li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 style={{ color: "#9AD9EA", fontSize: "14px", fontWeight: "600", marginBottom: "16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Tuyên bố miễn trách
            </h4>
            <p style={{ color: "#5F83B1", fontSize: "13px", lineHeight: "1.7" }}>
              Thông tin trên website chỉ mang tính chất tham khảo, không phải khuyến nghị đầu tư chính thức. Nhà đầu tư tự chịu trách nhiệm với quyết định của mình.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(154, 217, 234, 0.1)",
          paddingTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ color: "#5F83B1", fontSize: "13px" }}>
            © {new Date().getFullYear()} StockAdvisor VN. Dữ liệu từ thị trường chứng khoán Việt Nam.
          </p>
          <p style={{ color: "#5F83B1", fontSize: "13px" }}>
            Powered by <span style={{ color: "#006AD7", fontWeight: "600" }}>Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
