import Link from "next/link";
import type { StockData } from "@/lib/sheets";

interface Props {
  data: StockData;
  index?: number;
}

export default function StockCard({ data, index = 0 }: Props) {
  const preview =
    data.tomtat?.length > 110
      ? data.tomtat.slice(0, 110) + "..."
      : data.tomtat || data.recommend?.slice(0, 110) || "";

  const delay = `${(index % 12) * 0.05}s`;

  return (
    <Link
      href={`/${data.stock}`}
      style={{ display: "block", textDecoration: "none", animationDelay: delay }}
      className="animate-fade-up"
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,106,215,0.15) 0%, rgba(33,39,123,0.35) 100%)",
          border: "1px solid rgba(154, 217, 234, 0.18)",
          borderRadius: "16px",
          padding: "22px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 12px 40px rgba(0, 106, 215, 0.35)";
          el.style.borderColor = "rgba(0, 106, 215, 0.6)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
          el.style.borderColor = "rgba(154, 217, 234, 0.18)";
        }}
      >
        {/* Glare */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "80px", height: "80px",
          background: "radial-gradient(circle, rgba(154,217,234,0.1) 0%, transparent 70%)",
          borderRadius: "0 16px 0 0", pointerEvents: "none",
        }} />

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <span style={{
            background: "linear-gradient(135deg, #006AD7, #21277B)",
            color: "#fff",
            padding: "4px 14px",
            borderRadius: "8px",
            fontSize: "17px",
            fontWeight: "800",
            letterSpacing: "0.08em",
            boxShadow: "0 2px 10px rgba(0,106,215,0.4)",
          }}>
            {data.stock}
          </span>

          {data.nganh && (
            <span style={{
              padding: "3px 10px",
              background: "rgba(154,217,234,0.12)",
              border: "1px solid rgba(154,217,234,0.25)",
              borderRadius: "100px",
              fontSize: "11px",
              color: "#9AD9EA",
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "140px",
            }}>
              {data.nganh}
            </span>
          )}
        </div>

        {/* Tóm tắt */}
        {preview && (
          <p style={{ color: "#9AD9EA", fontSize: "13px", lineHeight: "1.65", opacity: 0.85, flex: 1 }}>
            {preview}
          </p>
        )}

        {/* CTA */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          color: "#5F83B1", fontSize: "12px", fontWeight: "600",
          marginTop: "auto",
        }}>
          <span>Xem phân tích chi tiết</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
