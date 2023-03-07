import { Image } from '~/components/Image';

export default function Index() {
  return (
    <div className="flex h-full m-10 space-x-5 ">
      <div className="overflow-hidden basis-1/3 grow rounded-xl">
        <Image src="pizza.jpg" alt="Pizza" fit="cover" width={800} height={750} />
      </div>
      <div className="flex flex-col space-y-5 basis-2/3">
        <h1 className="flex justify-center text-3xl font-bold text-white">Pizza & Kebab</h1>
        <div className="flex flex-col space-y-2">
          <p>
            Vitajte v Pizza & Kebab, rodinnej reštaurácii, ktorá je zasvätená kvalite a autenticite. Sme hrdí na to, že
            náš príbeh siaha až do roku 2010, kedy sme sa rozhodli otvoriť prvú prevádzku v Púchove. Od tej chvíle sme
            sa zaviazali prinášať našim zákazníkom najlepšiu pizzu, ktorú sme pripravovali podľa rodinnej receptúry z
            mestečka Palma di Montechiaro, ktoré sa nachádza na juhu Sicílie.
          </p>
          <p>
            Naša jedinečná filozofia sa zakladá na poctivých talianskych surovinách a správnej technológii prípravy.
            Veríme, že keď používate kvalitné suroviny, môžete pripraviť fantastické jedlá. Snažíme sa poskytnúť našim
            zákazníkom nielen vynikajúcu chuť, ale aj skutočne autentický zážitok.
          </p>
          <p>
            Vo všetkých našich produktoch vynakladáme maximálne úsilie a dodávame štipku lásky pri každej príprave. Je
            to spôsob, ako sme sa stali najlepšou pizzériou v okolí a prečo sa k nám vracajú naši spokojní zákazníci.
          </p>
          <p>
            Máme pre vás skvelú správu! Okrem toho, že vás radi privítame v našej reštaurácii, máte tiež možnosť
            objednať si naše jedlá online. Využite náš jednoduchý online systém objednávok a objednajte si vaše obľúbené
            jedlo z pohodlia vášho domova. Naša rýchla a spoľahlivá služba doručenia zabezpečí, že vaše jedlo dorazí k
            vám čerstvé a horúce, ako keby ste ho mali pripraviť sami.
          </p>
          <p>
            Takže, ak hľadáte autentickú taliansku pizzu, prichádzajte navštíviť nás. Užite si jedinečnú chuť našich
            špecialít, vychutnajte si uvoľnenú atmosféru a pridajte sa k našej rodine spokojných zákazníkov. Tešíme sa
            na vašu návštevu!
          </p>
        </div>
      </div>
    </div>
  );
}
