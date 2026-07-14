"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, lang = "typescript", showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dotColors = ["#ff5f56", "#ffbd2e", "#27c93f"];

  return (
    <div className="codeblock-wrap">
      <div className="codeblock-header">
        <div className="codeblock-dots">
          {dotColors.map((c) => (
            <div key={c} className="codeblock-dot" style={{ background: c }} />
          ))}
        </div>
        <span className="codeblock-lang">{lang}</span>
        <button className={`codeblock-copy${copied ? " done" : ""}`} onClick={handleCopy}>
          {copied ? (
            <><Check size={11} /> Copied</>
          ) : (
            <><Copy size={11} /> Copy</>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang === "tsx" || lang === "jsx" ? "tsx" : lang === "bash" || lang === "sh" ? "bash" : lang}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          background: "transparent",
          fontSize: "0.83rem",
          lineHeight: "1.7",
        }}
        codeTagProps={{ style: { fontFamily: "JetBrains Mono, Fira Code, monospace" } }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
