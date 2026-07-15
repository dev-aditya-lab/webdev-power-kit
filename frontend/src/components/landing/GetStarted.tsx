"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Terminal, Code2, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    icon: Terminal,
    title: "Install the package",
    desc: "Add webdev-power-kit to your project with npm, yarn, or pnpm.",
    code: "npm install webdev-power-kit",
  },
  {
    num: "02",
    icon: Code2,
    title: "Import what you need",
    desc: "Import only the utilities you need — everything is tree-shakeable.",
    code: `import { copyToClipboard, getBatteryLevel } from 'webdev-power-kit';`,
  },
  {
    num: "03",
    icon: Zap,
    title: "Use in your app",
    desc: "Call the functions directly. They handle compatibility and errors for you.",
    code: `await copyToClipboard('Hello!');\nconst level = await getBatteryLevel();`,
  },
];

interface GetStartedProps {
  onNavigate: (id: string) => void;
}

export function GetStarted({ onNavigate }: GetStartedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<SVGLineElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = timelineLineRef.current;
    const stepsEl = stepsRef.current;
    if (!section || !line || !stepsEl) return;

    const len = line.getTotalLength?.() ?? 300;
    // Set initial states
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    const children = Array.from(stepsEl.children);
    gsap.set(children, { opacity: 0, x: -32 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Draw line
            gsap.to(line, {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.out",
            });
            // Stagger cards
            gsap.to(children, {
              opacity: 1,
              x: 0,
              stagger: 0.15,
              duration: 0.65,
              ease: "power3.out",
            });
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="get-started-bw">
      <div className="get-started-bw-inner">
        {/* Heading */}
        <div className="gs-heading">
          <p className="section-eyebrow" style={{ justifyContent: "center" }}>
            <span className="hs-eyebrow-dot" />
            Getting Started
          </p>
          <h2 className="gs-h2">
            Up and running in<br />
            <span className="hs-accent">under 60 seconds.</span>
          </h2>
          <p className="gs-sub">
            Three simple steps. No config files, no CLI tools, no build plugins.
          </p>
        </div>

        {/* Timeline container */}
        <div className="gs-timeline-wrap">
          {/* Vertical SVG line */}
          <svg className="gs-timeline-line-svg" aria-hidden="true">
            <line
              ref={timelineLineRef}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.2"
            />
          </svg>

          {/* Steps */}
          <div ref={stepsRef} className="gs-steps">
            {STEPS.map((step, i) => (
              <div key={step.num} className="gs-step-row">
                {/* Number node */}
                <div className="gs-step-node">
                  <span className="gs-step-num">{step.num}</span>
                </div>

                {/* Content */}
                <div className="gs-step-card">
                  <div className="gs-step-icon-row">
                    <step.icon size={16} />
                    <span className="gs-step-title">{step.title}</span>
                  </div>
                  <p className="gs-step-desc">{step.desc}</p>
                  <div className="gs-step-code">
                    <span className="gs-step-prompt">$</span>
                    <code>{step.code}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <button
            className="btn-bw-primary"
            onClick={() => onNavigate("introduction")}
          >
            Read Full Documentation <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
