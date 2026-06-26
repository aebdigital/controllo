"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail, MapPin, PhoneCall } from "lucide-react";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Prosím, vyplňte meno, e-mail a správu.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Správu sa nepodarilo odoslať.");
      }

      setIsSent(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Nastala neznáma chyba. Skúste to znova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-50 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-brand">
            Kontaktný formulár
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Máte otázku? Napíšte nám
          </h1>
          <p className="mt-4 text-slate-600 font-medium leading-relaxed">
            Ak si nie ste niečím istí alebo potrebujete poradiť pred objednaním
            kontroly, ozvite sa nám. Odpovieme čo najskôr.
          </p>
          <div className="mt-8 space-y-4">
            <a
              href="mailto:info@controllo.sk"
              className="flex items-center gap-3 font-bold text-slate-800 hover:text-brand transition"
            >
              <div className="flex size-8 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                <Mail size={16} />
              </div>
              <span className="text-sm font-extrabold">info@controllo.sk</span>
            </a>
            <div className="flex items-center gap-3 font-bold text-slate-800">
              <div className="flex size-8 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                <MapPin size={16} />
              </div>
              <span className="text-sm font-extrabold text-slate-900">
                Kontroly po celom Slovensku
              </span>
            </div>
            <div className="flex items-center gap-3 font-bold text-slate-800">
              <div className="flex size-8 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                <PhoneCall size={16} />
              </div>
              <span className="text-sm font-extrabold text-slate-900">
                Odpoveď do 24-48 hodín
              </span>
            </div>
          </div>
        </div>

        {isSent ? (
          <div className="flex flex-col items-center justify-center border border-slate-100 bg-white p-8 rounded-2xl shadow-xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-brand">
              <Check size={28} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-5">
              Správa odoslaná!
            </h2>
            <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
              Ďakujeme za vašu správu. Ozveme sa vám čo najskôr na uvedený
              e-mail.
            </p>
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider px-6 hover:bg-slate-800 transition cursor-pointer rounded-lg"
            >
              Napísať ďalšiu správu
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 border border-slate-100 bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
          >
            {errorMessage && (
              <div className="bg-red-50 text-red-800 text-xs font-bold p-3 rounded-lg border border-red-100 mb-2">
                {errorMessage}
              </div>
            )}
            <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
              Meno a priezvisko *
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                placeholder="Tvoje meno"
                type="text"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                E-mailová adresa *
                <input
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                  placeholder="info@email.sk"
                  type="email"
                />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                Telefónne číslo
                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                  placeholder="+421 XXX XXX XXX"
                  type="tel"
                />
              </label>
            </div>
            <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
              Vaša správa *
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="focus-ring min-h-36 resize-none border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold normal-case focus:border-brand"
                placeholder="Vaša otázka alebo správa..."
              />
            </label>
            <button
              disabled={isSubmitting}
              className="focus-ring mt-2 inline-flex min-h-12 items-center justify-center gap-2 border border-[#189653] bg-[#189653] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#127744] hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? "Odosielanie..." : "Odoslať správu"}
              <ArrowRight aria-hidden="true" size={15} strokeWidth={2.7} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
