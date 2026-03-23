"use client";

import { useState } from "react";

const socials = [
  { label: "Instagram", href: "https://instagram.com/sevelovesyou" },
  { label: "TikTok", href: "https://www.tiktok.com/@sevelovesu" },
  { label: "YouTube", href: "https://www.youtube.com/@sevelovesyou" },
  { label: "Twitter / X", href: "https://x.com/sevelovesu" },
  { label: "Spotify", href: "https://open.spotify.com/artist/0saYQmfsru7Khs6hyGzVG8" },
  { label: "GitHub", href: "https://github.com/sevelovesyou" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[40vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6">Say Hello</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-8">
            Contact
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
            Whether you&apos;ve got a project in mind, music to submit, or just want to connect — we&apos;re listening.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-8">Get In Touch</p>
            <div className="space-y-8 mb-12">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Email</p>
                <a
                  href="mailto:hello@sevco.us"
                  className="text-white text-xl font-semibold hover:text-white/80 transition-colors"
                >
                  hello@sevco.us
                </a>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Based</p>
                <p className="text-white/70">Phoenix, AZ & Kalispell, MT</p>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Follow</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 border border-white/10 rounded-full px-4 py-2 hover:border-white/30 hover:text-white transition-all"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Response time</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We aim to respond within 24 hours on weekdays. For urgent matters, email directly at{" "}
                <a href="mailto:hello@sevco.us" className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
                  hello@sevco.us
                </a>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="text-4xl mb-6">✓</div>
                <h2 className="text-2xl font-bold text-white mb-3">Message sent.</h2>
                <p className="text-white/50 leading-relaxed">
                  Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm appearance-none"
                  >
                    <option value="" className="bg-black">Select a subject</option>
                    <option value="General" className="bg-black">General</option>
                    <option value="Project Inquiry" className="bg-black">Project Inquiry</option>
                    <option value="Music Submission" className="bg-black">Music Submission</option>
                    <option value="Partnership" className="bg-black">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
