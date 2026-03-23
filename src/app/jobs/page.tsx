import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers — SEVCO",
  description: "Join the SEVCO team. We're looking for talented people who want to inspire.",
};

const openings = [
  {
    title: "Frontend Developer",
    type: "Full-time · Remote",
    description:
      "Build premium web experiences for SEVCO and our clients. You'll work with Next.js, React, TypeScript, and Tailwind CSS to create fast, beautiful, and accessible interfaces.",
    requirements: [
      "3+ years of experience with React and modern JavaScript/TypeScript",
      "Strong eye for design and attention to detail",
      "Experience with Next.js and server-side rendering",
      "Familiarity with Tailwind CSS or similar utility-first frameworks",
    ],
  },
  {
    title: "Creative Director",
    type: "Full-time · Phoenix, AZ or Remote",
    description:
      "Lead the creative vision across SEVCO's projects and brand. You'll oversee design, branding, and visual identity for both internal initiatives and client work.",
    requirements: [
      "5+ years in creative direction, branding, or design leadership",
      "Strong portfolio demonstrating brand strategy and visual storytelling",
      "Experience managing creative teams and client relationships",
      "Passion for music, culture, and digital innovation",
    ],
  },
  {
    title: "Music A&R",
    type: "Part-time · Remote",
    description:
      "Scout, evaluate, and develop talent for SEVCO Records. You'll identify emerging artists, oversee releases, and help shape the label's roster and sound.",
    requirements: [
      "Deep knowledge of current music landscape across genres",
      "Experience in A&R, artist management, or music curation",
      "Strong network within the independent music community",
      "Excellent ear and ability to identify commercial potential",
    ],
  },
];

export default function JobsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Careers</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Build something
            <br />
            that matters.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            We&apos;re a small team with big ambitions. If you&apos;re passionate about great work
            and want to help inspire people through technology and music, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Why SEVCO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "◈",
                title: "Remote-First",
                desc: "Work from anywhere. We care about output, not office hours. Async communication, flexible schedules.",
              },
              {
                icon: "◉",
                title: "Creative Freedom",
                desc: "No corporate bureaucracy. You'll have real ownership over your work and the freedom to push boundaries.",
              },
              {
                icon: "◎",
                title: "Mission-Driven",
                desc: "Everything we do is in service of one word: Inspire. If that resonates, you'll fit right in.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <span className="text-2xl mb-4 block text-white/60">{value.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Open Positions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Current Openings</h2>

          <div className="space-y-6">
            {openings.map((job) => (
              <div
                key={job.title}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <p className="text-white/40 text-sm mt-1">{job.type}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="shrink-0 text-sm bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors text-center"
                  >
                    Apply Now
                  </Link>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{job.description}</p>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                    Requirements
                  </p>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="text-white/50 text-sm flex gap-3">
                        <span className="text-white/20 shrink-0">—</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t see your role?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
              We&apos;re always interested in meeting talented people. Send us your info and
              we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
