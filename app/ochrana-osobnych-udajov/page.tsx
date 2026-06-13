export default function GDPRPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-12 md:py-20">
      <article className="container-shell max-w-4xl bg-white border border-slate-100 rounded-2xl p-6 sm:p-10 shadow-xs">
        <header className="border-b border-slate-100 pb-6 mb-8">
          <p className="text-xs font-black uppercase tracking-wider text-brand">Dokument</p>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mt-1">
            Ochrana osobných údajov (GDPR)
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-2">
            Posledná aktualizácia: 13. júna 2026
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700 font-medium">
          <p className="text-base font-semibold text-slate-800">
            Bezpečnosť a ochrana vašich osobných údajov je pre nás prvoradá. V tomto dokumente sa dozviete, ako spoločnosť CONTROLLO získava, spracúva a chráni vaše osobné údaje v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
          </p>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">1. Prevádzkovateľ osobných údajov</h2>
            <p>
              Prevádzkovateľom vašich osobných údajov je:
            </p>
            <div className="mt-3 p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800">
              <p className="font-extrabold text-slate-950">Controllo s. r. o.</p>
              <p className="text-xs text-slate-500 mt-1">Sídlo: Družstevná 504/6, 072 22 Strážske</p>
              <p className="text-xs text-slate-500">IČO: 57523959</p>
              <p className="text-xs text-slate-500">DIČ: 2122807192</p>
              <p className="text-xs text-slate-500">E-mail: info@controllo.sk</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">2. Rozsah spracúvaných osobných údajov</h2>
            <p>
              Spracúvame len tie osobné údaje, ktoré sú nevyhnutné na poskytovanie našich služieb (kontrolu vozidla pred kúpou). Ide o tieto údaje:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
              <li>Meno a priezvisko</li>
              <li>Telefónne číslo</li>
              <li>E-mailová adresa</li>
              <li>Údaje o dopytovanom vozidle (odkaz na inzerát, značka, model, lokalita prehliadky)</li>
              <li>Fakturačné údaje (ak je to potrebné pre vystavenie faktúry)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">3. Účel a právny základ spracúvania</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full border-collapse border border-slate-100 text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs font-black uppercase text-slate-700">
                    <th className="p-3 border-b border-slate-200">Účel spracúvania</th>
                    <th className="p-3 border-b border-slate-200">Právny základ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-semibold">Vybavenie dopytu, objednávky a plnenie zmluvných záväzkov</td>
                    <td className="p-3 text-slate-500 font-medium">Plnenie zmluvy (Čl. 6 ods. 1 písm. b) GDPR)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-semibold">Vystavenie faktúry a splnenie daňovo-účtovných povinností</td>
                    <td className="p-3 text-slate-500 font-medium">Splnenie zákonnej povinnosti (Čl. 6 ods. 1 písm. c) GDPR)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-semibold">Ochrana práv a nárokov prevádzkovateľa (napr. vymáhanie pohľadávok)</td>
                    <td className="p-3 text-slate-500 font-medium">Oprávnený záujem (Čl. 6 ods. 1 písm. f) GDPR)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">4. Doba uchovávania osobných údajov</h2>
            <p>
              Vaše osobné údaje uchovávame len po nevyhnutnú dobu:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
              <li>Údaje spracúvané na účely plnenia zmluvy uchovávame po dobu trvania zmluvného vzťahu a premlčacej doby prípadných nárokov (štandardne 3-5 rokov).</li>
              <li>Údaje pre účtovné a daňové účely uchovávame v súlade s legislatívou po dobu 10 rokov.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">5. Poskytovanie údajov tretím stranám</h2>
            <p>
              Vaše osobné údaje nezdieľame s tretími stranami pre marketingové účely. K osobným údajom majú prístup výhradne naši zazmluvnení technici pre účely vykonania obhliadky a poskytovatelia nevyhnutných technicko-organizačných služieb (napr. hosting, účtovníctvo). Všetci subdodávatelia sú viazaní mlčanlivosťou a zmluvami o spracúvaní osobných údajov.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-3">6. Vaše práva ako dotknutej osoby</h2>
            <p>
              V súvislosti so spracúvaním vašich osobných údajov máte nasledovné práva:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 pl-2">
              <li><strong className="text-slate-900">Právo na prístup</strong> k vašim osobným údajom a informáciám o ich spracúvaní.</li>
              <li><strong className="text-slate-900">Právo na opravu</strong> nesprávnych alebo neúplných údajov.</li>
              <li><strong className="text-slate-900">Právo na vymazanie</strong> (právo „na zabudnutie“), ak odpadol dôvod ich spracovania alebo ak odvoláte súhlas.</li>
              <li><strong className="text-slate-900">Právo na obmedzenie</strong> spracúvania vašich údajov.</li>
              <li><strong className="text-slate-900">Právo na prenosnosť</strong> údajov k inému prevádzkovateľovi.</li>
              <li><strong className="text-slate-900">Právo namietať</strong> proti spracúvaniu osobných údajov na základe oprávneného záujmu.</li>
              <li><strong className="text-slate-900">Právo podať sťažnosť</strong> na Úrad na ochranu osobných údajov SR.</li>
            </ul>
            <p className="mt-3">
              Svoje práva môžete uplatniť kedykoľvek zaslaním písomnej žiadosti alebo e-mailu na adresu <a href="mailto:info@controllo.sk" className="text-brand hover:underline font-bold">info@controllo.sk</a>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
