"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  ClipboardCheck,
  Clock,
  Gauge,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
  ChevronDown,
  Info,
  X,
} from "lucide-react";

const primary = "#189653";

const trustPoints = [
  "Detailný 150 bodový report",
  "Skúšobná jazda",
  "Diagnostika vozidla",
  "Nezávislé hodnotenie",
];

const steps = [
  {
    title: "Objednáš kontrolu",
    text: "Pošli nám odkaz na inzerát a základné kontaktné údaje.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Ozveme sa ti",
    text: "Dohodneme termín, miesto obhliadky a všetky potrebné detaily.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Preveríme auto",
    text: "Technik skontroluje vozidlo priamo u predajcu a urobí skúšobnú jazdu.",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Dostaneš report",
    text: "Pošleme jasné zhrnutie stavu a odporúčanie, či auto kúpiť.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82",
  },
];

const checks = [
  "Stav motora a prevodovky",
  "Podvozok a brzdy",
  "Karosériu a lak",
  "Interiér vozidla",
  "Diagnostiku chýb",
  "Skúšobnú jazdu",
  "Fotodokumentáciu",
  "Detailný report",
];

const packageItems = [
  "Fyzická obhliadka vozidla technikom",
  "Kontrola exteriéru, interiéru a technického stavu",
  "Načítanie chýb a kontrola riadiacich jednotiek",
  "Skúšobná jazda a vyhodnotenie správania vozidla",
  "Kontrola laku, hrúbky laku a známok nehody",
  "Detailné fotky vozidla a všetkých nedostatkov",
  "Jasné odporúčanie: kúpiť alebo nekúpiť",
];

const reviews = [
  {
    name: "Libor F.",
    car: "Ford Focus RS",
    text: "Milo ma prekvapila znalosť technika, jeho prístup a komunikácia s predajcom. Prehliadka prebehla detailne vrátane skúšobnej jazdy.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Jirí L.",
    car: "BMW 320d",
    text: "So službou som maximálne spokojný. Technik mi venoval viac času ako musel a všetko zrozumiteľne vysvetlil.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Martina P.",
    car: "Kia Sportage",
    text: "Rýchle a profesionálne jednanie. Pán bol ochotný, poradil a pripravil prehľadné detaily o vozidle.",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=80",
  },
];

const featureCards = [
  {
    icon: Wrench,
    title: "Technický stav",
    text: "Motor, prevodovka, brzdy, podvozok a viditeľné servisné riziká.",
  },
  {
    icon: Gauge,
    title: "Diagnostika",
    text: "Načítanie chýb a kontrola riadiacich jednotiek priamo na mieste.",
  },
  {
    icon: Camera,
    title: "Fotodokumentácia",
    text: "Prehľadné fotky auta, detailov a nedostatkov, ktoré musíš vidieť.",
  },
];

const reasons = [
  "Nezávislá kontrola, sme na tvojej strane",
  "Dlhoročné skúsenosti na trhu s jazdenými autami",
  "Pokrytie po celom Slovensku",
  "Rýchle objednanie online",
];

const faqs = [
  {
    question: "Musím byť prítomný pri kontrole vozidla?",
    answer: "Nie, nemusíš. Náš technik vybaví všetko priamo s predajcom auta. Po prehliadke ťa telefonicky informuje o celkovom dojme a následne obdržíš podrobný elektronický report vrátane fotodokumentácie.",
  },
  {
    question: "Kedy a ako dostanem záverečný report?",
    answer: "Záverečný report vypracujeme a odošleme do 24 hodín od ukončenia obhliadky vozidla. Zvyčajne ho klienti dostanú ešte v ten istý deň večer e-mailom.",
  },
  {
    question: "Čo v prípade, ak predajca prehliadku neumožní?",
    answer: "Pokiaľ predajca odmietne prehliadku alebo diagnostiku (čo môže indikovať skryté problémy), ihneď ťa o tom informujeme. V takom prípade ti vrátime celú sumu v plnej výške alebo preveríme iné auto podľa tvojho výberu.",
  },
  {
    question: "Je v cene 159 € zahrnutá aj doprava technika?",
    answer: "Áno, cena 159 € je konečná a zahŕňa dopravu nášho technika v rámci celého územia Slovenskej republiky. Nečakajú ťa žiadne ďalšie skryté poplatky.",
  },
];

