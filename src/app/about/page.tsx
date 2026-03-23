import Link from "next/link";

const milestones = [
  {
    year: "2009",
    title: "SEVCO Founded",
    desc: "Severin Gislason starts SEVCO in Kalispell, Montana. A vision to build something that inspires — no clearer definition than that, just the drive.",
  },
  {
    year: "2015",
    title: "Digital Agency Launches",
    desc: "SEVCO formalizes as a digital agency — web design, branding, and digital strategy for clients who care about quality. The mission sharpens.",
  },
  {
    year: "2020",
    title: "SEVCO Records + First Music",
    desc: "The label arm of SEVCO launches. Seve releases his first tracks — 'Forgive Me' marks the beginning of a catalog built on raw honesty.",
  },
  {
    year: "2022",
    title: "TheHuman.tv & New Ventures",
    desc: "SEVCO expands into platform development with TheHuman.tv — a space for authentic human narratives. The scope of 'Inspire' grows.",
  },
  {
    year: "2023",
    title: "Huckleberry",
    desc: "A community-focused tech project takes root in Kalispell. Connecting locals with what they need. Technology built with people in mind.",
  },
  {
    year: "2024",
    title: "SEVCO E-commerce & Platform Growth",
    desc: "Custom e-commerce builds, the Aardvark brand and platform, TidBit app. SEVCO's digital agency work expands across product, brand, and distribution.",
  },
  {
    year: "2025–",
    title: "Building the Next Chapter",
    desc: "New music from Seve. New client work. New platforms. The mission stays the same: build great things that inspire people.",
  },
];

const ventures = [
  {
    name: "SEVCO Digital Agency",
    desc: "Web design, digital strategy, and branding for businesses and creators who want to grow with intention.",
    link: "/services",
    linkLabel: "See services",
  },
  {
    name: "SEVCO Records",
    desc: "An independent label with a 90/5/5 deal structure. Built for artists who want to own their careers.",
    link: "/music",
    linkLabel: "Explore music",
  },
  {
    name: "TheHuman.tv",
    desc: "A platform exploring human narratives and authentic storytelling in the digital age.",
    link: "https://thehuman.tv",
    linkLabel: "Visit site",
    external: true,
  },
  {
    name: "Huckleberry",
    desc: "Community-focused tech rooted in Kalispell, MT. Connecting people to local resources and each other.",
    link: "#",
    linkLabel: "Coming soon",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/2 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Est. 2009</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
            About SEVCO
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            A digital agency and music services firm built around one word: Inspire.
          </p>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">The Story</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Built to Inspire.</h2>
            <div className="space-y-5 text-white/60 leading-relaxed text-lg">
              <p>
                SEVCO started in 2009 with a simple conviction — that the right combination of design, technology, and authentic storytelling can genuinely move people.
              </p>
              <p>
                Seve (Severin Gislason) founded SEVCO out of Helena, Montana, drawing on years of creativity and an obsession with how things look, feel, and work. Not just aesthetics — but meaning.
              </p>
              <p>
                Today, SEVCO operates between Phoenix, AZ and Kalispell, MT, spanning digital agency work, music services, and platform development. Different verticals, same mission.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Founded</p>
              <p className="text-white text-2xl font-bold">2009</p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Founder</p>
              <p className="text-white text-2xl font-bold">Severin Gislason</p>
              <p className="text-white/50 text-sm mt-1">Artist. Entrepreneur. Builder.</p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Based</p>
              <p className="text-white text-2xl font-bold">Phoenix, AZ & Kalispell, MT</p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Mission</p>
              <p className="text-white text-2xl font-bold">Inspire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VENTURES */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">What We Build</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">The SEVCO Universe.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ventures.map((v) => (
              <div key={v.name} className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors group">
                <h3 className="text-white font-bold text-xl mb-3">{v.name}</h3>
                <p className="text-white/50 leading-relaxed mb-6">{v.desc}</p>
                {v.external ? (
                  <a
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
                  >
                    {v.linkLabel} →
                  </a>
                ) : (
                  <Link
                    href={v.link}
                    className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
                  >
                    {v.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">History</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Milestones.</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 py-8 ${
                  i < milestones.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <span className="text-white/30 font-mono text-sm">{m.year}</span>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{m.title}</h3>
                  <p className="text-white/50 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Work with us.</h2>
              <p className="text-white/50 text-lg">We&apos;re always building. If you&apos;re inspired by what we do, let&apos;s talk.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
