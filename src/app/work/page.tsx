import Link from "next/link";

const featured = [
  {
    label: "Custom E-Commerce Solution",
    title: "SEVCO E-commerce Platform",
    desc: "A fully custom e-commerce experience built on Next.js. Designed to convert — clean product pages, fast checkout, and SEVCO's brand aesthetic throughout.",
    tags: ["Next.js", "E-Commerce", "UI/UX"],
    url: "https://sevco.shop",
    year: "2024",
  },
  {
    label: "Website & Infrastructure",
    title: "Aardvark Brand & Website",
    desc: "Full brand identity and website for Aardvark. From logo and color system to a fully responsive marketing site with custom hosting infrastructure.",
    tags: ["Branding", "Web Design", "Infrastructure"],
    url: "https://aardvark.host",
    year: "2024",
  },
  {
    label: "App Design & Launch",
    title: "TidBit App",
    desc: "A micro-content platform built for quick consumption. Designed for mobile-first, launched under the Aardvark ecosystem with seamless auth and CMS.",
    tags: ["App Design", "Mobile", "Product"],
    url: "https://tidbit.aardvark.host",
    year: "2024",
  },
];

const caseStudies = [
  {
    label: "Platform Design",
    title: "TheHuman.tv",
    desc: "A digital platform exploring human narratives and authentic storytelling. Custom architecture and editorial design built for depth and engagement.",
    tags: ["Platform", "Editorial", "Web Design"],
    url: "https://thehuman.tv",
    year: "2023",
  },
  {
    label: "Community Tech",
    title: "Huckleberry",
    desc: "A community-focused tech project rooted in Kalispell, MT. Built to connect locals with local resources — clean, fast, and accessible.",
    tags: ["Community", "Web App", "Local"],
    url: "#",
    year: "2023",
  },
  {
    label: "Digital Strategy",
    title: "Artist Campaign — Seve",
    desc: "Full digital strategy and rollout for Seve's music releases. Streaming optimization, social campaigns, and audience growth across all platforms.",
    tags: ["Music", "Strategy", "Growth"],
    url: "/music",
    year: "2022–present",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Portfolio</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
            Our Work
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            Products we&apos;ve built. Brands we&apos;ve shaped. Campaigns that moved numbers. This is what we do when we say we make great things.
          </p>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Featured</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((w) => (
              <a
                key={w.title}
                href={w.url}
                target={w.url.startsWith("http") ? "_blank" : undefined}
                rel={w.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all hover:bg-white/3"
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs text-white/30 uppercase tracking-widest">{w.label}</p>
                  <span className="text-xs text-white/20">{w.year}</span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-white transition-colors">{w.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{w.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {w.tags.map((t) => (
                    <span key={t} className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
                <span className="text-white/30 text-sm group-hover:text-white/60 transition-colors">View project →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">More Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">Case Studies</h2>
          <div className="space-y-4">
            {caseStudies.map((w, i) => (
              <a
                key={w.title}
                href={w.url}
                target={w.url.startsWith("http") ? "_blank" : undefined}
                rel={w.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col md:flex-row md:items-center gap-6 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/3 transition-all"
              >
                <span className="text-white/20 text-sm font-mono w-8 shrink-0">0{i + 1}</span>
                <div className="flex-1">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{w.label}</p>
                  <h3 className="text-white font-semibold text-lg group-hover:text-white transition-colors">{w.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed md:max-w-sm">{w.desc}</p>
                <div className="flex flex-wrap gap-2 md:max-w-xs">
                  {w.tags.map((t) => (
                    <span key={t} className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-white/20">{w.year}</span>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Your project, next.</h2>
              <p className="text-white/50 text-lg">We&apos;re selective about what we take on. If it&apos;s good, we want in.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
