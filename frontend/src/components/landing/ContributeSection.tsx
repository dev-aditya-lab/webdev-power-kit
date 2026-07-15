"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitFork, Bug, Lightbulb, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: Bug,
    title: "Report a Bug",
    desc: "Found something broken? Open an issue and help us squash it.",
    link: "https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?template=bug_report.md",
    label: "Open Bug Report →",
  },
  {
    icon: Lightbulb,
    title: "Request a Feature",
    desc: "Have an idea for a new API wrapper or utility? We'd love to hear it.",
    link: "https://github.com/dev-aditya-lab/webdev-power-kit/issues/new?template=feature_request.md",
    label: "Request Feature →",
  },
  {
    icon: BookOpen,
    title: "Improve Docs",
    desc: "Spotted a typo or unclear explanation? PRs for documentation are always welcome.",
    link: "https://github.com/dev-aditya-lab/webdev-power-kit/issues/new/choose",
    label: "Open Issue →",
  },
];

export function ContributeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const children = Array.from(cards.children);
    // Set initial state
    gsap.set(children, { opacity: 0, y: 48 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.7,
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
    <section ref={sectionRef} className="contribute-section">
      <div className="contribute-inner">
        <div className="contribute-heading">
          <p className="section-eyebrow" style={{ justifyContent: "center" }}>
            <GitFork size={14} />
            Open Source
          </p>
          <h2 className="contribute-h2">
            Help make it better.<br />
            <span className="hs-accent">Your contribution matters.</span>
          </h2>
          <p className="contribute-sub">
            webdev-power-kit is MIT licensed and community-driven.
            Every bug report, feature request, or PR makes the toolkit stronger.
          </p>
        </div>

        <div ref={cardsRef} className="contribute-cards">
          {CARDS.map((card) => (
            <a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-card"
            >
              <div className="contribute-card-icon">
                <card.icon size={24} />
              </div>
              <h3 className="contribute-card-title">{card.title}</h3>
              <p className="contribute-card-desc">{card.desc}</p>
              <span className="contribute-card-link">{card.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
