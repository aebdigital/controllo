"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { W, H, path as slovakiaPath, project } from "./slovakia-map-data";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Gauge,
  Info,
  MapPin,
  Minus,
  PhoneCall,
  ShieldCheck,
  Star,
  UserCheck,
  Wrench,
  Car,
  X,
} from "lucide-react";

const mapPins = [
  { name: "Bratislava", lat: 48.1486, lon: 17.1077 },
  { name: "Trnava", lat: 48.3774, lon: 17.5872 },
  { name: "Nitra", lat: 48.3061, lon: 18.0764 },
  { name: "Trenčín", lat: 48.8945, lon: 18.0444 },
  { name: "Žilina", lat: 49.2232, lon: 18.7394 },
  { name: "Banská Bystrica", lat: 48.7363, lon: 19.1462 },
  { name: "Poprad", lat: 49.0614, lon: 20.298 },
  { name: "Prešov", lat: 48.9977, lon: 21.2393 },
  { name: "Košice", lat: 48.7164, lon: 21.2611 },
].map((city) => ({ ...city, ...project(city.lat, city.lon) }));

const mapMargin = 18;
const mapViewBox = {
  x: -mapMargin,
  y: -mapMargin,
  w: W + mapMargin * 2,
  h: H + mapMargin * 2,
};

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
    image: "/1.png",
    imageAlt: "Objednávka kontroly vozidla",
  },
  {
    title: "Ozveme sa ti",
    text: "Dohodneme termín, miesto obhliadky a všetky potrebné detaily.",
    image: "/2.png",
    imageAlt: "Dohodnutie termínu kontroly vozidla",
  },
  {
    title: "Preveríme auto",
    text: "Technik skontroluje vozidlo priamo u predajcu a urobí skúšobnú jazdu.",
    image: "/3.png",
    imageAlt: "Technická kontrola auta pred kúpou",
  },
  {
    title: "Dostaneš report",
    text: "Pošleme jasné zhrnutie stavu a odporúčanie, či auto kúpiť.",
    image: "/4.png",
    imageAlt: "Záverečný report z kontroly vozidla",
  },
];

interface ChecklistCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number | string }>;
  items: string[];
}

const checklistCategories: ChecklistCategory[] = [
  {
    id: "karoseria",
    title: "Karoséria a Lak",
    description: "Zisťujeme reálnu históriu nehôd a meriame hrúbku laku.",
    icon: Car,
    items: [
      "Meranie hrúbky laku digitálnym prístrojom na všetkých kovových a hliníkových dieloch",
      "Analýza lícovania jednotlivých dielov karosérie (kontrola škár a medzier)",
      "Kontrola originálnych spojov, zvarov a tmelov v motorovom priestore a kufri",
      "Preverenie upevňovacích skrutiek blatníkov, kapoty a dverí na stopy po demontáži",
      "Kontrola stavu všetkých skiel vrátane čelného (overenie roku výroby a poškodení)",
      "Kontrola nosných stĺpikov karosérie a deformačných zón na známky rovnania",
      "Zisťovanie prítomnosti korózie (blatníky, prahy, spodky dverí)",
    ],
  },
  {
    id: "motor",
    title: "Motor a Prevodovka",
    description: "Kontrola srdca vozidla na úniky kvapalín a plynulý chod.",
    icon: Wrench,
    items: [
      "Vizuálna kontrola tesnosti motora (stopy po úniku oleja, chladiacej zmesi)",
      "Kontrola stavu a veku prevádzkových kvapalín (motorový olej, brzdová a chladiaca kvapalina)",
      "Hodnotenie zvuku motora za studena a za tepla (klepanie, nezvyčajné vibrácie)",
      "Kontrola stavu hnacích remeňov a viditeľných častí rozvodov",
      "Overenie funkčnosti spojky a plynulosti radenia (manuálna aj automatická prevodovka)",
      "Analýza výfukových plynov (nadmerná dymivosť motora)",
    ],
  },
  {
    id: "podvozok",
    title: "Podvozok, Riadenie a Brzdy",
    description: "Záruka bezpečnosti – kontrola vôle čapov, tlmičov a bŕzd.",
    icon: ShieldCheck,
    items: [
      "Meranie a hodnotenie opotrebovania brzdových kotúčov a brzdových platničiek",
      "Kontrola stavu a veku pneumatík (hĺbka dezénu, rovnomernosť opotrebovania)",
      "Preverenie stavu ložísk kolies (prítomnosť hučania alebo vôle)",
      "Kontrola korózie a celistvosti podvozkových plechov a výfukového potrubia",
    ],
  },
  {
    id: "diagnostika",
    title: "Počítačová Diagnostika",
    description: "Hĺbkový sken všetkých riadiacich jednotiek priamo na mieste.",
    icon: Gauge,
    items: [
      "Pripojenie profesionálnej diagnostiky k OBD portu vozidla",
      "Kompletné vyčítanie chybových kódov zo všetkých dostupných riadiacich jednotiek (ECU)",
      "Kontrola pamäte závad motora, prevodovky, airbagov, ABS/ESP a komfortnej výbavy",
      "Kontrola funkčnosti dobíjania alternátora a kondície autobatérie",
    ],
  },
  {
    id: "interier",
    title: "Interiér a Výbava",
    description: "Každé tlačidlo a funkcia musí prejsť našou kontrolou.",
    icon: UserCheck,
    items: [
      "Detailná kontrola opotrebovania volantu, pedálov, radiacej páky a sedadiel",
      "Overenie funkčnosti kúrenia a kompletného klimatizačného systému",
      "Test všetkých elektrických prvkov (sťahovanie okien, zrkadlá, zámky dverí, šíber)",
      "Kontrola infotainmentu, audiosystému, navigácie a cúvacej kamery/senzorov",
      "Overenie funkčnosti bezpečnostných pásov a mechanizmu nastavenia sedadiel",
      "Kontrola prítomnosti vody/vlhkosti pod kobercami (kontrola zatekania)",
    ],
  },
];

