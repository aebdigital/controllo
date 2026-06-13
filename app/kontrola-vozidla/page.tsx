"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  Info,
  ShieldCheck,
  ArrowRight,
  Gauge,
  Wrench,
  Camera,
  Car,
  FileText,
  PhoneCall,
  UserCheck,
} from "lucide-react";

interface ChecklistCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
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
      "Kontrola chladiacej sústavy a tesnosti hadíc vrátane testu na CO2 v chladiacej zmesi",
      "Analýza výfukových plynov (nadmerná dymivosť motora)",
    ],
  },
  {
    id: "podvozok",
    title: "Podvozok, Riadenie a Brzdy",
    description: "Záruka bezpečnosti – kontrola vôle čapov, tlmičov a bŕzd.",
    icon: ShieldCheck,
    items: [
      "Kontrola vôle v čapoch riadenia, ramenách a tyčkách stabilizátora",
      "Vizuálna kontrola stavu tlmičov, pružín a dorazov na známky opotrebovania/netečenia",
      "Meranie a hodnotenie opotrebovania brzdových kotúčov a brzdových platničiek",
      "Kontrola stavu a veku pneumatík (hĺbka dezénu, rovnomernosť opotrebovania)",
      "Kontrola tesnosti manžiet poloosí a riadenia",
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
      "Krížové overenie najazdených kilometrov v rôznych riadiacich jednotkách",
      "Analýza live dát (tlak turba, korekcie vstrekovačov, stav filtra pevných častíc DPF/GPF)",
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

export default function ProductDetailPage() {
  const [activeCategory, setActiveCategory] = useState<string>("karoseria");

  return (
    <main className="bg-slate-50 min-h-screen py-12 md:py-20">
      {/* Product Hero */}
      <section className="container-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 rounded-full">
            Nezávislá obhliadka
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
            150-Bodová Kontrola Vozidla
          </h1>
          <p className="mt-5 text-lg text-slate-600 font-medium leading-relaxed">
            Najvyhľadávanejšia služba pre preverenie ojazdených áut na Slovensku. Naši vyškolení technici skontrolujú vozidlo priamo na mieste predaja a chránia ťa pred nevýhodnou kúpou.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-xs flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase text-slate-400">All-Inclusive Cena</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-slate-950">159 €</span>
                <span className="text-sm font-bold text-slate-400 line-through">199 €</span>
                <span className="text-xs font-black text-brand">(ušetríš 40 €)</span>
              </div>
            </div>
            <Link
              href="/#objednavka"
              className="focus-ring flex-1 sm:flex-initial inline-flex min-h-16 items-center justify-center gap-2 border border-brand bg-brand px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] rounded-xl"
            >
              Objednať preverenie teraz
              <ArrowRight size={18} strokeWidth={2.7} />
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-bold">
            <Info size={14} className="text-slate-400 shrink-0" />
            <span>Žiadne skryté poplatky za dopravu v rámci celého Slovenska.</span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-6">
          <h3 className="font-heading text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="text-brand" />
            Čo všetko dostaneš v cene?
          </h3>
          
          <ul className="space-y-4">
            {[
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
            ].map((feature, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-brand">
                  <feature.icon size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{feature.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive 150-Point Checklist */}
      <section className="container-shell mt-20 md:mt-32">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <p className="text-xs font-black uppercase tracking-wider text-brand">Hĺbková analýza</p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Prejdite si 150 bodov našej kontroly
          </h2>
          <p className="mt-3 text-slate-600 font-medium">
            Vyberte si technickú kategóriu a pozrite sa, čo všetko naši experti na mieste preverujú.
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
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
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
                          className="flex items-start gap-3 border border-slate-50 bg-slate-50/20 p-3.5 rounded-lg text-sm text-slate-700 font-bold"
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
      </section>

      {/* Comparison Chart */}
      <section className="container-shell mt-20 md:mt-32">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <p className="text-xs font-black uppercase tracking-wider text-brand">Prečo Controllo</p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Porovnanie možností pred kúpou auta
          </h2>
          <p className="mt-3 text-slate-600 font-medium">
            Zistite, prečo je nezávislá obhliadka najlepším riešením z hľadiska času, odbornosti a nákladov.
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
            <tbody className="text-sm font-bold text-slate-700">
              {[
                {
                  label: "Cena a cestovné náklady",
                  controllo: "159 € (Konečná cena vrátane cesty)",
                  self: "Cestovné náklady + tvoj stratený čas",
                  garage: "50-80 € za prehliadku + odťah/cesta",
                },
                {
                  label: "Dĺžka a rozsah prehliadky",
                  controllo: "cca 1.5 - 2 hodiny (150 bodov)",
                  self: "cca 30 minút (vizuálny pohľad)",
                  garage: "cca 1 hodina (bežné úkony)",
                },
                {
                  label: "Meranie hrúbky laku",
                  controllo: "Áno (profesionálny digitálny prístroj)",
                  self: "Len vizuálny odhad",
                  garage: "Závisí od vybavenia servisu",
                },
                {
                  label: "Diagnostika chýb",
                  controllo: "Áno (Hĺbkový sken všetkých RJ priamo na mieste)",
                  self: "Nie",
                  garage: "Áno (musíš prísť do servisu)",
                },
                {
                  label: "Tvoja prítomnosť",
                  controllo: "Nepovinná (Všetko vybavíme za teba)",
                  self: "Povinná (Musíš cestovať osobne)",
                  garage: "Povinná (Musíš auto doviezť)",
                },
                {
                  label: "Záverečný report",
                  controllo: "Áno (Prehľadný digitálny report do 24 hod.)",
                  self: "Nie",
                  garage: "Len ústne zhodnotenie",
                },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                  <td className="p-5 border-r border-slate-100 font-extrabold text-slate-900">{row.label}</td>
                  <td className="p-5 border-r border-slate-100 text-emerald-800 bg-emerald-50/20 font-extrabold">{row.controllo}</td>
                  <td className="p-5 border-r border-slate-100 font-medium text-slate-500">{row.self}</td>
                  <td className="p-5 font-medium text-slate-500">{row.garage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container-shell mt-20 md:mt-32">
        <div className="bg-slate-950 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl">
          <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-emerald-900/10" />
          <div className="max-w-xl relative">
            <h3 className="font-heading text-2xl md:text-3xl font-extrabold leading-tight !text-white">
              Nečakaj, kým bude neskoro
            </h3>
            <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed">
              Mnoho predajcov maskuje závažné havárie a poruchy motora. Prever auto naším technikom a získaj istotu pred nákupom.
            </p>
          </div>
          <div className="relative shrink-0">
            <Link
              href="/#objednavka"
              className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 bg-brand px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] cursor-pointer rounded-lg"
            >
              Objednať preverenie za 159 €
              <ArrowRight size={16} strokeWidth={2.7} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
