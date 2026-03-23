"use client";

import { useState } from "react";
import type { StockData } from "@/lib/sheets";
import StockCard from "./StockCard";

interface Props {
  stocks: StockData[];
  showAllOnEmpty?: boolean;
}

export default function SearchBar({ stocks, showAllOnEmpty = false }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? stocks.filter((s) => {
        const qCased = query.toUpperCase();
        // 1. Khớp mã cổ phiếu từ đầu (Vd: gõ "A" -> "ACB", "ABB". Gõ "ACB" -> "ACB")
        if (s.stock.toUpperCase().startsWith(qCased)) return true;
        
        // 2. Hoặc tìm kiếm trong chức danh ngành (Vd: "Ngân hàng")
        const qLower = query.toLowerCase();
        return s.nganh?.toLowerCase().includes(qLower) || false;
      })
    : (showAllOnEmpty ? stocks : []);

  return (
    <div>
      {/* Search input */}
      <div id="search" style={{ position: "relative", marginBottom: "32px" }}>
        <div style={{
          position: "absolute", left: "20px", top: "50%",
          transform: "translateY(-50%)", fontSize: "20px",
          pointerEvents: "none", zIndex: 1,
        }}>🔍</div>
        <input
          type="text"
          id="stock-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo mã (VNM, HPG...) hoặc ngành (Ngân hàng, Bất động sản...)"
          style={{
            width: "100%",
            padding: "16px 24px 16px 56px",
            background: "rgba(154, 217, 234, 0.08)",
            border: "1px solid rgba(154, 217, 234, 0.25)",
            borderRadius: "14px",
            color: "#fff",
            fontSize: "15px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#006AD7";
            e.target.style.boxShadow = "0 0 0 3px rgba(0,106,215,0.2)";
            e.target.style.background = "rgba(0,106,215,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(154, 217, 234, 0.25)";
            e.target.style.boxShadow = "none";
            e.target.style.background = "rgba(154, 217, 234, 0.08)";
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              position: "absolute", right: "16px", top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(154,217,234,0.15)", border: "none",
              borderRadius: "6px", color: "#9AD9EA",
              cursor: "pointer", padding: "4px 10px", fontSize: "13px",
            }}
          >✕</button>
        )}
      </div>

      {/* Result count */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "24px", flexWrap: "wrap", gap: "12px",
      }}>
        <p style={{ color: "#5F83B1", fontSize: "14px" }}>
          {query
            ? `Tìm thấy ${filtered.length} / ${stocks.length} mã`
            : showAllOnEmpty
            ? `${stocks.length} mã cổ phiếu có khuyến nghị`
            : `Nhập mã hoặc ngành để tra cứu trong dữ liệu ${stocks.length} cổ phiếu...`}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div id="stocks" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "18px",
        }}>
          {filtered.map((stock, i) => (
            <StockCard key={stock.stock} data={stock} index={i} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 24px", color: "#5F83B1" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>{query ? "📊" : "🔍"}</div>
          <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
            {query ? `Không tìm thấy mã "${query}"` : "Bắt đầu tìm kiếm"}
          </p>
          <p style={{ fontSize: "14px" }}>
            {query ? "Thử tìm với mã hoặc tên ngành khác." : "Ví dụ: Gõ 'VNM' hoặc 'Ngân hàng'"}
          </p>
        </div>
      )}
    </div>
  );
}
