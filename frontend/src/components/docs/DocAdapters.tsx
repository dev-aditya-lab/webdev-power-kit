"use client";

import { ParamTable, BrowserSupport as BrowserSupportBase } from "@/components/DocComponents";

// ── ApiTable adapter (legacy prop shape → ParamTable) ─────────────
export function ApiTable({
  rows,
}: {
  rows: { param: string; type: string; required?: boolean; description: string; default?: string }[];
}) {
  return (
    <ParamTable
      rows={rows.map((r) => ({
        name: r.param,
        type: r.type,
        required: r.required,
        description: r.description,
        defaultValue: r.default,
      }))}
    />
  );
}

// ── BrowserSupport adapter ────────────────────────────────────────
export function BrowserSupport({
  items,
}: {
  items: { browser: string; icon: string; supported: boolean | "partial" }[];
}) {
  return (
    <BrowserSupportBase
      items={items.map((i) => ({
        name: i.browser,
        status: i.supported === true ? "yes" : i.supported === false ? "no" : "partial",
      }))}
    />
  );
}
