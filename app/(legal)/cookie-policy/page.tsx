import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn about the cookies and local storage Chat Noir uses, what data they store, and how you can control them.",
};

const LAST_UPDATED = "14 April 2025";
const CONTACT_EMAIL = "privacy@chatnoir.fun";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[15px] font-semibold text-white tracking-[-0.02em] mb-3 pb-2 border-b border-white/6">
        {title}
      </h2>
      <div className="space-y-3 text-[13.5px] text-zinc-400 leading-[1.75]">{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary/10 border border-secondary/20 px-2 py-0.5 text-[11px] font-medium text-secondary/80">
      {children}
    </span>
  );
}

interface StorageEntry {
  key: string;
  type: string;
  category: "Essential" | "Functional" | "Analytics";
  purpose: string;
  expires: string;
}

const STORAGE_ENTRIES: StorageEntry[] = [
  {
    key: "chat-noir-auth",
    type: "localStorage",
    category: "Essential",
    purpose:
      "Stores your authentication state (JWT token, username, email) to keep you signed in across browser sessions.",
    expires: "Until logout or token expiry",
  },
  {
    key: "chat-noir-theme",
    type: "localStorage",
    category: "Functional",
    purpose: "Remembers your preferred UI theme (dark or light mode) between visits.",
    expires: "Persistent",
  },
  {
    key: "chat-noir-consent",
    type: "localStorage",
    category: "Essential",
    purpose:
      "Stores your cookie and storage consent preferences so we don't ask again on every visit.",
    expires: "Persistent",
  },
];

const CATEGORY_COLORS: Record<StorageEntry["category"], string> = {
  Essential: "text-emerald-400/80 bg-emerald-400/8 border-emerald-400/20",
  Functional: "text-blue-400/80 bg-blue-400/8 border-blue-400/20",
  Analytics: "text-orange-400/80 bg-orange-400/8 border-orange-400/20",
};

