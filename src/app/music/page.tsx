import Link from "next/link";

const tracks = [
  { title: "Hanna Montana", spotify: "https://open.spotify.com/track/68YiCcW3bfw7B2IySNxKwi", apple: "https://music.apple.com/us/album/hanna-montana/1857303286?i=1857303287", year: "2025" },
  { title: "Swoon", spotify: "https://open.spotify.com/track/1RLu7Fo7tOWbAVXNBG0YI4", apple: "https://music.apple.com/us/album/swoon/1869362297?i=1869362300", year: "2025" },
  { title: "Selfless", spotify: "https://open.spotify.com/track/0jVIrnzMZx0sx2mSQ6DXHW", apple: "https://music.apple.com/us/album/selfless/1868897675?i=1868897677", year: "2025" },
  { title: "The Truth", spotify: "https://open.spotify.com/track/7lB6hytmT01oo0UoZR8TWn", apple: "https://music.apple.com/us/album/the-truth-studio-version/1615288596?i=1615288597", year: "2022" },
  { title: "Forgive Me", spotify: "https://open.spotify.com/track/0YxB2e7V5vZEkYboyvMaan", apple: "https://music.apple.com/us/album/forgive-me/1524191973?i=1524191974", year: "2020" },
  { title: "The Crown", spotify: "https://open.spotify.com/track/6JWnFf44K70A38z8yMUGQK", apple: "https://music.apple.com/us/album/the-crown/1701345448?i=1701345449", year: "2023" },
];

const dealPoints = [
  {
    pct: "90%",
    label: "To The Artist",
    desc: "You keep the majority of your revenue. Always. That's the deal.",
    color: "#00A611",
  },
  {
    pct: "5%",
    label: "Publishing",
    desc: "Goes to publishing administration — protecting and registering your works.",
    color: "#FCC318",
  },
  {
    pct: "5%",
    label: "SEVCO Records",
    desc: "Our cut for distribution, marketing, A&R, and label services.",
    color: "#0037FF",
  },
];

export default function MusicPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-white/3 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">SEVCO Records</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
            Music
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            An independent label built for independent artists. Real deals, real distribution, real support — rooted in the belief that music should be free to be honest.
          </p>
        </div>
      </section>

      {/* ARTIST — SEVE */}
      <section id="artists" className="py-24 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Featured Artist</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Seve</h2>
              <p className="text-white/60 leading-relaxed text-lg mb-6">
                Severin Gislason — known as Seve — is a singer-songwriter and producer from Kalispell, Montana. His music lives in the intersection of vulnerability and modern production: introspective lyrics over electronic-influenced soundscapes.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Since his first release in 2020, Seve has built a catalog that chronicles personal growth, loss, and resilience. Tracks like &quot;The Truth,&quot; &quot;Forgive Me,&quot; and &quot;Hanna Montana&quot; have connected with listeners who want music that means something.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://open.spotify.com/artist/0saYQmfsru7Khs6hyGzVG8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border border-white/20 text-white px-6 py-2.5 rounded-full hover:border-white/50 transition-colors"
                >
                  Spotify ↗
                </a>
                <a
                  href="https://music.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border border-white/20 text-white px-6 py-2.5 rounded-full hover:border-white/50 transition-colors"
                >
                  Apple Music ↗
                </a>
                <a
                  href="https://soundcloud.com/sevelovesu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border border-white/20 text-white px-6 py-2.5 rounded-full hover:border-white/50 transition-colors"
                >
                  SoundCloud ↗
                </a>
              </div>
            </div>

            {/* Tracks */}
            <div className="space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Discography</p>
              {tracks.map((t) => (
                <div
                  key={t.title}
                  className="group flex items-center justify-between border border-white/10 rounded-xl px-5 py-4 hover:border-white/20 hover:bg-white/3 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{t.title}</span>
                    <span className="text-white/30 text-xs">{t.year}</span>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={t.spotify} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors">Spotify</a>
                    <a href={t.apple} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white transition-colors">Apple</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIGN WITH SEVCO */}
      <section id="sign" className="py-24 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">The Deal</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Sign with SEVCO.</h2>
          <p className="text-white/50 text-lg mb-16 max-w-2xl">
            We built the deal we wished existed. No label games, no ownership grabs — just a fair structure that puts artists first.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {dealPoints.map((d) => (
              <div key={d.label} className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                <p className="text-5xl font-bold mb-3" style={{ color: d.color }}>{d.pct}</p>
                <h3 className="text-white font-semibold text-lg mb-3">{d.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-4">What we offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Full distribution to all major platforms",
                "A&R support and creative direction",
                "Publishing administration and registration",
                "Marketing strategy and rollout support",
                "Sync licensing opportunities",
                "Access to SEVCO's production network",
                "Social & digital growth strategy",
                "You keep all masters. Always.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUBMIT MUSIC */}
      <section id="submit" className="py-24 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Submit Music</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Send us your music.</h2>
            <p className="text-white/50 text-lg mb-8">
              We listen to everything. If your music connects with what we&apos;re building, we&apos;ll reach out. No templates, no gatekeeping.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Send a link to your music (SoundCloud, Spotify, YouTube, or a downloadable) along with a short note about who you are and what you&apos;re working on.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Submit via contact form →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