type ComparisonTone = "good" | "warn" | "bad";
interface ComparisonCell {
  text: string;
  tone: ComparisonTone;
}

const comparisonRows: { label: string; controllo: ComparisonCell; self: ComparisonCell; garage: ComparisonCell }[] = [
  {
    label: "Cena a cestovné náklady",
    controllo: { text: "159 € (Konečná cena vrátane cesty)", tone: "good" },
    self: { text: "Cestovné náklady + tvoj stratený čas", tone: "bad" },
    garage: { text: "50-80 € za prehliadku + odťah/cesta", tone: "warn" },
  },
  {
    label: "Dĺžka a rozsah prehliadky",
    controllo: { text: "cca 1.5 - 2 hodiny (150 bodov)", tone: "good" },
    self: { text: "cca 30 minút (vizuálny pohľad)", tone: "bad" },
    garage: { text: "cca 1 hodina (bežné úkony)", tone: "warn" },
  },
  {
    label: "Meranie hrúbky laku",
    controllo: { text: "Áno (profesionálny digitálny prístroj)", tone: "good" },
    self: { text: "Len vizuálny odhad", tone: "bad" },
    garage: { text: "Závisí od vybavenia servisu", tone: "warn" },
  },
  {
    label: "Diagnostika chýb",
    controllo: { text: "Áno (Hĺbkový sken všetkých RJ priamo na mieste)", tone: "good" },
    self: { text: "Nie", tone: "bad" },
    garage: { text: "Áno (musíš prísť do servisu)", tone: "warn" },
  },
  {
    label: "Tvoja prítomnosť",
    controllo: { text: "Nepovinná (Všetko vybavíme za teba)", tone: "good" },
    self: { text: "Povinná (Musíš cestovať osobne)", tone: "bad" },
    garage: { text: "Povinná (Musíš auto doviezť)", tone: "bad" },
  },
  {
    label: "Záverečný report",
    controllo: { text: "Áno (Prehľadný digitálny report do 24 hod.)", tone: "good" },
    self: { text: "Nie", tone: "bad" },
    garage: { text: "Len ústne zhodnotenie", tone: "warn" },
  },
];

