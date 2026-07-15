"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Package, X as XSocialIcon, Link2, Mail } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchGitHubProfile, type GitHubProfile } from "@/lib/github";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Author() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  // Fetch GitHub profile
  useEffect(() => {
    fetchGitHubProfile().then(setProfile);
  }, []);

  // GSAP reveal
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    // Set initial state
    gsap.set(card, { opacity: 0, y: 48 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.8,
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

  const avatarSrc = profile?.avatar_url ?? "/webdev logo 1x1.png";

  const socialLinks = [
    { href: "https://devaditya.dev", icon: Globe, label: "devaditya.dev" },
    { href: "https://github.com/dev-aditya-lab", icon: GithubIcon, label: "GitHub" },
    { href: "https://www.npmjs.com/package/webdev-power-kit", icon: Package, label: "npm" },
    { href: "https://x.com/dev_aditya_lab", icon: XSocialIcon, label: "X / Twitter" },
    { href: "https://linkedin.com/in/dev-aditya-lab", icon: Link2, label: "LinkedIn" },
    { href: "mailto:contact@devaditya.dev", icon: Mail, label: "Email" },
  ];

  return (
    <section ref={sectionRef} className="author-section-bw">
      <div className="author-inner">
        {/* Heading */}
        <div className="author-heading">
          <p className="section-eyebrow" style={{ justifyContent: "center" }}>
            <span className="hs-eyebrow-dot" />
            Meet the Creator
          </p>
          <h2 className="author-h2">
            Built with passion by<br />
            <span className="hs-accent">Aditya Kumar Gupta</span>
          </h2>
        </div>

        {/* Card */}
        <div ref={cardRef} className="author-card-bw">
          {/* Avatar */}
          <div className="author-avatar-bw">
            <Image
              src={avatarSrc}
              alt="Aditya Kumar Gupta"
              width={96}
              height={96}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              unoptimized={avatarSrc.startsWith("https://")}
            />
            <div className="author-online-dot" />
          </div>

          {/* Info */}
          <div className="author-info-bw">
            <h3 className="author-name-bw">Aditya Kumar Gupta</h3>
            <p className="author-handle-bw">
              <code>@dev-aditya-lab</code>
            </p>

            {/* GitHub stats row */}
            {profile && (
              <div className="author-gh-stats">
                <span className="author-gh-stat">
                  <strong>{profile.followers}</strong> followers
                </span>
                <span className="author-gh-sep">·</span>
                <span className="author-gh-stat">
                  <strong>{profile.public_repos}</strong> public repos
                </span>
              </div>
            )}

            <p className="author-bio-bw">
              {profile?.bio ??
                "Computer Science Engineer & passionate Web Developer. Creator of webdev-power-kit and other open-source tools."}
            </p>

            {/* Social links */}
            <div className="author-links-bw">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="author-link-bw"
                  aria-label={link.label}
                >
                  <link.icon size={15} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
