import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200">
      {/* Subtle ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/4 rounded-full blur-[180px] pointer-events-none" />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-[15px] font-semibold tracking-[-0.03em] text-white">
              Chat
              <span className="font-display italic text-secondary">Noir</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Back to app
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-16 relative z-10">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-3xl px-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-zinc-600">
          <Link href="/privacy-policy" className="hover:text-zinc-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="hover:text-zinc-400 transition-colors">
            Cookie Policy
          </Link>
          <span>© {new Date().getFullYear()} Chat Noir. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
