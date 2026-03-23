import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SEVCO",
  description: "SEVCO terms of service for digital agency and music services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using SEVCO's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "2. Services",
    content: [
      "SEVCO provides digital agency services including web design, digital architecture, branding, creative consulting, and music/artist services. Specific service terms, deliverables, timelines, and fees will be outlined in individual project agreements or statements of work.",
      "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.",
    ],
  },
  {
    title: "3. Client Obligations",
    content: [
      "Clients agree to provide accurate and complete information necessary for the delivery of services. Clients are responsible for timely review and approval of deliverables, and for providing feedback within agreed-upon timelines.",
      "Delays caused by late client feedback or incomplete information may result in adjusted timelines and additional fees as outlined in the project agreement.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "Upon full payment, clients receive ownership of final deliverables as specified in the project agreement. SEVCO retains the right to showcase completed work in our portfolio unless otherwise agreed in writing.",
      "SEVCO retains ownership of all proprietary tools, frameworks, processes, and pre-existing intellectual property used in the delivery of services. Third-party assets (fonts, stock imagery, libraries) are subject to their respective licenses.",
    ],
  },
  {
    title: "5. Music & Artist Services",
    content: [
      "SEVCO Records provides label services, publishing, and distribution under terms specified in individual artist agreements. Our standard deal structure is 90/5/5 (90% artist, 5% SEVCO, 5% distribution), subject to negotiation.",
      "Artists retain full ownership of their master recordings and publishing rights unless otherwise specified in a signed agreement. SEVCO acts as a service provider, not a rights holder.",
    ],
  },
  {
    title: "6. Payment Terms",
    content: [
      "Payment terms are specified in individual project agreements. Unless otherwise stated, a deposit of 50% is required before work begins, with the remaining balance due upon completion.",
      "Late payments may incur a fee of 1.5% per month on the outstanding balance. SEVCO reserves the right to pause work on projects with overdue payments.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "SEVCO's total liability for any claim arising from our services shall not exceed the total fees paid by the client for the specific service giving rise to the claim.",
      "SEVCO shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, regardless of the cause of action.",
    ],
  },
  {
    title: "8. Termination",
    content: [
      "Either party may terminate a service agreement with 30 days' written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date.",
      "SEVCO may terminate services immediately if the client breaches these terms, fails to make timely payments, or engages in conduct that is harmful to SEVCO's reputation or operations.",
    ],
  },
  {
    title: "9. Confidentiality",
    content: [
      "Both parties agree to keep confidential any proprietary information shared during the course of the engagement. This obligation survives termination of the service agreement for a period of two (2) years.",
    ],
  },
  {
    title: "10. Dispute Resolution",
    content: [
      "Any disputes arising from these terms or our services shall first be addressed through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in the state of Arizona.",
      "These Terms of Service are governed by the laws of the State of Arizona, without regard to conflict of law principles.",
    ],
  },
  {
    title: "11. Contact",
    content: [
      "For questions about these Terms of Service, contact us at:",
      "Email: hello@sevco.us",
      "SEVCO · Phoenix, AZ / Kalispell, MT",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/50 text-lg">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-white/60 leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your use of SEVCO&apos;s website and
            services. By engaging SEVCO for any services, you agree to be bound by these Terms in
            addition to any project-specific agreements.
          </p>

          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((paragraph, idx) => (
                  <p key={idx} className="text-white/60 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
