export interface ParamRow {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  defaultValue?: string;
}

export interface CodeExample {
  lang: string;
  label: string;
  code: string;
}

export interface DocSection {
  id: string;
  label: string;
  slug: string;
  icon: string; // lucide icon name
  category: string;
  badges?: string[];
  intro: string;
  functions: FnDoc[];
  browserSupport?: BrowserItem[];
}

export interface FnDoc {
  name: string;
  signature: string;
  description: string;
  params?: ParamRow[];
  returns?: string;
  examples: CodeExample[];
  callout?: { type: "info" | "warn" | "tip" | "note"; title?: string; body: string };
}

export interface BrowserItem {
  name: string;
  status: "yes" | "no" | "partial";
}

// ── Navigation structure ─────────────────────────

export interface NavGroup {
  label: string;
  iconName: string; // lucide icon name for the group
  items: NavItem[];
}

export interface NavItem {
  id: string;
  label: string;
  iconName: string;
  slug: string;
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Getting Started",
    iconName: "Rocket",
    items: [
      { id: "introduction", label: "Introduction", iconName: "BookOpen", slug: "introduction" },
      { id: "installation", label: "Installation", iconName: "Package", slug: "installation" },
      { id: "quick-start", label: "Quick Start", iconName: "Zap", slug: "quick-start" },
      { id: "typescript", label: "TypeScript", iconName: "Code2", slug: "typescript" },
    ],
  },
  {
    label: "Browser APIs",
    iconName: "Globe",
    items: [
      { id: "clipboard", label: "Clipboard", iconName: "Clipboard", slug: "clipboard" },
      { id: "battery", label: "Battery", iconName: "Battery", slug: "battery" },
      { id: "notifications", label: "Notifications", iconName: "Bell", slug: "notifications" },
      { id: "dark-mode", label: "Dark Mode", iconName: "Moon", slug: "dark-mode" },
      { id: "geolocation", label: "Geolocation", iconName: "MapPin", slug: "geolocation" },
      { id: "network", label: "Network", iconName: "Wifi", slug: "network" },
      { id: "screen-info", label: "Screen Info", iconName: "Monitor", slug: "screen-info" },
      { id: "storage", label: "Storage", iconName: "Database", slug: "storage" },
      { id: "tab-visibility", label: "Tab Visibility", iconName: "Eye", slug: "tab-visibility" },
      { id: "idle-timer", label: "Idle Timer", iconName: "Timer", slug: "idle-timer" },
      { id: "vibration", label: "Vibration", iconName: "Vibrate", slug: "vibration" },
      { id: "prevent-close", label: "Prevent Close", iconName: "ShieldAlert", slug: "prevent-close" },
    ],
  },
  {
    label: "Utilities",
    iconName: "Wrench",
    items: [
      { id: "otp", label: "OTP Generator", iconName: "KeyRound", slug: "otp" },
    ],
  },
  {
    label: "Performance",
    iconName: "Gauge",
    items: [
      { id: "debounce", label: "Debounce", iconName: "Hourglass", slug: "debounce" },
      { id: "throttle", label: "Throttle", iconName: "SlidersHorizontal", slug: "throttle" },
    ],
  },
  {
    label: "Project",
    iconName: "FolderOpen",
    items: [
      { id: "changelog", label: "Changelog", iconName: "ScrollText", slug: "changelog" },
      { id: "contributing", label: "Contributing", iconName: "GitPullRequest", slug: "contributing" },
      { id: "faq", label: "FAQ", iconName: "MessageCircleQuestion", slug: "faq" },
    ],
  },
];

// ── All flat items for prev/next navigation ──────

export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);