export default function CookiePolicyPage() {
  return (
    <article>
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Pill>Legal</Pill>
          <Pill>Cookies</Pill>
        </div>
        <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-white leading-tight mb-3">
          Cookie Policy
        </h1>
        <p className="text-[13px] text-zinc-500">
          Last updated: <span className="text-zinc-400">{LAST_UPDATED}</span>
        </p>
      </div>

      <Section title="What Are Cookies?">
        <p>
          Cookies are small text files placed on your device by websites you visit. They are
          widely used to make websites work efficiently, to remember your preferences, and to
          provide information to website owners.
        </p>
        <p>
          In addition to traditional cookies (set by servers and stored by your browser),
          websites also use technologies like <span className="text-zinc-300">localStorage</span>{" "}
          and <span className="text-zinc-300">sessionStorage</span> to store data locally on your
          device. Chat Noir primarily uses <strong className="text-zinc-300">localStorage</strong>{" "}
          rather than traditional browser cookies for most functionality.
        </p>
      </Section>

      <Section title="How We Use Storage">
        <p>
          Chat Noir uses localStorage to deliver core functionality and remember your preferences.
          We categorize our storage use into three types:
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {(["Essential", "Functional", "Analytics"] as StorageEntry["category"][]).map((cat) => (
            <span
              key={cat}
              className={[
                "text-[11px] font-medium rounded-md border px-2 py-1",
                CATEGORY_COLORS[cat],
              ].join(" ")}
            >
              {cat}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Storage We Use">
        <div className="rounded-xl border border-white/6 overflow-hidden">
          {STORAGE_ENTRIES.map((entry, i) => (
            <div
              key={entry.key}
              className={[
                "p-4",
                i < STORAGE_ENTRIES.length - 1 ? "border-b border-white/5" : "",
              ].join(" ")}
            >
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <code className="text-[12px] font-mono text-zinc-200 bg-white/6 rounded px-1.5 py-0.5">
                  {entry.key}
                </code>
                <span className="text-[11px] text-zinc-600 font-medium">{entry.type}</span>
                <span
                  className={[
                    "text-[11px] font-medium rounded-md border px-2 py-0.5",
                    CATEGORY_COLORS[entry.category],
                  ].join(" ")}
                >
                  {entry.category}
                </span>
              </div>
              <p className="text-[12.5px] text-zinc-500 leading-relaxed">{entry.purpose}</p>
              <p className="text-[11px] text-zinc-600 mt-1.5">
                <span className="text-zinc-500">Duration: </span>
                {entry.expires}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-secondary/5 border border-secondary/15 p-4">
          <p className="text-[12.5px] text-zinc-400">
            <span className="text-white font-medium">Analytics storage:</span> We do not
            currently use any analytics, tracking, or advertising cookies or localStorage. If we
            introduce analytics in the future, this policy will be updated and your consent will
            be requested.
          </p>
        </div>
      </Section>

      <Section title="Third-Party Cookies">
        <p>
          If you choose to sign in with Google, Google&apos;s OAuth 2.0 service may set its own
          cookies or use its own storage mechanisms on its domains. These are governed by{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary/80 hover:text-secondary transition-colors underline underline-offset-2"
          >
            Google&apos;s Privacy Policy
          </a>
          . Chat Noir has no control over these cookies.
        </p>
        <p>
          Apart from Google OAuth, we do <span className="text-white font-medium">not</span>{" "}
          use third-party tracking pixels, advertising cookies, or social media buttons that
          could set cookies.
        </p>
      </Section>

      <Section title="Your Cookie Choices">
        <p>You have several options for managing cookies and local storage:</p>

        <div className="space-y-3 mt-2">
          <div className="rounded-xl bg-white/2 border border-white/5 p-4">
            <p className="text-zinc-300 font-medium text-[13px] mb-1.5">
              Consent preferences (on Chat Noir)
            </p>
            <p className="text-zinc-500 text-[12.5px] leading-relaxed">
              When you first visit, a consent banner lets you choose which categories of storage
              you accept. You can change your preferences at any time from the{" "}
              <Link
                href="/settings"
                className="text-secondary/80 hover:text-secondary transition-colors underline underline-offset-2"
              >
                Settings
              </Link>{" "}
              page or by clearing your browser&apos;s localStorage.
            </p>
          </div>

          <div className="rounded-xl bg-white/2 border border-white/5 p-4">
            <p className="text-zinc-300 font-medium text-[13px] mb-1.5">Browser settings</p>
            <p className="text-zinc-500 text-[12.5px] leading-relaxed">
              Most browsers allow you to view, delete, and block cookies and localStorage via
              their developer tools or privacy settings. Blocking essential storage will prevent
              you from staying signed in.
            </p>
          </div>

          <div className="rounded-xl bg-white/2 border border-white/5 p-4">
            <p className="text-zinc-300 font-medium text-[13px] mb-1.5">Clearing localStorage</p>
            <p className="text-zinc-500 text-[12.5px] leading-relaxed">
              You can clear all locally stored data via your browser&apos;s developer tools
              (DevTools → Application → Local Storage → {'"'}chatnoir.fun{'"'} → Clear All).
              This will sign you out and reset all preferences.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Cookie Policy when we introduce new features or storage mechanisms.
          The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent
          revision. Significant changes will trigger a new consent request.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>
          If you have questions about our use of cookies or local storage, please contact us at:
        </p>
        <div className="mt-3 rounded-xl bg-secondary/5 border border-secondary/15 p-4 text-[13px]">
          <p className="text-zinc-300 font-medium">Chat Noir — Privacy Team</p>
          <p className="text-zinc-500 mt-1">
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-secondary/80 hover:text-secondary transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-zinc-500 mt-0.5">
            More details:{" "}
            <Link
              href="/privacy-policy"
              className="text-secondary/80 hover:text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </Section>
    </article>
  );
}