const comparisonToneStyles: Record<ComparisonTone, { cell: string; icon: string }> = {
  good: { cell: "bg-emerald-50/60 text-emerald-900 font-extrabold", icon: "bg-emerald-100 text-emerald-700" },
  warn: { cell: "bg-amber-50/40 text-amber-900 font-medium", icon: "bg-amber-100 text-amber-700" },
  bad: { cell: "bg-red-50/50 text-red-800 font-medium", icon: "bg-red-100 text-red-600" },
};

function ComparisonCellContent({ cell }: { cell: ComparisonCell }) {
  const styles = comparisonToneStyles[cell.tone];
  const Icon = cell.tone === "good" ? Check : cell.tone === "bad" ? X : Minus;
  return (
    <div className="flex items-start gap-2.5">
      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${styles.icon}`}>
        <Icon size={12} strokeWidth={3} />
      </span>
      <span className="leading-snug">{cell.text}</span>
    </div>
  );
}

const priceIncludes = [
  {
    icon: ShieldCheck,
    title: "Fyzická obhliadka technikom",
    text: "Osobná prítomnosť skúseného autotechnika pri vozidle.",
  },
  {
    icon: FileText,
    title: "Detailný elektronický report",
    text: "Výsledky všetkých 150 bodov kontroly v prehľadnej tabuľke.",
  },
  {
    icon: Camera,
    title: "Bohatá fotodokumentácia",
    text: "Zábery auta a detailné fotky zistených nedostatkov či lakovania.",
  },
  {
    icon: PhoneCall,
    title: "Telefonická konzultácia",
    text: "Ihneď po obhliadke ti technik zavolá a preberie s tebou stav auta.",
  },
];

const reviews = [
  {
    name: "Libor F.",
    car: "Ford Focus RS",
    text: "Milo ma prekvapila znalosť technika, jeho prístup a komunikácia s predajcom. Prehliadka prebehla detailne vrátane skúšobnej jazdy.",
  },
  {
    name: "Jirí L.",
    car: "BMW 320d",
    text: "So službou som maximálne spokojný. Technik mi venoval viac času ako musel a všetko zrozumiteľne vysvetlil.",
  },
  {
    name: "Martina P.",
    car: "Kia Sportage",
    text: "Rýchle a profesionálne jednanie. Pán bol ochotný, poradil a pripravil prehľadné detaily o vozidle.",
  },
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
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const baseClass = "focus-ring inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer";
  const variantClass = variant === "primary"
    ? "border-[#189653] bg-[#189653] text-white hover:bg-[#127744] hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98]"
    : "border-slate-200 bg-white text-slate-800 hover:border-brand hover:text-brand active:scale-[0.98]";

  return (
    <a href={href} className={`${baseClass} ${variantClass}`}>
      {children}
      <ArrowRight aria-hidden="true" size={16} strokeWidth={2.7} />
    </a>
  );
}

function SlovakiaMap() {
  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      style={{ aspectRatio: `${mapViewBox.w} / ${mapViewBox.h}` }}
    >
      <svg
        viewBox={`${mapViewBox.x} ${mapViewBox.y} ${mapViewBox.w} ${mapViewBox.h}`}
        role="img"
        aria-label="Mapa Slovenska s mestami, kde robíme kontroly vozidiel"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="controllo-sk-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bdebd1" stopOpacity="0.96" />
            <stop offset="56%" stopColor="#189653" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f6f3d" stopOpacity="0.96" />
          </linearGradient>
          <pattern
            id="controllo-sk-texture"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-16)"
          >
            <path
              d="M-4 5 H28 M-4 16 H28"
              stroke="#ffffff"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <circle cx="6" cy="10" r="1.1" fill="#0a3b24" fillOpacity="0.12" />
            <circle cx="18" cy="3" r="0.85" fill="#ffffff" fillOpacity="0.32" />
          </pattern>
          <filter id="controllo-sk-shadow" x="-12%" y="-12%" width="124%" height="124%">
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="18"
              floodColor="#0f6f3d"
              floodOpacity="0.14"
            />
          </filter>
        </defs>
        <path
          d={slovakiaPath}
          fill="#dff4e8"
          stroke="#189653"
          strokeOpacity="0.18"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#controllo-sk-shadow)"
        />
        <path
          d={slovakiaPath}
          fill="url(#controllo-sk-fill)"
          stroke="#0f6f3d"
          strokeWidth="1.5"
          strokeOpacity="0.52"
          strokeLinejoin="round"
        />
        <path d={slovakiaPath} fill="url(#controllo-sk-texture)" opacity="0.55" />
      </svg>

      {mapPins.map((pin) => (
        <div
          key={pin.name}
          className="group absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${((pin.x - mapViewBox.x) / mapViewBox.w) * 100}%`,
            top: `${((pin.y - mapViewBox.y) / mapViewBox.h) * 100}%`,
          }}
        >
          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 24 34"
              className="h-7 w-auto drop-shadow-md transition-transform duration-150 group-hover:scale-125"
              style={{ transformOrigin: "bottom center" }}
              aria-hidden="true"
            >
              <path
                d="M12 0C5.9 0 1 4.9 1 11c0 7.9 9.5 21.3 10.2 22.3.4.6 1.2.6 1.6 0C13.5 32.3 23 18.9 23 11 23 4.9 18.1 0 12 0z"
                fill="#0f6f3d"
                stroke="#fff"
                strokeWidth={1.8}
              />
              <circle cx="12" cy="11" r="4" fill="#fff" />
            </svg>
            <span className="mt-1 hidden whitespace-nowrap bg-white/95 px-2 py-1 text-xs font-black text-[#0f6f3d] shadow-sm ring-1 ring-[#d9e2dc] sm:block">
              {pin.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("karoseria");
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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    // Check payment status from query parameters
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment) {
      setPaymentStatus(payment);
      setCustomerName(params.get("name") || "");
    }
  }, []);

  const clearPaymentStatus = () => {
    setPaymentStatus(null);
    window.history.replaceState({}, document.title, window.location.pathname);
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
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Nastala neznáma chyba. Skúste to znova.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-24 border-b border-slate-100">
        <div className="container-shell grid gap-12 items-center lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Nekupuj auto <span className="text-brand">naslepo</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-600 font-medium">
              Skontrolujeme vozidlo za teba kdekoľvek na Slovensku. Získaš spoľahlivý, nezávislý pohľad na technický stav auta ešte pred kúpou.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <CtaButton href="#objednavka">Preveriť auto</CtaButton>
              <CtaButton href="#kontrola" variant="secondary">
                Čo všetko kontrolujeme
              </CtaButton>
            </div>

            <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 w-full border-t border-slate-100 pt-8">
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
            className="relative min-h-[500px] md:min-h-[560px] lg:min-h-[620px] flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xl lg:max-w-2xl bg-slate-100/40 border border-slate-100/60 rounded-2xl overflow-hidden aspect-[5/4] shadow-inner">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-90 rounded-2xl transition duration-500 hover:scale-[1.02]"
                src="/3.png"
                alt="Technická kontrola auta pred kúpou"
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

          </motion.div>
        </div>
      </section>

      {/* Steps (Ako prebieha kontrola) */}
      <section id="ako" className="py-20 bg-slate-50 scroll-mt-24">
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
                className="group relative bg-white border border-slate-100 rounded-2xl shadow-sm hover-lift overflow-hidden p-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-brand text-lg font-black">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-brand transition">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 font-medium">
                  {step.text}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive 150-Point Checklist */}
      <section id="kontrola" className="py-20 bg-white border-y border-slate-100 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-xs font-black uppercase tracking-wider text-brand">Hĺbková analýza</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Hlavné oblasti 150-bodovej kontroly
            </h2>
            <p className="mt-3 text-slate-600 font-medium">
              Vyber si technickú kategóriu a pozri sa, čo všetko naši technici na mieste preverujú.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
            {/* Navigation Category Buttons */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-slate-200">
              {checklistCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-5 py-4 text-sm font-extrabold tracking-tight transition rounded-xl text-left shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-brand text-white shadow-md shadow-brand/10"
                        : "bg-white text-slate-700 hover:bg-slate-100/50 border border-slate-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{cat.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Checklist Items Display */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {checklistCategories.map((cat) => {
                  if (cat.id !== activeCategory) return null;
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-b border-slate-100 pb-4 mb-6">
                        <h3 className="text-xl font-extrabold text-slate-900">{cat.title}</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{cat.description}</p>
                      </div>

                      <ul className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
                        {cat.items.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 border border-slate-100 bg-white p-3.5 rounded-lg text-sm text-slate-700"
                          >
                            <div className="flex size-5 shrink-0 items-center justify-center bg-emerald-50 text-brand rounded-full mt-0.5">
                              <Check size={12} strokeWidth={3.2} />
                            </div>
                            <span className="leading-tight text-slate-800 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Comparison Chart */}
      <section className="py-20 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-xs font-black uppercase tracking-wider text-brand">Prečo Controllo</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Porovnanie možností pred kúpou auta
            </h2>
            <p className="mt-3 text-slate-600 font-medium">
              Zisti, prečo je nezávislá obhliadka najlepším riešením z hľadiska času, odbornosti a nákladov.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-900 text-white text-left text-xs font-black uppercase tracking-wider">
                  <th className="p-5 border-r border-slate-800">Parametre</th>
                  <th className="p-5 border-r border-slate-800 text-brand">Controllo obhliadka</th>
                  <th className="p-5 border-r border-slate-800">Kúpa svojpomocne</th>
                  <th className="p-5">Návšteva autoservisu</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-5 border-r border-slate-100 font-extrabold text-slate-900">{row.label}</td>
                    <td className={`p-5 border-r border-slate-100 ${comparisonToneStyles[row.controllo.tone].cell}`}>
                      <ComparisonCellContent cell={row.controllo} />
                    </td>
                    <td className={`p-5 border-r border-slate-100 ${comparisonToneStyles[row.self.tone].cell}`}>
                      <ComparisonCellContent cell={row.self} />
                    </td>
                    <td className={`p-5 ${comparisonToneStyles[row.garage.tone].cell}`}>
                      <ComparisonCellContent cell={row.garage} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="cena" className="py-20 bg-slate-950 text-white border-y border-slate-900 scroll-mt-24">
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
                Kompletná kontrola za jednu konečnú cenu
              </h2>
              <p className="mt-4 text-slate-400 font-medium leading-relaxed">
                U nás neplatíš za žiadne „verzie“ ani balíky. Každé auto preveríme na maximum. Služba je all-inclusive, bez skrytých poplatkov na mieste.
              </p>
              <ul className="mt-8 space-y-4">
                {priceIncludes.map((feature) => (
                  <li key={feature.title} className="flex gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-950/60 text-brand">
                      <feature.icon size={18} />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold !text-white">{feature.title}</h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">{feature.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              className="border border-slate-800 bg-slate-900/60 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
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
              <div className="mt-6 inline-flex items-center gap-2 bg-slate-950/60 text-slate-400 border border-slate-800 px-4 py-2.5 rounded-lg text-xs font-bold">
                <Info size={14} className="text-slate-400" />
                V cene je už zahrnuté aj cestovné a technika
              </div>
              <div className="mt-8">
                <CtaButton href="#objednavka">Objednať kontrolu</CtaButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Slovak Map */}
      <section id="mapa" className="py-20 bg-white border-b border-slate-100 scroll-mt-24">
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

      {/* Customer Reviews */}
      <section id="recenzie" className="py-20 bg-slate-950 text-white border-y border-slate-900 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-wider text-brand">Spätná väzba</p>
            <h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl">
              Čo hovoria naši zákazníci
            </h2>
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
                  <p className="text-sm leading-relaxed text-slate-300 font-medium italic">&bdquo;{review.text}&ldquo;</p>
                </div>
                <div className="border-t border-slate-800 p-6 bg-slate-900/30">
                  <p className="text-sm font-extrabold text-white">{review.name}</p>
                  <p className="text-[11px] font-bold text-slate-400">{review.car}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Booking Form Section */}
      <section id="objednavka" className="py-20 bg-white border-b border-slate-100 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-brand">Objednávka</p>
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
                  onClick={clearPaymentStatus}
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

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 scroll-mt-24">
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

          <div className="mt-10 text-center text-sm text-slate-600 font-medium">
            Nenašiel si odpoveď na svoju otázku?{" "}
            <Link href="/kontakt" className="text-brand font-extrabold hover:underline">
              Napíš nám
            </Link>
          </div>
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
                onClick={clearPaymentStatus}
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
