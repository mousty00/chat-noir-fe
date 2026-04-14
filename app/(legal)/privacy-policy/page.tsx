import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Chat Noir collects, uses, and protects your personal data in compliance with GDPR and applicable privacy laws.",
};

const LAST_UPDATED = "14 April 2025";
const CONTACT_EMAIL = "privacy@chatnoir.fun";
const SITE_URL = "https://chatnoir.fun";

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

export default function PrivacyPolicyPage() {
  return (
    <article>
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Pill>Legal</Pill>
          <Pill>GDPR</Pill>
        </div>
        <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-white leading-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-[13px] text-zinc-500">
          Last updated: <span className="text-zinc-400">{LAST_UPDATED}</span>
        </p>
      </div>

      <Section title="Overview">
        <p>
          Chat Noir (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates the website{" "}
          <span className="text-zinc-300">{SITE_URL}</span> (the &ldquo;Service&rdquo;). This
          Privacy Policy explains how we collect, use, disclose, and safeguard your personal
          information when you use our Service.
        </p>
        <p>
          We are committed to protecting your privacy and processing your personal data in
          accordance with the General Data Protection Regulation (GDPR), and other applicable
          privacy laws. Please read this policy carefully. If you do not agree with its terms,
          please do not access the Service.
        </p>
      </Section>

      <Section title="Data Controller">
        <p>
          The data controller responsible for your personal data is Chat Noir. For any
          privacy-related questions or to exercise your rights, contact us at:
        </p>
        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-secondary/80 hover:text-secondary transition-colors underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Section>

      <Section title="Information We Collect">
        <p>We collect the following categories of personal data:</p>
        <ul className="list-none space-y-2.5 mt-2">
          {[
            {
              label: "Account data",
              detail:
                "Username and email address provided during registration. If you use Google Sign-In, we receive your Google profile email.",
            },
            {
              label: "Authentication tokens",
              detail:
                "A JSON Web Token (JWT) is stored locally in your browser's localStorage to keep you authenticated across sessions.",
            },
            {
              label: "User-generated content",
              detail:
                "Cat submissions, favorites, and any content you add to the archive.",
            },
            {
              label: "Preference data",
              detail: "Your UI theme preference (dark/light) stored locally in your browser.",
            },
            {
              label: "Technical data",
              detail:
                "Standard server logs including IP address, browser type, and pages visited. These are processed for security and operational purposes.",
            },
          ].map(({ label, detail }) => (
            <li
              key={label}
              className="flex gap-2.5 rounded-xl bg-white/2 border border-white/5 p-3"
            >
              <span className="mt-0.5 text-secondary shrink-0">▸</span>
              <span>
                <span className="text-zinc-300 font-medium">{label}: </span>
                {detail}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          We do <span className="text-white font-medium">not</span> collect payment information,
          precise geolocation, or biometric data.
        </p>
      </Section>

      <Section title="How We Use Your Data">
        <p>We process your personal data for the following purposes and legal bases:</p>
        <div className="mt-2 rounded-xl border border-white/6 overflow-hidden">
          {[
            {
              purpose: "Account creation & authentication",
              basis: "Contract performance",
              detail: "To provide you with the Service you signed up for.",
            },
            {
              purpose: "Email verification",
              basis: "Contract performance",
              detail: "To verify your identity and secure your account.",
            },
            {
              purpose: "Service improvement",
              basis: "Legitimate interests",
              detail: "To understand usage patterns and improve the platform.",
            },
            {
              purpose: "Security & fraud prevention",
              basis: "Legitimate interests",
              detail: "To detect and prevent abuse or unauthorized access.",
            },
            {
              purpose: "Legal compliance",
              basis: "Legal obligation",
              detail: "To comply with applicable laws and regulations.",
            },
          ].map(({ purpose, basis, detail }, i, arr) => (
            <div
              key={purpose}
              className={[
                "flex flex-col sm:flex-row sm:items-start gap-2 p-3.5",
                i < arr.length - 1 ? "border-b border-white/5" : "",
              ].join(" ")}
            >
              <div className="flex-1">
                <p className="text-zinc-300 font-medium text-[12.5px]">{purpose}</p>
                <p className="text-zinc-500 text-[12px] mt-0.5">{detail}</p>
              </div>
              <span className="shrink-0 self-start sm:mt-0.5 text-[11px] font-medium text-secondary/70 bg-secondary/8 border border-secondary/15 rounded-md px-2 py-0.5">
                {basis}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Data Sharing & Third Parties">
        <p>
          We do <span className="text-white font-medium">not sell</span> your personal data. We
          share it only in the following limited circumstances:
        </p>
        <ul className="space-y-2 mt-2">
          {[
            {
              party: "Google LLC",
              reason:
                "If you choose to sign in with Google, your authentication is handled by Google's OAuth 2.0 service. Google's privacy policy governs their data processing.",
            },
            {
              party: "Infrastructure providers",
              reason:
                "Our hosting and cloud infrastructure providers process data on our behalf under data processing agreements (DPAs) that ensure GDPR compliance.",
            },
            {
              party: "Legal authorities",
              reason:
                "We may disclose data when required by law, court order, or to protect the rights and safety of Chat Noir or its users.",
            },
          ].map(({ party, reason }) => (
            <li key={party} className="rounded-xl bg-white/2 border border-white/5 p-3 text-[13px]">
              <span className="text-zinc-300 font-medium">{party}:</span>{" "}
              <span className="text-zinc-500">{reason}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Data Retention">
        <p>
          We retain your personal data only as long as necessary for the purposes described in
          this policy:
        </p>
        <ul className="list-disc list-inside space-y-1.5 mt-1 pl-1 text-zinc-400">
          <li>
            <span className="text-zinc-300">Account data</span> — retained while your account is
            active. Deleted within 30 days of account deletion request.
          </li>
          <li>
            <span className="text-zinc-300">Authentication tokens</span> — stored locally in your
            browser; automatically invalidated on logout.
          </li>
          <li>
            <span className="text-zinc-300">Server logs</span> — retained for up to 90 days for
            security purposes.
          </li>
        </ul>
      </Section>

      <Section title="Your GDPR Rights">
        <p>
          If you are in the European Economic Area (EEA), UK, or Switzerland, you have the
          following rights regarding your personal data:
        </p>
        <div className="grid gap-2 mt-3 sm:grid-cols-2">
          {[
            { right: "Right of access", detail: "Request a copy of your personal data." },
            {
              right: "Right to rectification",
              detail: "Correct inaccurate or incomplete data.",
            },
            {
              right: "Right to erasure",
              detail: "Request deletion of your data ('right to be forgotten').",
            },
            {
              right: "Right to restriction",
              detail: "Request we limit processing of your data.",
            },
            {
              right: "Right to portability",
              detail: "Receive your data in a machine-readable format.",
            },
            {
              right: "Right to object",
              detail: "Object to processing based on legitimate interests.",
            },
            {
              right: "Right to withdraw consent",
              detail: "Withdraw consent at any time where processing is consent-based.",
            },
            {
              right: "Right to lodge a complaint",
              detail: "File a complaint with your local data protection authority.",
            },
          ].map(({ right, detail }) => (
            <div
              key={right}
              className="rounded-xl bg-white/2 border border-white/5 p-3 space-y-0.5"
            >
              <p className="text-zinc-300 font-medium text-[12.5px]">{right}</p>
              <p className="text-zinc-500 text-[12px]">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-3">
          To exercise any of these rights, contact us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-secondary/80 hover:text-secondary transition-colors underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          . We will respond within 30 days.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          data against unauthorized access, alteration, disclosure, or destruction. These include:
        </p>
        <ul className="list-disc list-inside space-y-1.5 mt-1 pl-1 text-zinc-400">
          <li>HTTPS encryption for all data in transit</li>
          <li>JWT-based authentication with short-lived tokens</li>
          <li>Access controls restricting data to authorized personnel</li>
          <li>Regular security reviews</li>
        </ul>
        <p className="mt-2">
          No method of transmission over the internet is 100% secure. We cannot guarantee
          absolute security, but we take your data protection seriously.
        </p>
      </Section>

      <Section title="International Transfers">
        <p>
          Your data may be transferred to and processed in countries outside your own. Where we
          transfer data outside the EEA, we ensure adequate protections are in place, such as
          Standard Contractual Clauses (SCCs) approved by the European Commission.
        </p>
      </Section>

      <Section title="Children's Privacy">
        <p>
          The Service is not directed to individuals under the age of 13 (or 16 in certain
          jurisdictions). We do not knowingly collect personal data from children. If you believe
          a child has provided us with personal data, please contact us and we will delete it
          promptly.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant
          changes by updating the &ldquo;Last updated&rdquo; date at the top of this page. Your
          continued use of the Service after changes are posted constitutes acceptance of the
          updated policy.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>
          If you have any questions, concerns, or requests related to this Privacy Policy, please
          reach out:
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
          <p className="text-zinc-500 mt-0.5">Website: {SITE_URL}</p>
        </div>
      </Section>
    </article>
  );
}
