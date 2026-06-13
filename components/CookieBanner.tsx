"use client";

import { useEffect, useState } from "react";
import { Check, Settings, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CookieConsent {
  essential: boolean;
  analytical: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "controllo-cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    analytical: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        setConsent(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored cookie consent", e);
      }
    }
  }, []);

  useEffect(() => {
    // Listen for global event to open cookie settings from footer
    const handleOpenSettings = () => {
      setIsModalOpen(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const saveConsent = (updatedConsent: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConsent));
    setConsent(updatedConsent);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytical: true, marketing: true };
    saveConsent(all);
  };

  const handleRejectAll = () => {
    const minimal = { essential: true, analytical: false, marketing: false };
    saveConsent(minimal);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-4xl border border-slate-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md md:rounded-2xl"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-heading text-lg font-extrabold text-slate-900">
                  Nastavenia súborov cookies 🍪
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Naša stránka používa cookies na zabezpečenie funkčnosti, analýzu návštevnosti a personalizáciu reklám. Kliknutím na „Prijať všetko“ súhlasíte s ich používaním. Svoje nastavenia môžete kedykoľvek zmeniť.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:border-brand hover:text-brand cursor-pointer"
                >
                  <Settings size={14} />
                  Nastavenia
                </button>
                <button
                  onClick={handleRejectAll}
                  className="border border-transparent bg-slate-100 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-200 cursor-pointer"
                >
                  Len nevyhnutné
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-brand-hover shadow-md shadow-brand/10 cursor-pointer"
                >
                  Prijať všetko
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookies Settings Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg overflow-hidden border border-slate-100 bg-white p-6 shadow-2xl md:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  Nastavenie cookies
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {/* Essential Cookies */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex items-center justify-center">
                    <div className="flex size-5 items-center justify-center bg-brand text-white border border-brand">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-sm font-bold text-slate-950">
                        Nevyhnutné cookies (Vždy aktívne)
                      </h4>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      Tieto cookies sú nevyhnutné pre správne fungovanie a bezpečnosť našej webstránky. Nie je možné ich deaktivovať.
                    </p>
                  </div>
                </div>

                {/* Analytical Cookies */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() =>
                      setConsent((prev) => ({ ...prev, analytical: !prev.analytical }))
                    }
                    className="mt-1 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`flex size-5 items-center justify-center border transition ${
                        consent.analytical ? "bg-brand text-white border-brand" : "border-slate-300 bg-white"
                      }`}
                    >
                      {consent.analytical && <Check size={14} strokeWidth={3} />}
                    </div>
                  </button>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-slate-950">
                      Analytické cookies
                    </h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Pomáhajú nám analyzovať návštevnosť a pochopiť, ako návštevníci komunikujú so stránkou, aby sme ju mohli neustále zlepšovať.
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() =>
                      setConsent((prev) => ({ ...prev, marketing: !prev.marketing }))
                    }
                    className="mt-1 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`flex size-5 items-center justify-center border transition ${
                        consent.marketing ? "bg-brand text-white border-brand" : "border-slate-300 bg-white"
                      }`}
                    >
                      {consent.marketing && <Check size={14} strokeWidth={3} />}
                    </div>
                  </button>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-slate-950">
                      Marketingové cookies
                    </h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Používajú sa na sledovanie návštevníkov na rôznych webových stránkach za účelom zobrazovania relevantnej a prispôsobenej reklamy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={handleRejectAll}
                  className="border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:border-brand hover:text-brand cursor-pointer"
                >
                  Odmietnuť všetky
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-brand-hover shadow-md cursor-pointer"
                >
                  Uložiť nastavenia
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
