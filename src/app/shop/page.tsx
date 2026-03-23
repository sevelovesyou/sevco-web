const products = [
  // SEVCO Planet line
  {
    line: "SEVCO Planet",
    name: "Planet Cap",
    desc: "Structured 6-panel, embroidered wordmark. Black on black.",
    category: "Headwear",
    status: "coming-soon",
  },
  {
    line: "SEVCO Planet",
    name: "Planet Tee",
    desc: "Heavy cotton, oversized fit. Minimal front print, back wordmark.",
    category: "Tops",
    status: "coming-soon",
  },
  {
    line: "SEVCO Planet",
    name: "Planet Hoodie",
    desc: "Garment-dyed fleece. Dropped shoulders, embroidered logo.",
    category: "Outerwear",
    status: "coming-soon",
  },
  {
    line: "SEVCO Planet",
    name: "Planet Crewneck",
    desc: "Midweight fleece crew. Clean and versatile.",
    category: "Tops",
    status: "coming-soon",
  },
  // SEVCO Records line
  {
    line: "SEVCO Records",
    name: "Records Cap",
    desc: "Dad hat silhouette, washed finish. SEVCO Records arc embroidery.",
    category: "Headwear",
    status: "coming-soon",
  },
  {
    line: "SEVCO Records",
    name: "Records Tee",
    desc: "Band-style tee. Features artist imagery and record label branding.",
    category: "Tops",
    status: "coming-soon",
  },
  {
    line: "SEVCO Records",
    name: "Records Hoodie",
    desc: "Pullover fleece. SEVCO Records logo front, tracklist-inspired back print.",
    category: "Outerwear",
    status: "coming-soon",
  },
  {
    line: "SEVCO Records",
    name: "Records Sweatshirt",
    desc: "Classic crewneck sweat. Minimal logo, washed-out colorway.",
    category: "Tops",
    status: "coming-soon",
  },
];

const lines = ["SEVCO Planet", "SEVCO Records"];

export default function ShopPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">SEVCO Store</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
            Shop
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            Two lines. One mission. Gear for people who build, create, and push forward. Dropping soon.
          </p>
        </div>
      </section>

      {/* LINES INTRO */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Line 01</p>
            <h2 className="text-2xl font-bold text-white mb-3">SEVCO Planet</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Clean, minimal, premium. The daily uniform for people who care about what they put on. Black-forward palette, quality construction, timeless silhouettes.
            </p>
          </div>
          <div className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Line 02</p>
            <h2 className="text-2xl font-bold text-white mb-3">SEVCO Records</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Music-inspired. Artist-first. Merch that actually means something — connected to the label, the artists, and the culture they&apos;re building.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS BY LINE */}
      {lines.map((line) => (
        <section key={line} className="py-16 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3">{line}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products
                .filter((p) => p.line === line)
                .map((product) => (
                  <div
                    key={product.name}
                    className="border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
                  >
                    {/* Product image placeholder */}
                    <div className="aspect-square bg-white/3 flex items-center justify-center border-b border-white/5">
                      <span className="text-white/15 text-5xl font-bold">S</span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-white/30 uppercase tracking-widest mb-2">{product.category}</p>
                      <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                      <p className="text-white/50 text-xs leading-relaxed mb-4">{product.desc}</p>
                      <span className="inline-block text-xs text-white/40 border border-white/10 rounded-full px-3 py-1.5">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* NOTIFY CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Be the first to know.</h2>
              <p className="text-white/50 text-lg">Drop notifications. Early access. The real stuff.</p>
            </div>
            <a
              href="https://instagram.com/sevelovesyou"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Follow @sevelovesyou
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
