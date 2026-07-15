"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SvgPathSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const paths = [path1Ref.current, path2Ref.current, path3Ref.current].filter(Boolean) as SVGPathElement[];

    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.5 + i * 0.3,
          },
        });
      });

      // Stagger labels in
      gsap.from(labelRefs.current.filter(Boolean), {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const labels = ["Your App", "webdev-power-kit", "Browser APIs"];
  const labelPositions = ["8%", "46%", "84%"];

  return (
    <section ref={sectionRef} className="svg-path-section">
      <div className="svg-path-inner">
        {/* Section heading */}
        <div className="svg-path-heading">
          <p className="section-eyebrow" style={{ justifyContent: "center" }}>
            <span className="hs-eyebrow-dot" />
            How It Works
          </p>
          <h2 className="svg-path-h2">
            Connect once.<br />
            <span className="hs-accent">Access everything.</span>
          </h2>
          <p className="svg-path-sub">
            One install connects your app to 15+ browser APIs — wrapped, typed, and production-ready.
          </p>
        </div>

        {/* SVG diagram */}
        <div className="svg-path-diagram">
          {/* Node labels */}
          {labels.map((label, i) => (
            <div
              key={label}
              ref={(el) => { labelRefs.current[i] = el; }}
              className="svg-node-label"
              style={{ left: labelPositions[i] }}
            >
              <div className="svg-node-circle">{i === 1 ? "⚡" : i === 0 ? "{}" : "🌐"}</div>
              <span>{label}</span>
            </div>
          ))}

          {/* Animated SVG paths */}
          <svg
            className="svg-path-canvas"
            viewBox="0 0 1200 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Path 1: App → Kit (top) */}
            <path
              ref={path1Ref}
              d="M 130 80 C 300 20, 450 20, 600 80"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Path 2: Kit → APIs (top) */}
            <path
              ref={path2Ref}
              d="M 600 80 C 750 20, 900 20, 1070 80"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Path 3: decorative lower arc */}
            <path
              ref={path3Ref}
              d="M 130 90 C 400 150, 800 150, 1070 90"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />

            {/* Node circles */}
            <circle cx="130" cy="80" r="8" fill="white" opacity="0.9" />
            <circle cx="600" cy="80" r="12" fill="white" opacity="1" />
            <circle cx="1070" cy="80" r="8" fill="white" opacity="0.9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
