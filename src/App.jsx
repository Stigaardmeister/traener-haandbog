import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Users, Target, Heart, Edit3, Save, X, Plus, Trash2,
  Menu, Search, ChevronRight, Calendar, Phone, FileText,
  Lock, Unlock, Clock, Circle, Upload, Palette, Settings, Image as ImageIcon
} from 'lucide-react';

const STORAGE_KEY = 'handbook-data-v1';

export default function App() {
  const [activeSection, setActiveSection] = useState('velkommen');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [editBuffer, setEditBuffer] = useState({ title: '', content: '', icon: 'FileText' });
  const logoInputRef = useRef(null);

  // Klubidentitet — det nye
  const defaultIdentity = {
    clubName: 'Klubben',
    clubSubtitle: 'Trænerhåndbog',
    logo: null, // base64 billede
    primaryColor: '#b4783c',
    backgroundColor: '#f5f1ea',
    sidebarColor: '#ebe4d6',
    adminPassword: 'traener2026'
  };

  // Standard indhold
  const defaultContent = {
    velkommen: {
      title: 'Velkommen',
      icon: 'Heart',
      updated: new Date().toISOString().split('T')[0],
      content: `# Velkommen til klubben

Vi er glade for at have dig ombord. Denne håndbog er dit samlede opslagsværk — klubbens filosofi, metoder, rutiner og praktiske guides, altid opdateret og tilgængelig.

## De første 60 dage
Du får tildelt en **personlig mentor** — en erfaren træner der står til rådighed med ugentlige check-ins, faglig sparring og en klar plan for din overdragelse.

## Sådan bruger du håndbogen
- Brug søgefeltet øverst til at finde specifikke emner
- Naviger via menuen til venstre
- Alt indhold opdateres løbende af de ansvarlige
- Spørg din mentor hvis noget er uklart`
    },
    filosofi: {
      title: 'Klubbens filosofi',
      icon: 'Heart',
      updated: new Date().toISOString().split('T')[0],
      content: `# Vores DNA

## Grundværdier
Vi bygger på tre bærende principper der går igen i alt hvad vi gør — på banen og uden for.

**Udvikling før resultater.** Den langsigtede spillerudvikling kommer først. Sejre er konsekvensen, ikke målet.

**Fællesskab før individ.** Holdet løfter den enkelte. Vi dyrker en kultur hvor alle bidrager.

**Ærlighed før bekvemmelighed.** Vi giver feedback direkte og respektfuldt, også når det er svært.

## Træningsfilosofi
Vores tilgang er spillerorienteret og baseret på helhedsforståelse frem for isolerede øvelser. Træneren faciliterer — spillerne løser problemer.

## Adfærdskodeks
Både trænere og spillere repræsenterer klubben. Vi møder til tiden, er forberedte, og behandler modstandere, dommere og hinanden med respekt.`
    },
    plan306090: {
      title: '30-60-90 dages plan',
      icon: 'Target',
      updated: new Date().toISOString().split('T')[0],
      content: `# Din udviklingsplan

En tydelig plan med konkrete mål og milepæle. Du ved præcis hvad der forventes — og hvornår.

## Første 30 dage: Forstå
- Gennemgå håndbogen sammen med din mentor
- Deltag som observatør på andre træneres pas
- Lær spillernes navne, styrker og udviklingspunkter
- Introduktionsmøde med bestyrelse og frivillige
- Første 1:1 med hver spiller

**Milepæl uge 4:** Evalueringssamtale med mentor og sportschef.

## Dage 31-60: Anvend
- Lede egne træningspas under mentorens supervision
- Udarbejde sæsonplan for dit hold
- Afholde forældremøde
- Etablere rutiner for kampdag og kommunikation

**Milepæl uge 8:** Feedback fra spillere og mentor indsamles.

## Dage 61-90: Ejerskab
- Fuldt selvstændigt ansvar for hold og planlægning
- Bidrage til tværgående trænerforum
- Identificere dit eget udviklingsområde for næste kvartal
- Overdragelsesplan med mentor afsluttes

**Milepæl uge 12:** 90-dages evaluering — din plan for næste halvår aftales.`
    },
    mentor: {
      title: 'Mentorordning',
      icon: 'Users',
      updated: new Date().toISOString().split('T')[0],
      content: `# Din mentor

En erfaren træner tildeles som din personlige mentor de første 60 dage.

## Hvad kan du forvente
- **Ugentlige check-ins** på 30-45 minutter
- **Faglig sparring** om konkrete situationer og spillere
- **Observation og feedback** på dine træningspas
- **Klar overdragelsesplan** med aftalte milepæle

## Hvad forventes af dig
- Mød forberedt til check-ins med konkrete spørgsmål
- Vær åben for feedback — også den ubekvemme
- Tag noter og følg op på aftaler
- Spørg før du går i stå

## Eskalering
Hvis mentor-forholdet ikke fungerer, så sig det. Kontakt sportschef for ny matchning — det er helt legitimt og sker en gang imellem.`
    },
    metoder: {
      title: 'Metodebeskrivelser',
      icon: 'BookOpen',
      updated: new Date().toISOString().split('T')[0],
      content: `# Trænings- og kampmetoder

## Træningsstruktur
Et standard træningspas følger rammen: opvarmning (10 min) → teknisk fokus (20 min) → spilrelateret øvelse (25 min) → kampsituation (20 min) → afslutning og refleksion (10 min).

## Differentiering
Vi arbejder med niveaudeling inden for holdet. Spillerne grupperes løbende efter udviklingsbehov — ikke statisk efter færdighed.

## Feedback-principper
Giv feedback tæt på handlingen, konkret og handlingsorienteret. Undgå generelle vurderinger som "godt" eller "dårligt" — beskriv hvad der skete og hvad næste skridt er.

## Kampdag
Opvarmning starter 45 min før kampstart. Taktisk gennemgang sker dagen før — kampdagen er til fokus og energi, ikke til nye instruktioner.

## Skader
Alle skader dokumenteres i skadesloggen. Spillere må ikke spille videre på en mistænkt skade uden klarmelding.`
    },
    rutiner: {
      title: 'Administrative rutiner',
      icon: 'FileText',
      updated: new Date().toISOString().split('T')[0],
      content: `# Administration

## Månedlige opgaver
- Indberet træningsfremmøde senest den 5. i hver måned
- Opdater spillerlister ved til- og afgang
- Send månedsrapport til sportschef

## Kampadministration
- Holdopstilling indberettes senest 2 timer før kampstart
- Udfyld kamprapport inden for 24 timer
- Dommersedler afleveres/uploades samme dag

## Økonomi
- Bilag afleveres månedligt via klubbens system
- Udlæg over 500 kr skal forhåndsgodkendes af kassereren
- Kørselsregnskab indsendes kvartalsvis

## Kommunikation
- Holdbesked sendes via klubbens app — ikke private kanaler
- Forældrehenvendelser besvares inden for 48 timer
- Sager om spillerkonflikter går altid via sportschef`
    },
    kontakter: {
      title: 'Kontaktlister',
      icon: 'Phone',
      updated: new Date().toISOString().split('T')[0],
      content: `# Vigtige kontakter

## Daglig ledelse
**Sportschef** — ansvarlig for sportslig retning og træneransættelser
**Klubleder** — overordnet drift og bestyrelseskontakt
**Kasserer** — økonomi, udlæg og kontrakter

## Praktisk drift
**Materialeansvarlig** — bolde, udstyr, nøgler
**Baneansvarlig** — banefordeling, lys, vedligehold
**Eventkoordinator** — stævner, ture, arrangementer

## Sundhed og sikkerhed
**Fysioterapeut** — skader, genoptræning
**Førstehjælpsansvarlig** — kurser og udstyr

*Konkrete navne og telefonnumre vedligeholdes i den interne kontaktliste — kontakt sportschef for adgang.*`
    },
    kultur: {
      title: 'Kulturintroduktion',
      icon: 'Heart',
      updated: new Date().toISOString().split('T')[0],
      content: `# Bliv en del af fællesskabet

Udover de faglige rammer investerer vi i den sociale og kulturelle forankring. Du skal ikke bare kunne jobbet — du skal føle dig hjemme.

## Din introduktion
- **Officiel præsentation** for hele holdet og forældregruppen
- **Rundvisning** i klubhus, materialerum og faciliteter
- **Fællesspisning** med trænerteamet inden for de første 14 dage
- **Makkertræner** som uformelt kontaktpunkt — forskellig fra din mentor

## Tilbagevendende sociale rammer
- Månedligt trænermøde med fællesspisning
- Årlig trænertur
- Klubbens årsfest
- Uformelle kaffemøder på tværs af årgange

## Hvis du ikke føler dig set
Sig det. Vi er ikke altid gode nok til at inkludere nye — men vi vil gerne. Giv din mentor eller sportschef besked, så justerer vi.`
    }
  };

  const [content, setContent] = useState(defaultContent);
  const [identity, setIdentity] = useState(defaultIdentity);
  const [lastSaved, setLastSaved] = useState(null);

  // Indlæs fra localStorage ved start
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.content) setContent(data.content);
        if (data.identity) setIdentity({ ...defaultIdentity, ...data.identity });
        if (data.lastSaved) setLastSaved(data.lastSaved);
      }
    } catch (e) {
      console.error('Kunne ikke indlæse data', e);
    }
  }, []);

  const saveAll = (newContent, newIdentity) => {
    try {
      const now = new Date().toISOString();
      const data = {
        content: newContent || content,
        identity: newIdentity || identity,
        lastSaved: now
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(now);
      setSaveStatus('gemt lokalt');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (e) {
      setSaveStatus('fejl ved gem');
    }
  };

  const exportData = () => {
    const data = {
      content,
      identity: { ...identity, adminPassword: undefined }, // eksporter ikke password
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `handbook-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.content) setContent(data.content);
        if (data.identity) setIdentity(prev => ({ ...prev, ...data.identity }));
        saveAll(data.content, data.identity ? { ...identity, ...data.identity } : null);
        setSaveStatus('import lykkedes');
      } catch (err) {
        setSaveStatus('fejl i fil');
      }
    };
    reader.readAsText(file);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSaveStatus('logo max 2mb');
      setTimeout(() => setSaveStatus(''), 2000);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const newIdentity = { ...identity, logo: e.target.result };
      setIdentity(newIdentity);
      saveAll(null, newIdentity);
    };
    reader.readAsDataURL(file);
  };

  const updateIdentity = (field, value) => {
    const newIdentity = { ...identity, [field]: value };
    setIdentity(newIdentity);
    saveAll(null, newIdentity);
  };

  const handleEditStart = (key) => {
    setEditingSection(key);
    setEditBuffer({
      title: content[key].title,
      content: content[key].content,
      icon: content[key].icon || 'FileText'
    });
  };

  const handleEditSave = () => {
    const today = new Date().toISOString().split('T')[0];
    const newContent = {
      ...content,
      [editingSection]: {
        ...content[editingSection],
        title: editBuffer.title,
        content: editBuffer.content,
        icon: editBuffer.icon,
        updated: today
      }
    };
    setContent(newContent);
    saveAll(newContent, null);
    setEditingSection(null);
  };

  const handleDeleteSection = (key) => {
    if (Object.keys(content).length <= 1) return;
    const newContent = { ...content };
    delete newContent[key];
    setContent(newContent);
    saveAll(newContent, null);
    if (activeSection === key) {
      setActiveSection(Object.keys(newContent)[0]);
    }
  };

  const handleAddSection = () => {
    const key = 'sektion_' + Date.now();
    const today = new Date().toISOString().split('T')[0];
    const newContent = {
      ...content,
      [key]: {
        title: 'Ny sektion',
        icon: 'FileText',
        updated: today,
        content: '# Ny sektion\n\nSkriv indhold her...'
      }
    };
    setContent(newContent);
    saveAll(newContent, null);
    setActiveSection(key);
    handleEditStart(key);
  };

  const handleAdminUnlock = () => {
    if (adminCode === identity.adminPassword) {
      setIsAdmin(true);
      setShowAdminPrompt(false);
      setAdminCode('');
    } else {
      setAdminCode('');
      setSaveStatus('forkert kode');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const iconMap = { Heart, Users, Target, BookOpen, FileText, Phone, Calendar };
  const iconNames = Object.keys(iconMap);

  const renderIcon = (name, className = 'w-5 h-5') => {
    const Icon = iconMap[name] || FileText;
    return <Icon className={className} />;
  };

  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="space-y-2 my-4 ml-1">
            {listItems.map((item, i) => (
              <li key={i} className="flex gap-3 text-stone-700 leading-relaxed">
                <span style={{ color: identity.primaryColor }} className="mt-2 flex-shrink-0">
                  <Circle className="w-1.5 h-1.5 fill-current" />
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const formatInline = (text) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-stone-900">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic text-stone-600">$1</em>');
    };

    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={idx} className="font-serif text-4xl md:text-5xl font-light text-stone-900 mb-6 mt-2 leading-tight tracking-tight">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="font-serif text-2xl font-medium text-stone-900 mt-10 mb-4 flex items-baseline gap-3">
            <span className="w-8 h-px" style={{ background: identity.primaryColor }}></span>
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('- ')) {
        listItems.push(line.substring(2));
      } else if (line.trim() === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={idx} className="text-stone-700 leading-relaxed mb-4 text-[15px]"
             dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      }
    });
    flushList();
    return elements;
  };

  const filteredSections = Object.entries(content).filter(([key, section]) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return section.title.toLowerCase().includes(q) || section.content.toLowerCase().includes(q);
  });

  const currentSection = content[activeSection] || content[Object.keys(content)[0]];

  return (
    <div className="min-h-screen flex" style={{ background: identity.backgroundColor }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-stone-300/60 flex-shrink-0`}
        style={{ background: identity.sidebarColor }}
      >
        <div className="w-80 h-screen sticky top-0 flex flex-col">
          {/* Klubidentitet header */}
          <div className="p-6 border-b border-stone-300/60">
            <div className="flex items-center gap-3 mb-1">
              {identity.logo ? (
                <img
                  src={identity.logo}
                  alt="Klublogo"
                  className="w-10 h-10 object-contain rounded-sm"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{ background: identity.primaryColor }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium truncate">
                  {identity.clubName}
                </div>
                <div className="font-serif text-lg leading-tight text-stone-900 truncate">
                  {identity.clubSubtitle}
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-stone-300/60">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Søg i håndbogen..."
                className="w-full pl-9 pr-3 py-2 bg-white/60 border border-stone-300/60 rounded-sm text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
                style={{ '--tw-ring-color': identity.primaryColor }}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            {filteredSections.map(([key, section]) => {
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className="w-full text-left px-6 py-3 flex items-center gap-3 hover:bg-stone-900/5 transition-colors"
                  style={isActive ? {
                    background: `linear-gradient(90deg, ${identity.primaryColor}15, transparent)`,
                    borderLeft: `2px solid ${identity.primaryColor}`
                  } : {}}
                >
                  <span style={{ color: isActive ? identity.primaryColor : '#78716c' }}>
                    {renderIcon(section.icon, 'w-4 h-4')}
                  </span>
                  <span className={`text-sm flex-1 ${isActive ? 'text-stone-900 font-medium' : 'text-stone-600'}`}>
                    {section.title}
                  </span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" style={{ color: identity.primaryColor }} />}
                </button>
              );
            })}
          </nav>

          {/* Bund */}
          <div className="p-4 border-t border-stone-300/60 space-y-2">
            {isAdmin && (
              <>
                <button
                  onClick={handleAddSection}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-stone-900/5 rounded-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tilføj ny sektion
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-700 hover:bg-stone-900/5 rounded-sm transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Klubidentitet og indstillinger
                </button>
              </>
            )}
            {!isAdmin ? (
              <button
                onClick={() => setShowAdminPrompt(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Log ind som ansvarlig
              </button>
            ) : (
              <button
                onClick={() => { setIsAdmin(false); setEditingSection(null); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-colors hover:bg-stone-900/5"
                style={{ color: identity.primaryColor }}
              >
                <Unlock className="w-3.5 h-3.5" />
                Redigering aktiv — log ud
              </button>
            )}
            {lastSaved && (
              <div className="text-[10px] text-stone-400 px-3 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Sidst opdateret {new Date(lastSaved).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 handbook-bg relative paper-texture">
        <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-stone-300/40 px-8 py-4 flex items-center justify-between"
             style={{ background: `${identity.backgroundColor}d9` }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-stone-900/5 rounded-sm transition-colors"
          >
            <Menu className="w-4 h-4 text-stone-700" />
          </button>
          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className={`text-xs italic ${saveStatus.includes('fejl') || saveStatus.includes('forkert') ? 'text-red-700' : ''}`}
                    style={!saveStatus.includes('fejl') && !saveStatus.includes('forkert') ? { color: identity.primaryColor } : {}}>
                {saveStatus}
              </span>
            )}
            <div className="text-xs text-stone-500 font-serif italic">
              {currentSection && `Opdateret ${new Date(currentSection.updated).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })}`}
            </div>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-8 md:px-16 py-16 animate-slide-in" key={activeSection + (editingSection || '')}>
          {editingSection === activeSection ? (
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Titel</label>
                <input
                  type="text"
                  value={editBuffer.title}
                  onChange={(e) => setEditBuffer({ ...editBuffer, title: e.target.value })}
                  className="w-full font-serif text-3xl font-light text-stone-900 bg-transparent border-b-2 focus:outline-none pb-2"
                  style={{ borderColor: identity.primaryColor + '66' }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Ikon</label>
                <div className="flex gap-2 flex-wrap">
                  {iconNames.map(name => (
                    <button
                      key={name}
                      onClick={() => setEditBuffer({ ...editBuffer, icon: name })}
                      className={`p-2 rounded-sm border transition-colors ${editBuffer.icon === name ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 text-stone-600 hover:border-stone-500'}`}
                    >
                      {renderIcon(name, 'w-4 h-4')}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">
                  Indhold (markdown: # overskrift, ## underoverskrift, - punkt, **fed**)
                </label>
                <textarea
                  value={editBuffer.content}
                  onChange={(e) => setEditBuffer({ ...editBuffer, content: e.target.value })}
                  className="w-full h-[500px] p-4 bg-white/70 border border-stone-300 rounded-sm text-sm text-stone-800 font-mono leading-relaxed focus:outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleEditSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 text-sm hover:bg-stone-800 transition-colors rounded-sm"
                >
                  <Save className="w-4 h-4" />
                  Gem ændringer
                </button>
                <button
                  onClick={() => setEditingSection(null)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-stone-700 text-sm hover:bg-stone-900/5 transition-colors rounded-sm border border-stone-300"
                >
                  <X className="w-4 h-4" />
                  Annuller
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8">
                <span style={{ color: identity.primaryColor }}>{renderIcon(currentSection.icon, 'w-4 h-4')}</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
                  {currentSection.title}
                </span>
                <div className="flex-1 h-px bg-stone-300/60"></div>
                {isAdmin && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditStart(activeSection)}
                      className="p-1.5 hover:bg-stone-900/5 rounded-sm text-stone-500 hover:text-stone-800 transition-colors"
                      title="Rediger"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {Object.keys(content).length > 1 && (
                      <button
                        onClick={() => { if(confirm('Slet sektionen?')) handleDeleteSection(activeSection); }}
                        className="p-1.5 hover:bg-red-50 rounded-sm text-stone-500 hover:text-red-700 transition-colors"
                        title="Slet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>{renderMarkdown(currentSection.content)}</div>

              <div className="mt-20 pt-8 border-t border-stone-300/60 text-xs text-stone-500">
                <div className="font-serif italic">
                  Savner du noget i denne sektion? Sig det til en af de ansvarlige — håndbogen udvikler sig med os.
                </div>
              </div>
            </>
          )}
        </article>
      </main>

      {/* Admin prompt */}
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(40, 30, 20, 0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-stone-50 rounded-sm p-8 max-w-sm w-full shadow-2xl border border-stone-300">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5" style={{ color: identity.primaryColor }} />
              <h3 className="font-serif text-xl text-stone-900">Adgang for ansvarlige</h3>
            </div>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              Indtast adgangskode for at kunne redigere, tilføje og slette sektioner samt styre klubidentiteten.
            </p>
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminUnlock()}
              placeholder="Adgangskode"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm text-sm focus:outline-none mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => { setShowAdminPrompt(false); setAdminCode(''); }}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900"
              >
                Annuller
              </button>
              <button
                onClick={handleAdminUnlock}
                className="px-4 py-2 text-sm bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-sm"
              >
                Lås op
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal — klubidentitet */}
      {showSettings && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(40, 30, 20, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-stone-50 rounded-sm max-w-2xl w-full shadow-2xl border border-stone-300 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-stone-50 border-b border-stone-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5" style={{ color: identity.primaryColor }} />
                <h3 className="font-serif text-2xl text-stone-900">Klubidentitet</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-stone-200 rounded-sm">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Logo */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-3">Klublogo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 border border-stone-300 rounded-sm flex items-center justify-center bg-white overflow-hidden">
                    {identity.logo ? (
                      <img src={identity.logo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-stone-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm rounded-sm hover:bg-stone-800"
                    >
                      <Upload className="w-4 h-4" />
                      {identity.logo ? 'Udskift logo' : 'Upload logo'}
                    </button>
                    {identity.logo && (
                      <button
                        onClick={() => updateIdentity('logo', null)}
                        className="ml-2 text-xs text-stone-500 hover:text-red-700"
                      >
                        Fjern
                      </button>
                    )}
                    <p className="text-xs text-stone-500 mt-2">PNG, JPG eller SVG. Max 2 MB. Kvadratisk fungerer bedst.</p>
                  </div>
                </div>
              </div>

              {/* Navne */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Klubnavn</label>
                  <input
                    type="text"
                    value={identity.clubName}
                    onChange={(e) => updateIdentity('clubName', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Undertitel</label>
                  <input
                    type="text"
                    value={identity.clubSubtitle}
                    onChange={(e) => updateIdentity('clubSubtitle', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Farver */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-3">Farver</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">Primærfarve</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={identity.primaryColor}
                        onChange={(e) => updateIdentity('primaryColor', e.target.value)}
                        className="w-10 h-10 rounded-sm border border-stone-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={identity.primaryColor}
                        onChange={(e) => updateIdentity('primaryColor', e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-stone-300 rounded-sm text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">Baggrund</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={identity.backgroundColor}
                        onChange={(e) => updateIdentity('backgroundColor', e.target.value)}
                        className="w-10 h-10 rounded-sm border border-stone-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={identity.backgroundColor}
                        onChange={(e) => updateIdentity('backgroundColor', e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-stone-300 rounded-sm text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">Sidemenu</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={identity.sidebarColor}
                        onChange={(e) => updateIdentity('sidebarColor', e.target.value)}
                        className="w-10 h-10 rounded-sm border border-stone-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={identity.sidebarColor}
                        onChange={(e) => updateIdentity('sidebarColor', e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-stone-300 rounded-sm text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Adgangskode */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Adgangskode for ansvarlige</label>
                <input
                  type="text"
                  value={identity.adminPassword}
                  onChange={(e) => updateIdentity('adminPassword', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-sm text-sm font-mono focus:outline-none"
                />
                <p className="text-xs text-stone-500 mt-1">Obs: dette er klientside beskyttelse — ikke en sikker server-godkendelse.</p>
              </div>

              {/* Backup */}
              <div className="border-t border-stone-200 pt-6">
                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-3">Backup</label>
                <div className="flex gap-2">
                  <button
                    onClick={exportData}
                    className="px-4 py-2 bg-white border border-stone-300 text-sm rounded-sm hover:bg-stone-100"
                  >
                    Eksportér som JSON
                  </button>
                  <label className="px-4 py-2 bg-white border border-stone-300 text-sm rounded-sm hover:bg-stone-100 cursor-pointer">
                    Importér fra JSON
                    <input type="file" accept="application/json" onChange={importData} className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  Data gemmes i browserens lokale lager. Tag backup jævnligt — og del JSON-filen med andre ansvarlige for at synkronisere.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
