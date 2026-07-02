"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function FloatingCta() {
  const pathname = usePathname();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    setFormInView(false);
    const form = document.getElementById("objednavka");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  if (formInView) return null;

  return (
    <Link
      href="/#objednavka"
      className="focus-ring fixed bottom-5 right-5 z-40 md:hidden inline-flex min-h-12 items-center justify-center gap-2 border border-brand bg-brand px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-brand/30 rounded-full active:scale-[0.97] transition"
    >
      Objednať kontrolu
      <ArrowRight aria-hidden="true" size={15} strokeWidth={2.7} />
    </Link>
  );
}