function CtaButton({
  children,
  href = "#objednavka",
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const isHash = href.startsWith("#");
  
  const baseClass = "focus-ring inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer";
  const variantClass = variant === "primary"
    ? "border-[#189653] bg-[#189653] text-white hover:bg-[#127744] hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98]"
    : "border-slate-200 bg-white text-slate-800 hover:border-brand hover:text-brand active:scale-[0.98]";

  if (isHash) {
    return (
      <a href={href} onClick={onClick} className={`${baseClass} ${variantClass}`}>
        {children}
        <ArrowRight aria-hidden="true" size={16} strokeWidth={2.7} />
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClass} ${variantClass}`}>
      {children}
      <ArrowRight aria-hidden="true" size={16} strokeWidth={2.7} />
    </Link>
  );
}

function Rating({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "text-white" : "text-slate-800";
  const mutedColor = variant === "dark" ? "text-slate-400" : "text-slate-500";
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-black ${textColor}`}>4.9</span>
      <div className="flex gap-0.5 text-[#189653]" aria-label="Hodnotenie 5 z 5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <span className={`text-sm font-bold ${mutedColor}`}>
        recenzie na <span className="font-black text-[#4285f4]">G</span><span className="font-black text-[#ea4335]">o</span><span className="font-black text-[#fbbc05]">o</span><span className="font-black text-[#4285f4]">g</span><span className="font-black text-[#34a853]">l</span><span className="font-black text-[#ea4335]">e</span>
      </span>
    </div>
  );
}

