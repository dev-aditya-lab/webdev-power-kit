"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ApiShowcase } from "@/components/landing/ApiShowcase";
import { CodeDemo } from "@/components/landing/CodeDemo";
import { GetStarted } from "@/components/landing/GetStarted";
import { Author } from "@/components/landing/Author";
import { HorizontalScroll } from "@/components/landing/HorizontalScroll";
import { SvgPathSection } from "@/components/landing/SvgPathSection";
import { ContributeSection } from "@/components/landing/ContributeSection";
import { Footer } from "@/components/layout/Footer";

// ── Lenis smooth scroll (dynamic import to keep bundle lean) ──────
function LenisInit() {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let gsapInstance: typeof import("gsap").default | null = null;
    let ScrollTriggerInstance: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      gsapInstance = gsap;
      ScrollTriggerInstance = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      // Synchronize ScrollTrigger with Lenis
      lenis.on("scroll", ScrollTrigger.update);

      // Hook Lenis into GSAP ticker
      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger to ensure all positions are calculated correctly
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    });

    return () => {
      lenis?.destroy();
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
    };
  }, []);
  return null;
}

// ── Navigate to docs helper (passed to landing sections) ──────────
function navigateToDocs(slug: string) {
  window.location.href = `/docs/${slug}`;
}

export default function Home() {
  return (
    <>
      <LenisInit />

      {/* Floating landing navbar */}
      <Navbar />

      <main>
        <Hero onNavigate={navigateToDocs} />
        <SvgPathSection />
        <HorizontalScroll onNavigate={navigateToDocs} />
        <ApiShowcase onNavigate={navigateToDocs} />
        <CodeDemo onNavigate={navigateToDocs} />
        <GetStarted onNavigate={navigateToDocs} />
        <ContributeSection />
        <Author />
        <Footer />
      </main>
    </>
  );
}
