import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SEVCO",
  description: "SEVCO privacy policy. How we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly, such as when you fill out a contact form, subscribe to our newsletter, or engage our services. This may include your name, email address, phone number, company name, and project details.",
      "We automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. We use cookies and similar technologies to facilitate this collection.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to provide, maintain, and improve our services; to communicate with you about projects, services, and promotions; to respond to your inquiries and support requests; and to analyze usage patterns to improve our website and user experience.",
      "We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
    ],
  },
  {
    title: "3. Cookies & Tracking Technologies",
    content: [
      "Our website uses cookies to remember your preferences (such as theme selection), analyze site traffic, and understand how visitors interact with our content. You can control cookie settings through your browser preferences.",
      "We may use third-party analytics services such as Google Analytics to help us understand website usage. These services may collect information about your use of our website and other websites.",
    ],
  },
  {
    title: "4. Third-Party Services",
    content: [
      "We may use third-party services for hosting (Vercel), analytics (Google Analytics), payment processing (Stripe), email delivery, and content distribution. These providers have their own privacy policies governing how they handle your data.",
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "We implement reasonable administrative, technical, and physical safeguards to protect your personal information. All data transmitted through our website is encrypted using SSL/TLS protocols.",
      "While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of your data.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.",
      "You may request deletion of your personal data at any time by contacting us at the address below.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "You have the right to access, correct, update, or request deletion of your personal information. You may also opt out of receiving marketing communications from us at any time.",
      "If you are a resident of the European Economic Area (EEA) or California, you may have additional rights under GDPR or CCPA respectively. Contact us to exercise these rights.",
    ],
  },
  {
    title: "8. Children's Privacy",
    content: [
      "Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we learn that we have collected information from a child under 13, we will take steps to delete it promptly.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page with a revised \"Last Updated\" date.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or our data practices, please contact us at:",
      "Email: hello@sevco.us",
      "SEVCO · Phoenix, AZ / Kalispell, MT",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-lg">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-white/60 leading-relaxed">
            At SEVCO (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or engage our services.
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
