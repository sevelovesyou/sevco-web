import Link from "next/link";
import Image from "next/image";

const socials = [
  { label: "Instagram", href: "https://instagram.com/sevelovesyou" },
  { label: "TikTok", href: "https://www.tiktok.com/@sevelovesu" },
  { label: "YouTube", href: "https://www.youtube.com/@sevelovesyou" },
  { label: "Twitter", href: "https://x.com/sevelovesu" },
  { label: "Spotify", href: "https://open.spotify.com/artist/0saYQmfsru7Khs6hyGzVG8" },
  { label: "SoundCloud", href: "https://soundcloud.com/sevelovesu" },
  { label: "GitHub", href: "https://github.com/sevelovesyou" },
];

const cols = [
  {
    heading: "Services",
    links: [
      { label: "Web Design", href: "/services#web" },
      { label: "Branding", href: "/services#branding" },
      { label: "Digital Strategy", href: "/services#strategy" },
      { label: "Artist Services", href: "/services#music" },
      { label: "Plans & Pricing", href: "/services#pricing" },
    ],
  },
  {
    heading: "Music",
    links: [
      { label: "SEVCO Records", href: "/music" },
      { label: "Artists", href: "/music#artists" },
      { label: "Submit Music", href: "/music#submit" },
      { label: "Sign with SEVCO", href: "/music#sign" },
      { label: "Beats", href: "https://www.beatstars.com/sevelovesu" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: "Jobs", href: "/jobs" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo-white.svg"
              alt="SEVCO"
              width={140}
              height={36}
              className="h-9 w-auto mb-4"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Driving progress through great products. Digital agency & music services firm.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2026 SEVCO. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/30 text-sm hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/30 text-sm hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
