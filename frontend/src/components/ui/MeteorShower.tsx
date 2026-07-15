"use client";

import { useEffect, useState } from "react";

interface Meteor {
  id: number;
  top: string;
  left: string;
  animDuration: string;
  animDelay: string;
  size: number;
}

interface MeteorShowerProps {
  count?: number;
}

export function MeteorShower({ count = 20 }: MeteorShowerProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const generated: Meteor[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animDuration: `${3 + Math.random() * 4}s`,
      animDelay: `${Math.random() * 5}s`,
      size: 1 + Math.random() * 1.5,
    }));
    setMeteors(generated);
  }, [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: `${m.size * 100}px`,
            height: `${m.size}px`,
            borderRadius: "9999px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.9), transparent)",
            boxShadow: `0 0 ${m.size * 6}px rgba(255,255,255,0.3)`,
            transform: "rotate(-45deg)",
            animation: `meteor ${m.animDuration} linear ${m.animDelay} infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
