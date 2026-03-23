"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/theme-context";
import type { Theme } from "@/lib/theme";

const links = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Music", href: "/music" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

const themes: Array<{ id: Theme; label: string; color: string }> = [
  { id: "light", label: "Light", color: "#ffffff" },
  { id: "dark", label: "Dark", color: "#0a0a0a" },
  { id: "blue", label: "Blue", color: "#0037FF" },
  { id: "red", label: "Red", color: "#BD0000" },
  { id: "yellow", label: "Yellow", color: "#FCC318" },
  { id: "green", label: "Green", color: "#00A611" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-white.svg"
            alt="SEVCO"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors tracking-wide uppercase"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 3a2 2 0 00-2 2v6h16V5a2 2 0 00-2-2H5zm16 8H3v6a2 2 0 002 2h14a2 2 0 002-2v-6z" />
              </svg>
            </button>

            {themeOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-white/10 rounded-lg shadow-lg p-3 z-40">
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        theme === t.id
                          ? "bg-white/20 border border-white/30"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: t.color }}
                      />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="text-sm bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5 px-6 py-6">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-white/80 hover:text-white uppercase tracking-wide"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-block text-sm bg-white text-black px-5 py-2 rounded-full font-semibold"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
