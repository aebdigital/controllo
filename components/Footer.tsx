"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import logo from "../logo.png";

export default function Footer() {
  const triggerCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return (
    <footer className="border-t border-slate-100 bg-white py-12 mt-auto">
      <div className="container-shell flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <div className="space-y-4">
          <Image src={logo} alt="CONTROLLO Logo" className="h-9 w-auto" />
          <p className="max-w-xs text-sm text-slate-500 font-semibold leading-relaxed">
            Profesionálna kontrola vozidiel pred kúpou kdekoľvek na Slovensku.
          </p>
          <div className="text-[11px] text-slate-400 font-semibold leading-tight space-y-0.5">
            <p className="font-extrabold text-slate-500">Controllo s. r. o.</p>
            <p>Družstevná 504/6, 072 22 Strážske</p>
            <p>IČO: 57523959 | DIČ: 2122807192</p>
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:gap-16">
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Užitočné odkazy</h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li>
                <Link href="/kontrola-vozidla" className="hover:text-brand transition">
                  Detail 150-bodovej kontroly
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-brand transition">
                  Kontaktný formulár
                </Link>
              </li>
              <li>
                <Link href="/ochrana-osobnych-udajov" className="hover:text-brand transition">
                  Ochrana osobných údajov (GDPR)
                </Link>
              </li>
              <li>
                <a href="#" onClick={triggerCookieSettings} className="hover:text-brand transition cursor-pointer">
                  Nastavenie cookies
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Kontakt</h4>
            <div className="grid gap-2 text-sm font-bold text-slate-600">
              <a className="flex items-center gap-2 hover:text-brand transition" href="mailto:info@controllo.sk">
                <Mail aria-hidden="true" size={16} />
                info@controllo.sk
              </a>
              <a className="flex items-center gap-2 hover:text-brand transition" href="tel:+421XXXXXXXXX">
                <Phone aria-hidden="true" size={16} />
                +421 XXX XXX XXX
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-shell border-t border-slate-100 mt-10 pt-6 text-center text-xs text-slate-400 font-bold">
        <p>© {new Date().getFullYear()} CONTROLLO. Všetky práva vyhradené.</p>
      </div>
    </footer>
  );
}
