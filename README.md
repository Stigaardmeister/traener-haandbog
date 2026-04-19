# Trænerhåndbog

En digital, redigerbar trænerhåndbog til klubben. Baseret på struktureret mentorordning, 30-60-90 dages plan og kulturintroduktion.

## Funktioner

- **Redigerbart indhold** — ansvarlige kan opdatere sektioner, tilføje nye og slette gamle
- **Klubidentitet** — upload logo, skift klubnavn, tilpas farver
- **Søgning** — find hurtigt det du leder efter på tværs af sektioner
- **Backup** — eksportér og importér hele håndbogen som JSON
- **Responsivt design** — virker på mobil, tablet og desktop

## Sådan kommer du i gang lokalt

Du skal have [Node.js](https://nodejs.org/) (version 20 eller højere) installeret.

```bash
# Installer afhængigheder
npm install

# Start udviklingsserver
npm run dev

# Byg til produktion
npm run build
```

Appen kører derefter på `http://localhost:5173`

---

## Deploy til GitHub Pages — trin for trin

### 1. Opret et GitHub-repo

1. Gå til [github.com](https://github.com) og log ind
2. Klik på **"New repository"** øverst til højre
3. Giv det et navn, f.eks. `traener-haandbog`
4. Vælg **Public** (kræves for gratis GitHub Pages)
5. Klik **"Create repository"**

### 2. Tilpas vite.config.js

Åbn `vite.config.js` og sæt `base` til navnet på dit repo:

```js
export default defineConfig({
  plugins: [react()],
  base: '/traener-haandbog/',   // <-- skift til dit repo-navn
})
```

Hvis dit repo hedder noget andet, f.eks. `klubhaandbog`, så skal der stå `/klubhaandbog/`.

> **Undtagelse:** Hvis repoet hedder `DITBRUGERNAVN.github.io` (et "user site"), så skal base være `'/'`.

### 3. Push koden til GitHub

Åbn en terminal i projektmappen og kør:

```bash
git init
git add .
git commit -m "Første version af trænerhåndbogen"
git branch -M main
git remote add origin https://github.com/DITBRUGERNAVN/traener-haandbog.git
git push -u origin main
```

Erstat `DITBRUGERNAVN` med dit GitHub-brugernavn.

### 4. Aktivér GitHub Pages

1. Gå til dit repo på GitHub
2. Klik **Settings** (øverst til højre)
3. I venstre menu: klik **Pages**
4. Under **Source**: vælg **"GitHub Actions"**

### 5. Vent på deploy

1. Gå til fanen **Actions** i dit repo
2. Du ser nu et workflow der hedder "Deploy til GitHub Pages" som kører
3. Efter 1-2 minutter er det grønt — og din håndbog er live
4. URL'en er: `https://DITBRUGERNAVN.github.io/traener-haandbog/`

### 6. Fremtidige opdateringer

Hver gang I pusher ændringer til `main`-branchen, deployer GitHub Actions automatisk. I skal ikke gøre noget manuelt.

```bash
git add .
git commit -m "Beskrivelse af ændring"
git push
```

---

## Brug af håndbogen

### For trænere (læseadgang)
- Naviger via menuen til venstre
- Søg i feltet øverst
- Alt indhold er altid opdateret — de ansvarlige vedligeholder løbende

### For ansvarlige (redigeringsadgang)

1. Klik **"Log ind som ansvarlig"** nederst i sidemenuen
2. Indtast adgangskoden — standardkoden er `traener2026`
3. **Skift koden med det samme** via "Klubidentitet og indstillinger"

Som ansvarlig kan du:
- Redigere eksisterende sektioner (blyant-ikonet ved hver sektion)
- Tilføje nye sektioner
- Slette sektioner
- Opdatere klubidentitet: logo, navn, farver
- Eksportere og importere backup

### Redigering med markdown

I redigeringsfeltet bruges simpel markdown:
```
# Stor overskrift
## Underoverskrift
- Punkt i liste
**fed tekst**
*kursiv tekst*
```

---

## Vigtigt om data og sikkerhed

**Data gemmes lokalt i browserens localStorage.** Det betyder:

✅ Virker uden server eller database
✅ Ingen løbende omkostninger
✅ Hurtig og enkel at sætte op

⚠️ Data er bundet til den enkelte browser — hvis I bruger forskellige enheder, ser I forskellige versioner
⚠️ Hvis nogen rydder cache, forsvinder lokale ændringer
⚠️ Adgangskoden er ikke kryptografisk sikker — den ligger i klientens kode

**Derfor:**

1. **Tag backup regelmæssigt** via "Eksportér som JSON" i indstillinger
2. **Gem backup-filen i klubbens fælles drev** (fx Google Drive, Dropbox)
3. **Del backup-filen** mellem ansvarlige så I arbejder på samme udgangspunkt
4. Når en ansvarlig opdaterer noget: eksportér → upload til fælles drev → andre importerer

### Vil I have ægte synkronisering på tværs af enheder?

Det kræver en backend (database + login). Nogle muligheder:

- **Firebase** — gratis i startperioden, relativt nemt
- **Supabase** — open source alternativ til Firebase
- **Netlify CMS eller Decap CMS** — redigér indholdet direkte via git commits

Giv besked hvis det bliver aktuelt — vi kan udvide løsningen.

---

## Filstruktur

```
traener-haandbog/
├── .github/workflows/deploy.yml  # Automatisk deploy
├── src/
│   ├── App.jsx                   # Hele applikationen
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Styling og fonts
├── index.html
├── package.json
├── vite.config.js                # VIGTIG: sæt base path her
├── tailwind.config.js
├── postcss.config.js
└── README.md                     # Denne fil
```

## Licens og tilpasning

Koden er jeres — tilpas den som I vil. God fornøjelse med håndbogen.
