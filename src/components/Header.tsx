"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(13, 27, 62, 0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(154, 217, 234, 0.15)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #006AD7, #21277B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "700",
            color: "#fff",
            boxShadow: "0 0 16px rgba(0, 106, 215, 0.5)",
          }}>S</div>
          <div>
            <span style={{
              fontSize: "18px",
              fontWeight: "700",
              background: "linear-gradient(90deg, #9AD9EA, #006AD7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>StockAdvisor</span>
            <span style={{ fontSize: "11px", color: "#5F83B1", display: "block", lineHeight: 1, marginTop: "2px", letterSpacing: "0.05em" }}>VN MARKET INSIGHTS</span>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" style={{ color: "#9AD9EA", textDecoration: "none", fontSize: "14px", fontWeight: "500", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9AD9EA")}>
            Trang chủ
          </Link>
          <Link href="/danh-sach" style={{ color: "#9AD9EA", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9AD9EA")}>
            Danh sách
          </Link>
          <a href="/#search" style={{
            padding: "8px 20px",
            background: "linear-gradient(135deg, #006AD7, #21277B)",
            borderRadius: "8px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 2px 12px rgba(0, 106, 215, 0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,106,215,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,106,215,0.4)"; }}>
            Tra cứu
          </a>
        </nav>
      </div>
    </header>
  );
}
