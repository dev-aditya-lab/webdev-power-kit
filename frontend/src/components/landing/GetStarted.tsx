"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Terminal, Code2, Zap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ShinyButton } from "@/components/ui/ShinyButton";

const STEPS = [
  {
    num: "01",
    icon: Terminal,
    title: "Install the package",
    desc: "Add webdev-power-kit to your project with npm, yarn, or pnpm.",
    code: "npm install webdev-power-kit",
    color: "#3B9EFF",
  },
  {
    num: "02",
    icon: Code2,
    title: "Import what you need",
    desc: "Import only the utilities you need — everything is tree-shakeable.",
    code: `import { copyToClipboard, getBatteryLevel } from 'webdev-power-kit';`,
    color: "#a855f7",
  },
  {
    num: "03",
    icon: Zap,
    title: "Use in your app",
    desc: "Call the functions directly. They handle compatibility and errors for you.",
    code: `await copyToClipboard('Hello!');\nconst level = await getBatteryLevel();`,
    color: "#22c55e",
  },
];

interface GetStartedProps {
  onNavigate: (id: string) => void;
}

export function GetStarted({ onNavigate }: GetStartedProps) {
  return (
    <section className="get-started-section">
      <div className="get-started-inner">
        <Reveal>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            <Sparkles size={14} />
            Getting Started
          </div>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Up and running in
            <br />
            <span className="text-gradient">under 60 seconds.</span>
          </h2>
          <p className="section-sub" style={{ textAlign: "center", maxWidth: "40ch", margin: "0 auto" }}>
            Three simple steps. No config files, no CLI tools, no build plugins.
          </p>
        </Reveal>

        <div className="steps-list">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15}>
              <div className="step-row">
                {/* Number pill */}
                <motion.div
                  className="step-num-pill"
                  style={{ borderColor: `${step.color}40`, color: step.color }}
                  whileHover={{ scale: 1.08, borderColor: step.color }}
                >
                  {step.num}
                </motion.div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="step-connector" style={{ background: `linear-gradient(to bottom, ${step.color}60, transparent)` }} />
                )}

                {/* Content */}
                <div className="step-content-box">
                  <div className="step-icon-label" style={{ color: step.color }}>
                    <step.icon size={16} />
                    <span>{step.title}</span>
                  </div>
                  <p className="step-desc">{step.desc}</p>
                  {/* Inline code snippet */}
                  <motion.div
                    className="step-code-snippet"
                    whileHover={{ borderColor: `${step.color}50` }}
                  >
                    <span className="step-code-prompt" style={{ color: step.color }}>$</span>
                    <code>{step.code}</code>
                  </motion.div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <ShinyButton onClick={() => onNavigate("introduction")} variant="brand">
              Read Full Documentation <ArrowRight size={16} />
            </ShinyButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
