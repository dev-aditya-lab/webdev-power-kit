"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface BorderBeamProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  borderWidth?: number;
  size?: number;
}

export function BorderBeam({
  children,
  className = "",
  style = {},
  colorFrom = "#3B9EFF",
  colorTo = "#a855f7",
  duration = 3,
  borderWidth = 1.5,
  size = 150,
}: BorderBeamProps) {
  return (
    <div
      className={`border-beam-wrap ${className}`}
      style={{
        position: "relative",
        borderRadius: "inherit",
        ...style,
      }}
    >
      {/* Beam animation */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: borderWidth,
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 120deg, transparent 180deg)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          zIndex: 1,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      {/* Children sit on top */}
      <div style={{ position: "relative", zIndex: 2, borderRadius: "inherit" }}>
        {children}
      </div>
    </div>
  );
}
