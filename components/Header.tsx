"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "../logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 border-b border-slate-100 bg-white transition-colors ${mobileMenuOpen ? "z-[90]" : "z-40"}`}>
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center">
          <Image
            src={logo}
            alt="CONTROLLO Logo"
            priority
            className="h-9 w-auto sm:h-11 hover:opacity-90 transition"
          />
        </Link>
        
        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex">
          <Link className="hover:text-brand transition" href="/#ako">
            Ako to prebieha
          </Link>
          <Link className="hover:text-brand transition" href="/kontrola-vozidla">
            Služba detail
          </Link>
          <Link className="hover:text-brand transition" href="/#mapa">
            Pokrytie
          </Link>
          <Link className="hover:text-brand transition" href="/#recenzie">
            Recenzie
          </Link>
          <Link className="hover:text-brand transition" href="/#faq">
            Časté otázky
          </Link>
          <Link className="hover:text-brand transition" href="/kontakt">
            Kontakt
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#objednavka"
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-brand bg-brand px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] cursor-pointer"
          >
            Objednať kontrolu
            <ArrowRight aria-hidden="true" size={16} strokeWidth={2.7} />
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 md:hidden hover:border-brand transition cursor-pointer"
          aria-label="Otvoriť menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative h-[100dvh] w-72 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between border-l border-slate-100 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <Image src={logo} alt="CONTROLLO" className="h-8 w-auto" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-700 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <nav className="mt-8 flex flex-col gap-5 text-base font-bold text-slate-800">
                  <Link
                    className="hover:text-brand transition"
                    href="/#ako"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ako to prebieha
                  </Link>
                  <Link
                    className="hover:text-brand transition"
                    href="/kontrola-vozidla"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Služba detail
                  </Link>
                  <Link
                    className="hover:text-brand transition"
                    href="/#mapa"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pokrytie
                  </Link>
                  <Link
                    className="hover:text-brand transition"
                    href="/#recenzie"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Recenzie
                  </Link>
                  <Link
                    className="hover:text-brand transition"
                    href="/#faq"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Časté otázky
                  </Link>
                  <Link
                    className="hover:text-brand transition"
                    href="/kontakt"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kontakt
                  </Link>
                </nav>
              </div>
              <div className="border-t border-slate-100 pt-6">
                <Link
                  href="/#objednavka"
                  onClick={() => setMobileMenuOpen(false)}
                  className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 border border-brand bg-brand px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] cursor-pointer"
                >
                  Objednať teraz
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2.7} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