function SlovakiaMap() {
  return (
    <svg
      viewBox="0 0 760 360"
      role="img"
      aria-label="Mapa Slovenska"
      className="mx-auto h-auto w-full max-w-3xl"
    >
      <path
        d="M54 210 C47 184 63 154 92 143 C118 134 122 105 151 101 C174 98 187 83 207 72 C234 57 254 77 281 69 C309 61 318 32 337 44 C354 55 358 81 381 86 C404 91 420 78 440 67 C465 53 484 71 507 68 C534 64 548 49 570 63 C589 75 612 66 637 76 C668 88 667 120 694 133 C724 147 713 177 734 194 C710 221 697 249 657 245 C623 242 612 268 579 264 C548 260 535 282 500 275 C462 268 443 289 405 284 C365 278 350 309 309 298 C276 290 259 315 223 301 C190 289 163 307 135 282 C108 258 73 262 61 237 C56 226 67 217 54 210 Z"
        fill={primary}
        stroke="white"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M151 101 C158 140 174 160 145 202 C130 224 139 253 135 282 M231 64 C248 128 224 166 249 211 C263 236 249 268 223 301 M337 44 C345 111 319 147 333 204 C340 236 329 268 309 298 M440 67 C420 121 421 177 442 221 C453 246 430 268 405 284 M570 63 C551 119 540 177 548 222 C552 248 528 265 500 275 M637 76 C618 128 606 178 614 218 C619 240 600 257 579 264"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.86"
      />
      <circle cx="380" cy="178" r="10" fill="white" opacity="0.9" />
      <circle cx="380" cy="178" r="22" fill="none" stroke="white" strokeWidth="3" />
    </svg>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    adUrl: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    // Check payment status from query parameters
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment) {
      setPaymentStatus(payment);
      setCustomerName(params.get("name") || "");
    }
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMessage("Prosím, vyplňte meno, telefón a e-mail.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nepodarilo sa vytvoriť objednávku.");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Neplatná odpoveď zo servera.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Nastala neznáma chyba. Skúste to znova.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen">


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-24 border-b border-slate-100">
        <div className="container-shell grid gap-12 items-center lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="mb-6 inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 rounded-full">
              <BadgeCheck aria-hidden="true" size={15} className="text-brand" />
              Kontrola vozidiel pred kúpou po celom SR
            </div>
            
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Nekupuj auto <span className="text-brand">naslepo</span>.
            </h1>
            
            <p className="mt-5 max-w-xl text-lg text-slate-600 font-medium">
              Skontrolujeme vozidlo za teba kdekoľvek na Slovensku. Získaš spoľahlivý, nezávislý pohľad na technický stav auta ešte pred kúpou.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <CtaButton href="#objednavka">Preveriť auto</CtaButton>
              <CtaButton href="/kontrola-vozidla" variant="secondary">
                Pozrieť detaily služby
              </CtaButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-6 w-full">
              <Rating />
            </div>

            <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 w-full">
              {trustPoints.map((point) => (
                <div
                  className="flex items-center gap-3 border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-bold text-slate-800 rounded-lg"
                  key={point}
                >
                  <div className="flex size-5 items-center justify-center bg-emerald-50 text-brand rounded-full">
                    <Check aria-hidden="true" size={12} strokeWidth={3} />
                  </div>
                  {point}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Floating Visual Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative min-h-[440px] md:min-h-[500px] flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md bg-slate-100/40 border border-slate-100/60 p-6 rounded-2xl overflow-hidden aspect-[4/3] shadow-inner">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-90 rounded-2xl transition duration-500 hover:scale-[1.02]"
                src="https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&w=1200&q=82"
                alt="Prehliadka vozidla technikom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent rounded-2xl" />
            </div>

            {/* Float Card 1: Status */}
            <motion.div
              initial={{ x: 30, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-4 right-4 md:right-0 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl w-64"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">Vaša kontrola</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900 leading-tight">Preverené vozidlo</p>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand">
                  <ShieldCheck size={18} />
                </span>
              </div>
              <div className="mt-4 border border-slate-100 bg-slate-50/50 p-3 rounded-xl">
                <p className="text-[10px] font-black uppercase text-slate-500">Zistené chyby</p>
                <p className="mt-0.5 text-2xl font-black text-slate-900">
                  3 <span className="text-sm font-semibold text-slate-500">závady</span>
                </p>
              </div>
              <div className="mt-3 space-y-1.5 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <Check size={14} className="text-[#189653]" strokeWidth={3} /> Diagnostika RJ
                </span>
                <span className="flex items-center gap-2">
                  <Check size={14} className="text-[#189653]" strokeWidth={3} /> Meranie laku
                </span>
                <span className="flex items-center gap-2">
                  <Check size={14} className="text-[#189653]" strokeWidth={3} /> Skúšobná jazda
                </span>
              </div>
            </motion.div>

            {/* Float Card 2: Recommendation Badge */}
            <motion.div
              initial={{ x: -30, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 left-4 md:-left-4 bg-white/95 border border-slate-100/80 px-5 py-4 rounded-xl shadow-lg backdrop-blur-md"
            >
              <p className="text-sm font-extrabold text-slate-900">Záverečný Report</p>
              <p className="text-xs font-bold text-[#189653] flex items-center gap-1.5 mt-0.5">
                <span className="inline-block size-2 rounded-full bg-brand animate-ping" />
                Odporúčanie technika k nákupu
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps (Ako prebieha kontrola) */}
      <section id="ako" className="py-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-wider text-[#189653]">Jednoduchý postup</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ako prebieha kontrola vozidla
            </h2>
            <p className="mt-3 text-slate-600 font-medium">
              Celým procesom ťa prevedieme rýchlo a bez zbytočného stresu.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-sm hover-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    src={step.image}
                    alt={step.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <span className="absolute left-4 top-3 text-5xl font-black text-white/20 select-none">
                    0{index + 1}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-brand transition">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 font-medium">
                    {step.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Slovak Map */}
      <section id="mapa" className="py-20 bg-white border-y border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-wider text-brand">Pokrytie</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Prehliadky po celom Slovensku
            </h2>
            <p className="mt-3 text-slate-600 font-medium">
              Pokrývame veľké autobazáre aj súkromných predajcov. Doprava technika je plne zahrnutá v cene.
            </p>
          </div>
          <div className="mt-12 bg-slate-50/50 border border-slate-100/50 p-6 rounded-2xl">
            <SlovakiaMap />
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {["Západné Slovensko", "Stredné Slovensko", "Východné Slovensko"].map((region) => (
              <div
                className="flex items-center gap-3 border border-slate-100 bg-slate-50/30 p-4 rounded-xl font-bold text-slate-800"
                key={region}
              >
                <div className="flex size-8 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-lg">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{region}</p>
                  <p className="text-xs text-slate-500 font-medium">Bez doplatkov za cestu</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing / Packages */}
      <section id="cena" className="py-20 bg-slate-950 text-white border-y border-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-brand">Jasné podmienky</p>
              <h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl">
                Kompletná kontrola vozidla za 159 €
              </h2>
              <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                U nás neplatíš za žiadne „verzie“ ani balíky. Každé auto preveríme na maximum. Služba je all-inclusive, bez skrytých poplatkov na mieste.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-slate-900/60 text-slate-400 border border-slate-800 px-4 py-2.5 rounded-lg text-xs font-bold">
                <Info size={14} className="text-slate-400" />
                V cene je už zahrnuté aj cestovné technika
              </div>
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              className="border border-slate-800 bg-slate-900/60 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                Akcia limitovaná
              </div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Konečná cena kontroly</p>
              <div className="flex flex-wrap items-end gap-3 mt-3">
                <span className="text-5xl font-black text-white">159 €</span>
                <span className="pb-1 text-lg font-bold text-slate-500 line-through">
                  199 €
                </span>
                <span className="bg-emerald-950/40 text-brand text-xs font-black px-2 py-1 rounded-md mb-1">
                  Ušetríš 40 €
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-300 font-semibold leading-relaxed">
                Fyzická kontrola exteriéru, diagnostika všetkých RJ, meranie hrúbky laku, skúšobná jazda, fotodokumentácia a záverečné telefonické odporúčanie od technika.
              </p>
              <div className="mt-8">
                <CtaButton href="#objednavka">Záväzne objednať obhliadku</CtaButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Detail List */}
      <section id="kontrola" className="py-20 bg-white border-y border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-brand">Rozsah obhliadky</p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Čo všetko detailne skontrolujeme
              </h2>
              <p className="mt-3 text-slate-600 font-medium">
                Naši technici sa zamerajú na rizikové a často opotrebované súčasti vozidla.
              </p>
              <div className="mt-8 space-y-4">
                {featureCards.map((card) => (
                  <div className="flex gap-4 border border-slate-100 bg-slate-50/30 p-5 rounded-xl" key={card.title}>
                    <span className="grid size-12 shrink-0 place-items-center bg-emerald-50 text-brand rounded-lg">
                      <card.icon aria-hidden="true" size={22} strokeWidth={2.5} />
                    </span>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 font-medium leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <div className="grid gap-3 sm:grid-cols-2">
                {checks.map((item) => (
                  <div
                    className="flex items-center gap-3 border border-slate-100 bg-slate-50/50 p-4 rounded-xl font-bold text-slate-800"
                    key={item}
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                      <ShieldCheck aria-hidden="true" size={15} strokeWidth={2.6} />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 border border-emerald-100 bg-emerald-50/20 p-6 rounded-xl flex items-start gap-4">
                <Info className="text-brand shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Chcete vedieť o 150-bodovej prehliadke viac?</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    Prečítajte si kompletné technické detaily a jednotlivé body kontroly.
                  </p>
                  <Link href="/kontrola-vozidla" className="text-brand hover:underline text-xs font-black mt-2 inline-flex items-center gap-1">
                    Zobraziť detail kontroly <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Customer Reviews */}
      <section id="recenzie" className="py-20 bg-slate-950 text-white border-y border-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-brand">Spätná väzba</p>
              <h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl">
                Čo hovoria naši zákazníci
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <Rating variant="dark" />
              <p className="text-xs text-slate-400 font-bold">Na základe preverených nákupov</p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((review, idx) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="overflow-hidden bg-slate-900/50 border border-slate-800/80 rounded-2xl shadow-sm hover-lift flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="mb-4 flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={15} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 font-medium italic">"{review.text}"</p>
                </div>
                <div className="border-t border-slate-800 p-6 bg-slate-900/30 flex items-center gap-3">
                  <div className="size-10 rounded-full overflow-hidden border border-slate-700 shrink-0">
                    <img className="size-full object-cover" src={review.image} alt={review.name} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white">{review.name}</p>
                    <p className="text-[11px] font-bold text-slate-400">{review.car}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Package Contents Detail */}
      <section id="balik" className="py-20 bg-white border-y border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-brand">Obsah balíka</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Kompletná obhliadka bez zbytočného hádania
            </h2>
            <p className="mt-4 text-slate-600 font-medium leading-relaxed">
              Jedno zle kúpené auto ťa môže vyjsť na tisíce eur na nečakaných opravách. Profesionálna obhliadka od nás stojí len zlomok tejto sumy.
            </p>
          </div>
          <div className="space-y-2.5">
            {packageItems.map((item) => (
              <div
                className="flex items-start gap-3 border border-slate-100 bg-slate-50/30 p-4 rounded-xl text-sm font-bold text-slate-800"
                key={item}
              >
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-brand mt-0.5">
                  <ClipboardCheck aria-hidden="true" size={13} strokeWidth={2.8} />
                </div>
                <span className="font-extrabold text-slate-900 leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell max-w-3xl"
        >
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-wider text-brand">Máte otázky?</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Často kladené otázky
            </h2>
          </div>
          
          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200/80 bg-white rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-extrabold text-slate-900 hover:text-brand transition cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-slate-100 p-5 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Us (Prečo si vybrať nás) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr]"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-brand">Prečo CONTROLLO</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Prečo zveriť kontrolu nám
            </h2>
            <div className="mt-8 space-y-3">
              {reasons.map((reason) => (
                <div
                  className="flex items-center gap-3 border border-slate-100 p-4 rounded-xl font-bold text-slate-800"
                  key={reason}
                >
                  <div className="flex size-7 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                    <BadgeCheck aria-hidden="true" size={16} />
                  </div>
                  <span className="font-extrabold text-slate-950 text-sm">{reason}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-slate-100 bg-slate-50/50 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-950">
                Doplnkové služby na jednom mieste
              </h3>
              <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
                Okrem dôkladného preverenia vozidla ti radi pomôžeme s poistením či výhodným financovaním bez zbytočného behania po úradoch.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Návrh najvýhodnejšieho PZP alebo havarijného poistenia",
                  "Možnosť financovania cez úver alebo leasing",
                  "Rýchle a jednoduché spracovanie na kľúč",
                ].map((item) => (
                  <div className="flex items-center gap-3 font-semibold text-slate-800 text-xs sm:text-sm" key={item}>
                    <Check aria-hidden="true" className="text-brand shrink-0" size={16} strokeWidth={3} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Booking Form Section */}
      <section id="objednavka" className="py-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-brand">Nezáväzný formulár</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Objednávka kontroly auta
            </h2>
            <p className="mt-4 text-slate-600 font-medium leading-relaxed">
              Vyplň krátky formulár. Technik ťa bude následne kontaktovať pre potvrdenie miesta, času a detailov obhliadky.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 font-bold text-slate-800">
                <div className="flex size-8 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                  <Clock size={16} />
                </div>
                <span className="text-sm font-extrabold text-slate-900">Rýchle dohodnutie termínu (do 24-48 hod.)</span>
              </div>
              <div className="flex items-center gap-3 font-bold text-slate-800">
                <div className="flex size-8 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full">
                  <MapPin size={16} />
                </div>
                <span className="text-sm font-extrabold text-slate-900">Kontroly po celom Slovensku bez doplatkov</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="grid gap-4 border border-slate-100 bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
            {errorMessage && (
              <div className="bg-red-50 text-red-800 text-xs font-bold p-3 rounded-lg border border-red-100 mb-2">
                {errorMessage}
              </div>
            )}
            {paymentStatus === "cancelled" && (
              <div className="bg-amber-50 text-amber-900 text-xs font-bold p-3 rounded-lg border border-amber-100 mb-2 flex items-center justify-between">
                <span>Platba bola zrušená. Vaša objednávka nebola dokončená.</span>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentStatus(null);
                    window.history.replaceState({}, document.title, window.location.pathname);
                  }}
                  className="text-amber-700 hover:text-amber-950 font-black cursor-pointer ml-2"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
              Meno a priezvisko *
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                placeholder="Tvoje meno"
                type="text"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                Telefónne číslo *
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                  placeholder="+421 XXX XXX XXX"
                  type="tel"
                />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                E-mailová adresa *
                <input
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                  placeholder="info@email.sk"
                  type="email"
                />
              </label>
            </div>
            <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
              Odkaz na inzerát vozidla
              <input
                value={formData.adUrl}
                onChange={(e) => setFormData({ ...formData, adUrl: e.target.value })}
                className="focus-ring min-h-12 border border-slate-200 rounded-lg px-4 text-sm font-bold normal-case focus:border-brand"
                placeholder="https://www.autobazar.eu/..."
                type="url"
              />
            </label>
            <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
              Poznámka pre technika
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="focus-ring min-h-28 resize-none border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold normal-case focus:border-brand"
                placeholder="Doplňujúce otázky, preferovaný termín alebo miesto..."
              />
            </label>
            <button
              disabled={isSubmitting}
              className="focus-ring mt-2 inline-flex min-h-12 items-center justify-center gap-2 border border-[#189653] bg-[#189653] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#127744] hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? "Presmerovanie na platbu..." : "Prejsť k platbe 159 €"}
              <ArrowRight aria-hidden="true" size={15} strokeWidth={2.7} />
            </button>
          </form>
        </motion.div>
      </section>

      {/* Payment Success Overlay Modal */}
      <AnimatePresence>
        {(paymentStatus === "success" || paymentStatus === "mock_success") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden border border-slate-100 bg-white p-8 shadow-2xl rounded-2xl text-center"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-brand">
                <Check size={28} strokeWidth={3} />
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-slate-900 mt-5">
                Objednávka zaplatená!
              </h3>
              <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
                Ďakujeme za vašu objednávku{customerName ? `, ${customerName}` : ""}. Platba prebehla úspešne a technické detaily sme prijali. Náš technik vás bude čoskoro kontaktovať pre dohodnutie obhliadky.
              </p>
              
              {paymentStatus === "mock_success" && (
                <div className="mt-4 bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold p-3.5 rounded-lg text-left">
                  <strong>Stripe Demo Mode:</strong> Táto objednávka bola spracovaná v simulovanom režime, keďže chýba Stripe konfigurácia. V produkcii budete presmerovaní na skutočnú platobnú bránu Stripe.
                </div>
              )}

              <button
                onClick={() => {
                  setPaymentStatus(null);
                  window.history.replaceState({}, document.title, window.location.pathname);
                }}
                className="focus-ring mt-6 w-full inline-flex min-h-12 items-center justify-center bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-slate-800 transition cursor-pointer rounded-lg"
              >
                Zavrieť
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
