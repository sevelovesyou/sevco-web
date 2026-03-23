import Link from "next/link";

const tracks = [
  { title: "Hanna Montana", spotify: "https://open.spotify.com/track/68YiCcW3bfw7B2IySNxKwi", apple: "https://music.apple.com/us/album/hanna-montana/1857303286?i=1857303287" },
  { title: "Swoon", spotify: "https://open.spotify.com/track/1RLu7Fo7tOWbAVXNBG0YI4", apple: "https://music.apple.com/us/album/swoon/1869362297?i=1869362300" },
  { title: "Selfless", spotify: "https://open.spotify.com/track/0jVIrnzMZx0sx2mSQ6DXHW", apple: "https://music.apple.com/us/album/selfless/1868897675?i=1868897677" },
  { title: "The Truth", spotify: "https://open.spotify.com/track/7lB6hytmT01oo0UoZR8TWn", apple: "https://music.apple.com/us/album/the-truth-studio-version/1615288596?i=1615288597" },
  { title: "Forgive Me", spotify: "https://open.spotify.com/track/0YxB2e7V5vZEkYboyvMaan", apple: "https://music.apple.com/us/album/forgive-me/1524191973?i=1524191974" },
  { title: "The Crown", spotify: "https://open.spotify.com/track/6JWnFf44K70A38z8yMUGQK", apple: "https://music.apple.com/us/album/the-crown/1701345448?i=1701345449" },
];

const services = [
  { icon: "◈", title: "Web Design", desc: "High-impact web experiences built for conversion and brand." },
  { icon: "◉", title: "Digital Strategy", desc: "Architecture and strategy to maximize your digital reach." },
  { icon: "◎", title: "Branding", desc: "Identity systems that tell the truth about who you are." },
  { icon: "♫", title: "Artist Services", desc: "Label services, publishing, distribution — 90/5/5." },
];

const work = [
  { label: "Custom E-Commerce Solution", title: "SEVCO E-commerce Platform", url: "https://sevco.shop" },
  { label: "Website & Infrastructure", title: "Aardvark Brand & Website", url: "https://aardvark.host" },
  { label: "App Design & Launch", title: "TidBit App", url: "https://tidbit.aardvark.host" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Est. 2009 — Inspire</p>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight text-white leading-none mb-8">
            SEVCO
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
            Digital agency & music services firm. We build great products and help artists thrive.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Our Services
            </Link>
            <Link
              href="/work"
              className="border border-white/20 text-white px-8 py-3 rounded-full text-sm hover:border-white/50 transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Built to inspire.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors group">
                <span className="text-3xl mb-4 block text-white/60 group-hover:text-white transition-colors">{s.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/services"
              className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4"
            >
              View plans & pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">SEVCO Records</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Music by Seve.</h2>
            </div>
            <Link href="/music" className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4 shrink-0">
              Full discography →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((t) => (
              <div key={t.title} className="group flex items-center justify-between border border-white/10 rounded-xl px-5 py-4 hover:border-white/20 hover:bg-white/3 transition-all">
                <span className="text-white font-medium">{t.title}</span>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={t.spotify} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors">Spotify</a>
                  <a href={t.apple} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors">Apple</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Recent Work.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {work.map((w) => (
              <a
                key={w.title}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all hover:bg-white/3"
              >
                <p className="text-xs text-white/30 uppercase tracking-widest mb-3">{w.label}</p>
                <h3 className="text-white font-semibold text-lg group-hover:text-white transition-colors">{w.title}</h3>
                <span className="text-white/30 text-sm mt-4 block group-hover:text-white/60 transition-colors">View →</span>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/work" className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4">
              See all work →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to build something?</h2>
              <p className="text-white/50 text-lg">Let&apos;s talk about your project.</p>
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
