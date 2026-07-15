"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface ShinyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "brand" | "outline" | "ghost";
}

export function ShinyButton({
  children,
  onClick,
  href,
  className = "",
  style = {},
  variant = "brand",
}: ShinyButtonProps) {
  const base: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.7rem 1.6rem",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    fontFamily: "var(--font-body)",
    letterSpacing: "-0.01em",
    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
    ...style,
  };

  const brandStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #3B9EFF 0%, #6366f1 100%)",
    color: "#fff",
    boxShadow: "0 0 30px rgba(59,158,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
  };

  const outlineStyle: React.CSSProperties = {
    background: "transparent",
    color: "var(--text-1)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 0 0 0 transparent",
  };

  const combinedStyle = {
    ...base,
    ...(variant === "brand" ? brandStyle : outlineStyle),
  };

  const shineEl = (
    <motion.span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "200% 0",
        pointerEvents: "none",
        borderRadius: "inherit",
      }}
      whileHover={{
        backgroundPosition: "-200% 0",
        transition: { duration: 0.6, ease: "easeInOut" },
      }}
    />
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        style={combinedStyle}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {shineEl}
        <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {children}
        </span>
      </motion.a>
    );
  }

  return (
    <motion.button
      className={className}
      style={combinedStyle}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {shineEl}
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {children}
      </span>
    </motion.button>
  );
}
