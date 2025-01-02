+++
date = '2025-01-01T16:27:25+01:00'
draft = false
title = 'Curriculum vitæ'
description = 'Curriculum vitæ for Mikkel Ricky Christensen'
# https://gohugo.io/content-management/menus/
[menus]
  [menus.main]
    weight = 20
+++

<section id="kontaktoplysninger">

Navn
: Mikkel Ricky Christensen

Adresse
: {{< address >}}

E-mailadresse
: <mikkel@mikkelricky.dk>

Telefonnummer
: [+45 2345 5632](tel:+4523455632)

Linkedin:
: <https://www.linkedin.com/in/mikkelricky>

</section>

## Erhvervserfaring

{{% experience %}}

{{% experience/item company="ITK Development" title="Programmør" start="2015-03-01" %}}

{{% /experience/item %}}

{{% experience/item company="DynamicWeb" company-url="<https://www.dynamicweb.dk/>" title="Udviklerevangelist"
    start="2012-05-01" end="2015-03-01" %}}

DynamicWeb udvikler eget CMS ([DynamicWeb CSM](https://www.dynamicweb.dk/produkter/web-content-management.aspx)) og
eCommerce-system ([DynamicWeb eCommerce](http://www.dynamicweb.dk/produkter/ecommerce.aspx)) som partnere bruger til at
implementere løsning for deres kunder. Min rolle som evangelist var at sparre med partnere og hjælpe dem til at bruge
DynamicWeb-systemet bedst muligt og lytte til hvilke ønsker der har til den fremtidige udvikling af systemet. En vigtig
del af mit arbejde var undervisning af partnere i både DynamicWeb og generelle webteknologier (fx responsivt design)

Jeg var en del af kerneudviklergruppen på DynamicWeb, men jeg tilstræbte at se produktet fra brugernes (partnernes) side
og forsøgte at forstå de udfordringer som de sidder med i deres hverdag. Dette er vigtigt fordi det ikke nytter noget at
lave et system som kun kan bruges af nørder.

{{% experience/item/highlights %}}

* Undervisning i frontend- og backend-programmering i [DynamicWeb](http://www.dynamicweb.dk/)
* Afholdelse af webinarer om diverse emner (se fx [Razor in Dynamicweb](https://vimeo.com/67800181), [Tech Talk -
  Razor](https://vimeo.com/76607846) og [How to easily create and maintain complex style
  sheets](https://vimeo.com/48951681))
* Implementering af responsiv udgave af [DynamicWeb USA's hjemmeside](https://dynamicwebusa.com/)

{{% /experience/item/highlights %}}

{{% /experience/item %}}

{{% experience/item company="Systime" company-url="<https://systime.dk/>" title="Systemudvikler og -designer"
    start="2008-10-01" end="2012-05-01" %}}

Systime er et dansk forlag der udgiver undervisningsmaterialer til hovedsageligt ungdomsuddannelser (gymnasium, hf,
mv.), men efterhånden også til folkeskolen og videregående uddannelser. En stor del af disse undervisningsmaterialer er
websites, kaldet [iBøger](https://ibog.dk), baseret på [TYPO3](https://typo3.org/).

{{% experience/item/highlights %}}

* Omfattende udvikling af både frontend- og backend-TYPO3-extensions som gør det muligt at administrere mere end 100
  TYPO3-installationer ud fra et fælles grundlag, men som samtidig gør det muligt at tilpasse det enkelte website efter
  individuelle behov. I samarbejde med en webgrafiker har jeg implementeret design i HTML og CSS.

  Eksempler på websites som jeg har været med til at udvikle den tekniske del af

  * [Psykologiens veje](/sites/ibog.psykologiensveje.systime.dk/index.html) – en iBog om psykologi
  * [plus.systime.dk](/sites/plus.systime.dk/index.php@id=572.html) – en iBog om matematik
  * [Verden i dansk perspektiv](/sites/verdenidanskperspektiv.systime.dk/index.html) – et website om historie

* Udtræk og konvertering af indhold i TYPO3 med henblik på at kunne levere CMS-indhold på andre platforme end
  internettet, fx som traditionel papirbog (via pdf) eller e-bog (fx [EPUB](https://da.wikipedia.org/wiki/EPUB)).
* Komplet reimplementering, forbedring og udvikling af en TYPO3-baseret udgave af e-nøgle-systemet (tidligere udviklet
  under ansættelse hos [Dansk Mediedesign](#dansk-mediedesign)). Herunder synkronisering af data mellem e-nøgle-systemet
  og internt CRM-system.

  * [Systimes e-nøgle-system (MinKonto)](/sites/konto.systime.dk/index.html)

* Implementering af butik baseret på open source-butikssystemet [Magento](https://www.magentocommerce.com/). Jeg har
  udviklet en række Magento-moduler der gør det muligt at sælge e-nøgler via Magento og giver frontend-brugere mulighed
  for at logge ind via deres [MinKonto](https://konto.systime.dk/)-login. Synkronisering af data mellem butik og interne
  CRM- og regnskabssystemer.

  * [Systimes online-butik](https://www.systime.dk/)

{{% /experience/item/highlights %}}

{{% /experience/item %}}

{{% experience/item company="GT3 (Gyldendal)" title="Systemudvikler og -designer"
    start="2007-07-01" end="2008-10-01" %}}

GT3 var en fælles udviklingsgruppe for en række forlag i
Gyldendal-gruppen. Udviklingsgruppen holdt til i Systimes
lokaler i Århus. Desværre kunne forlagene ikke finde fælles
fodslag for udviklingen og GT3 blev derfor nedlagt i
slutningen af 2008.

{{% experience/item/highlights %}}

* Design af XML-baseret platform til medieuafhængig publicering. Prototype implementeret i TYPO3.
* Design og implementering af TYPO3-baseret system, kaldet GQuiz, til redegering og afvikling af interaktive quizzer
  (test).

{{% /experience/item/highlights %}}

{{% /experience/item %}}

{{% experience/item company="Dansk Mediedesign" company-url="<http://www.danskmediedesign.dk/>"
    title="Systemudvikler og -designer" start="2004-10-01" end="2007-07-01" %}}

* Design og implementering af e-nøgle-systemet der bruges af [Systime](#systime) til distribution af online
  undervisningsmaterialer. E-nøgle-systemet er kort fortalt en central database der holder styr på online-udgivelser og
  brugere og hvilke brugere der har adgang til hvilke udgivelser.
* Implementering af webbutik for Forlaget Systime der sælger undervisningsmaterialer — både online via e-nøgle-systemet
  og som traditionelle papirbøger.
* Design og implementering af webservice der leverer e-bogs-metadata fra en central e-bogs-server til en række
  e-bogs-sælgere bl.a. [SAXO.com](https://www.saxo.com/). Servicen gør det muligt for en sælger at levere
  e-bøger til sine kunder via en central e-bogs-server ([Adobe
  Content Server](http://www.adobe.com/products/contentserver/)).

  * [Dokumentation af e-bogs-webservicen (på engelsk)](http://services.publizon.dk/retailer/)

* Implementering af TYPO3-baseret butiksløsning til [Aalborg Universitetsforlag](http://www.forlag.auc.dk/). Butikken
  anvender ovennævnte e-bogs-webservice til salg af e-bøger via en række specialudviklede frontend- og
  backend-extensions.
* Redesign og -implementering af e-nøgle-systemet i TYPO3 for forlagene under [Gyldendal Akademisk
  A/S](http://www.gyldendal-akademisk.dk/) (bl.a. [Munksgaard
  Danmark](http://www.gyldendal-akademisk.dk/MunksgaardDanmark.aspx))

  * [Munksgaard Danmarks e-nøgle-system](http://digital.munksgaarddanmark.dk/)

{{% /experience/item %}}

{{% experience/item company="CCI Europe" company-url="<https://www.ccieurope.com/>" title="Systemkonsulent"
    start="2003-01-01" end="2004-10-01" %}}

* Installation og vedligeholdelse af [CCI AdDesk
  Sales](http://www.ccieurope.com/Solutions/CCI-AdDesk/CCI-AdDesk-Sales.aspx) hos avishuse i Danmark, England og
  Tyskland.
* Teknisk uddannelse af brugere på dansk og engelsk
* Omfattende arbejde med generering af fakturaer og interne salgsrapporter via [Oracle
  Reports](http://www.oracle.com/technetwork/middleware/reports/overview/index.html)

{{% /experience/item %}}

{{% experience/item id="studenterprogrammør" company="Datalogisk Institut, Aarhus Universitet" company-url="<https://cs.au.dk/>"
    title="Studenterprogrammør" start="1998-06-01" end="2002-03-01" %}}

* Design og implementering af [&lt;bigwig&gt;], et højniveauprogrammeringssprog til udvikling af interaktive
  webapplikationer.

  * [Beskrivelse af &lt;bigwig&gt;](https://web.archive.org/web/20010616125551/https://www.brics.dk/bigwig/)

[&lt;bigwig&gt;]: https://web.archive.org/web/20010616125551/https://www.brics.dk/bigwig/

{{% /experience/item %}}

{{% /experience %}}

## Uddannelse

{{% education %}}

{{% education/item school="Datalogisk Institut, Aarhus Universitet" school-url="<https://cs.au.dk/>" title="Datalogi"
                   start="1995-09-01" end="2002-06-01" %}}

Jeg begyndte i 1995 at studere matematik og datalogi på [Datalogisk Institut](https://cs.au.dk/) ved Aarhus
Universitet. Det blev hurtigt klart at det var datalogien
der havde min største interesse og fokus blev derfor lagt på
dette.

I 1998 blev jeg ansat som [studenterprogrammør](#studenterprogrammør) ved Datalogisk Institut og deltog i design og
implementering af [&lt;bigwig&gt;]. I naturlig
forlængelse af dette arbejde skrev jeg speciale med titlen <cite>[Automatisk validering af webbaserede
formularer](/speciale.pdf)</cite> som bl.a. beskriver
[PowerForms] der var en vigtig del af
&lt;bigwig&gt;.

Jeg har altid interesseret mig for sprog og dette førte i 1999 til at jeg tog et par kurser på [Afdeling for
Lingvistik](https://aal.au.dk/lingvist/) for at udforske emnet i større detalje.

[PowerForms]: https://web.archive.org/web/20010616130509/http://www.brics.dk/bigwig/powerforms/

{{% /education/item %}}

{{% /education %}}

## Videnskabelige udgivelser

* Mit speciale, <cite>[Automatisk validering af webbaserede formularer](/speciale.pdf)</cite>, blev afleveret i maj 2002
  og succesfuldt forsvaret 18. juni 2002.
* Som optakt til mit speciale var jeg medforfatter på en artikel, <cite>[PowerForms: Declarative Client-side Form Field
  Validation](/powerform.pdf)</cite>, der i år 2000 blev udgivet i <cite>[World Wide Web, vol.&nbsp;3,
  no.&nbsp;4](https://www.springerlink.com/content/1386-145x/3/4/)</cite>.

## Andet

* I oktober 2011 holdt jeg i forbindelse med konferencen [Books In Browsers 2011](https://bib.archive.org/) en såkaldt
  [Ignite Talk](http://en.wikipedia.org/wiki/Ignite_(event)) hvor jeg kort præsenterede Systimes
  indholdspubliceringsplatform. Dette optrin blev foreviget på en video som kan nydes på <https://youtu.be/E9lmsrpXiEc>.
* Ceremonimester i [TÅGEKAMMERET](https://www.taagekammeret.dk/) 1997–1998. I min studietid skrev og opførte jeg
  sketcher og sange i 14 Tågekammerrevyer.
