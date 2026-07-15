"use client";

import { useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import gsap from "gsap";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: 0, scale: 1 },
        {
          rotate: 360,
          scale: 0.8,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            toggle();
            gsap.to(iconRef.current, { rotate: 0, scale: 1, duration: 0.2 });
          },
        }
      );
    } else {
      toggle();
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle-btn"
    >
      <span ref={iconRef} className="theme-toggle-icon">
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
}
