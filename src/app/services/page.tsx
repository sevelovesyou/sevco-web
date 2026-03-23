import Link from "next/link";

const services = [
  {
    id: "web",
    icon: "◈",
    title: "Web Design",
    tagline: "Websites that earn attention.",
    desc: "From landing pages to full-scale web platforms, we design and build high-impact digital experiences optimized for performance, conversion, and brand. Every pixel earns its place.",
    features: [
      "Custom UI/UX design",
      "Next.js & React development",
      "E-commerce solutions",
      "CMS integration",
      "Performance optimization",
      "Ongoing maintenance",
    ],
  },
  {
    id: "strategy",
    icon: "◉",
    title: "Digital Strategy",
    tagline: "Architecture built to scale.",
    desc: "We map your digital footprint, audit your current stack, and architect a strategy that maximizes reach and ROI. From SEO to paid media to email — we connect the dots.",
    features: [
      "Digital audit & competitive analysis",
      "SEO & content strategy",
      "Paid media planning",
      "Email & automation funnels",
      "Analytics & attribution",
      "Growth roadmapping",
    ],
  },
  {
    id: "branding",
    icon: "◎",
    title: "Branding",
    tagline: "Identity that tells the truth.",
    desc: "Your brand is a promise. We build identity systems — logos, typography, color, voice — that reflect who you actually are and resonate with the people you want to reach.",
    features: [
      "Logo & mark design",
      "Brand guidelines",
      "Typography & color systems",
      "Brand voice & messaging",
      "Social & marketing templates",
      "Brand refresh & evolution",
    ],
  },
  {
    id: "music",
    icon: "♫",
    title: "Artist Services",
    tagline: "Built for the independent artist.",
    desc: "SEVCO Records offers a 90/5/5 deal structure — 90% of revenue to the artist, 5% to publishing, 5% to SEVCO. Label services, distribution, publishing, and creative support for artists who want to own their career.",
    features: [
      "Label services & A&R",
      "Music distribution (all platforms)",
      "Publishing administration",
      "Creative direction & production",
      "Marketing & rollout strategy",
      "Sync licensing support",
    ],
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$499",
    period: "/mo",
    desc: "Perfect for creators, solo businesses, and early-stage startups.",
    features: [
      "1 custom landing page",
      "Brand identity basics",
      "Monthly strategy session",
      "Basic SEO setup",
      "Email support",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,499",
    period: "/mo",
    desc: "For growing businesses ready to invest in real digital infrastructure.",
    features: [
      "Full website (up to 10 pages)",
      "Complete brand system",
      "Weekly strategy sessions",
      "SEO + content strategy",
      "Email & automation setup",
      "Monthly reporting & analytics",
      "Priority support",
    ],
    cta: "Start growing",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations that need a dedicated digital partner. Fully scoped, fully custom.",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom development",
      "Full digital strategy",
      "Artist services integration",
      "SLA & priority response",
      "Quarterly business reviews",
    ],
    cta: "Contact us",
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">What We Do</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
            Services
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            We build great products and help businesses grow. From concept to launch and beyond — SEVCO is your digital partner.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-6">
          {services.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="border border-white/10 rounded-2xl p-8 md:p-12 hover:border-white/20 transition-colors group scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <span className="text-4xl mb-4 block text-white/50 group-hover:text-white transition-colors">{s.icon}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{s.title}</h2>
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-6">{s.tagline}</p>
                  <p className="text-white/60 leading-relaxed text-lg">{s.desc}</p>
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-4">What&apos;s included</p>
                  <ul className="space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Plans & Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple pricing.</h2>
          <p className="text-white/50 text-lg mb-16 max-w-xl">
            No hidden fees, no surprises. Pick the plan that fits where you are, and we&apos;ll grow from there.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`border rounded-2xl p-8 flex flex-col transition-all ${
                  p.highlight
                    ? "border-white/30 bg-white/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {p.highlight && (
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-4">Most Popular</p>
                )}
                <h3 className="text-2xl font-bold text-white mb-1">{p.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">{p.price}</span>
                  {p.period && <span className="text-white/40 mb-1">{p.period}</span>}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{p.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0 mt-1.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                    p.highlight
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/20 text-white hover:border-white/50"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-sm text-center mt-10">
            All plans include a free consultation. No contracts required.{" "}
            <Link href="/contact" className="text-white/50 hover:text-white underline underline-offset-4 transition-colors">
              Talk to us first →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Let&apos;s build something.</h2>
              <p className="text-white/50 text-lg">Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Start the conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
