"use client";

import { type ReactNode, useRef } from "react";
import { motion } from "framer-motion";

interface MarqueeScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function MarqueeScroll({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeScrollProps) {
  const duration = speed;

  return (
    <div
      className={`marquee-outer ${className}`}
      style={{
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%",
      }}
    >
      {/* Left fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "10%",
          background: "linear-gradient(to right, var(--bg), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "10%",
          background: "linear-gradient(to left, var(--bg), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {/* Duplicate for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
