export type Hero = {
  id: number
  region: string
  regionCode: string
  name: string
  nameEn: string
  archetype: string
  tagline: string
  taglineEn: string
  signature: string
  signatureEn: string
  power: string
  powerEn: string
  weapon: string
  special: string
  palette: {
    from: string
    via: string
    to: string
    accent: string
  }
  decor: string
  icon: string
  /** Portrait art in public/heroes/{slug}.png */
  image: string
  quest: {
    title: string
    desc: string
    hint: string
    correct: string
  }
}

export const heroes: Hero[] = [
  {
    id: 0,
    region: 'Adamaoua',
    regionCode: 'AD',
    name: 'Cavalier Mbororo',
    nameEn: 'Mbororo Rider',
    archetype: 'Cavalier / éclaireur / nomade',
    tagline: 'Mobilité et pistes sacrées',
    taglineEn: 'Mobility and sacred trails',
    signature: 'Celui qui connaît le chemin.',
    signatureEn: 'The one who knows the path.',
    power: 'Vision de l’Aigle',
    powerEn: "Eagle's Sight",
    weapon: 'Lance légère & flûte',
    special: 'GALOP DES PISTES',
    palette: { from: '#3d2a14', via: '#6b4a1e', to: '#8a9a3a', accent: '#d4a017' },
    decor: 'savane',
    icon: '🐎',
    image: '/heroes/cavalier-mbororo.png',
    quest: {
      title: 'Les Pistes de l’Adamaoua',
      desc: 'Quel titre porte le chef traditionnel régnant sur un Lamidat dans le Nord ?',
      hint: 'Indice : Le L_m_d_ .',
      correct: 'lamido',
    },
  },
  {
    id: 1,
    region: 'Centre',
    regionCode: 'CE',
    name: 'Prince Ewondo',
    nameEn: 'Ewondo Prince',
    archetype: 'Prince / sage / gardien de la mémoire',
    tagline: 'Mémoire et lignée',
    taglineEn: 'Memory and lineage',
    signature: 'La mémoire guide ceux qui viennent après.',
    signatureEn: 'Memory guides those who come after.',
    power: 'Fragments de Mémoire',
    powerEn: 'Memory Fragments',
    weapon: 'Bâton cérémoniel',
    special: 'ÉCHO DES ANCÊTRES',
    palette: { from: '#0a1f14', via: '#143d28', to: '#1a4d2e', accent: '#c9a227' },
    decor: 'foret',
    icon: '👑',
    image: '/heroes/prince-ewondo.png',
    quest: {
      title: 'Le Serment de la Forêt',
      desc: 'Quel est le nom du célèbre chef Beti résistant exécuté à Yaoundé en 1914 ?',
      hint: 'Indice : Martin-Paul S_mb_ .',
      correct: 'samba',
    },
  },
  {
    id: 2,
    region: 'Est',
    regionCode: 'ES',
    name: 'Chasseresse Baka',
    nameEn: 'Baka Huntress',
    archetype: 'Chasseresse / pisteuse / gardienne de la forêt',
    tagline: 'Esprit de la forêt',
    taglineEn: 'Spirit of the forest',
    signature: 'La forêt ne révèle ses secrets qu’à ceux qui savent l’écouter.',
    signatureEn: 'The forest only reveals its secrets to those who listen.',
    power: 'Esprit de la Forêt',
    powerEn: 'Forest Spirit',
    weapon: 'Arc traditionnel',
    special: 'FLÈCHE FANTÔME',
    palette: { from: '#0c1f12', via: '#1a3d24', to: '#2d5a34', accent: '#c45c26' },
    decor: 'foret-dense',
    icon: '🏹',
    image: '/heroes/chasseresse-baka.png',
    quest: {
      title: 'La Pharmacopée Sacrée',
      desc: 'Comment appelle-t-on le grand esprit de la forêt célébré par les rituels Baka ?',
      hint: 'Indice : J_ng_ .',
      correct: 'jengi',
    },
  },
  {
    id: 3,
    region: 'Extrême-Nord',
    regionCode: 'EN',
    name: 'Forgeron Tupuri',
    nameEn: 'Tupuri Blacksmith',
    archetype: 'Forgeron / artisan / maître du métal',
    tagline: 'Feu et bronze',
    taglineEn: 'Fire and bronze',
    signature: 'Du feu naît la force.',
    signatureEn: 'From fire, strength is born.',
    power: 'Le métal se souvient du feu',
    powerEn: 'Metal remembers the fire',
    weapon: 'Marteau de forge',
    special: 'ÉTINCELLES SACRÉES',
    palette: { from: '#1a0a05', via: '#5c1f0a', to: '#8b3a12', accent: '#e85d04' },
    decor: 'forge',
    icon: '🔨',
    image: '/heroes/forgeron-tupuri.png',
    quest: {
      title: 'Le Rythme du Gourna',
      desc: 'Quelle plante agricole sacrée du Sahel est célébrée chez les Tupuri ?',
      hint: 'Indice : Le M_ll_t .',
      correct: 'millet',
    },
  },
  {
    id: 4,
    region: 'Littoral',
    regionCode: 'LT',
    name: 'Mami Wata',
    nameEn: 'Mami Wata',
    archetype: 'Égérie / esprit des eaux / gardienne Sawa',
    tagline: 'L’âme du Wouri',
    taglineEn: 'Soul of the Wouri',
    signature: 'Celle qui danse avec les eaux.',
    signatureEn: 'She who dances with the waters.',
    power: 'Cercle du Wouri',
    powerEn: 'Wouri Circle',
    weapon: 'Perles & courant sacré',
    special: 'MARÉE MYSTIQUE',
    palette: { from: '#041525', via: '#0a3d5c', to: '#0e7490', accent: '#f0e6d2' },
    decor: 'estuaire',
    icon: '🌊',
    image: '/heroes/mami-wata.png',
    quest: {
      title: 'Le Pacte de l’Estuaire',
      desc: 'Quel roi Duala s’est opposé fermement aux expropriations foncières en 1914 ?',
      hint: 'Indice : King B_ll .',
      correct: 'bell',
    },
  },
  {
    id: 5,
    region: 'Nord',
    regionCode: 'NO',
    name: 'Griot Peul',
    nameEn: 'Fulani Griot',
    archetype: 'Griot / musicien / gardien de la parole',
    tagline: 'La parole vivante',
    taglineEn: 'Living word',
    signature: 'Tant que quelqu’un raconte, rien ne disparaît.',
    signatureEn: 'As long as someone tells, nothing disappears.',
    power: 'Histoires Visibles',
    powerEn: 'Visible Stories',
    weapon: 'Instrument & voix',
    special: 'CHANT DES ANCÊTRES',
    palette: { from: '#1c1408', via: '#4a3720', to: '#1e3a5f', accent: '#d4af37' },
    decor: 'sahel',
    icon: '🎶',
    image: '/heroes/griot-peul.png',
    quest: {
      title: 'Les Cavaliers du Lamidat',
      desc: 'Quel titre porte le chef traditionnel régnant sur un Lamidat dans le Nord ?',
      hint: 'Indice : Le L_m_d_ .',
      correct: 'lamido',
    },
  },
  {
    id: 6,
    region: 'Nord-Ouest',
    regionCode: 'NW',
    name: 'Fon des Grassfields',
    nameEn: 'Grassfields Fon',
    archetype: 'Fon / souverain / gardien de chefferie',
    tagline: 'Autorité des collines',
    taglineEn: 'Authority of the hills',
    signature: 'Un peuple se tient derrière celui qui le guide.',
    signatureEn: 'A people stand behind the one who leads them.',
    power: 'Esprits Protecteurs',
    powerEn: 'Guardian Spirits',
    weapon: 'Bâton royal',
    special: 'DÉCRET DU FON',
    palette: { from: '#0a0a0a', via: '#3b0a14', to: '#1a3a1a', accent: '#c9a227' },
    decor: 'grassfields',
    icon: '👑',
    image: '/heroes/fon-grassfields.png',
    quest: {
      title: 'Les Fortifications de l’Ouest',
      desc: 'Quel souverain traditionnel désigne le chef spirituel suprême chez les Bamiléké / Grassfields ?',
      hint: 'Indice : Le F_n .',
      correct: 'fon',
    },
  },
  {
    id: 7,
    region: 'Ouest',
    regionCode: 'OU',
    name: 'Princesse Bamiléké',
    nameEn: 'Bamileke Princess',
    archetype: 'Princesse / diplomate / sage',
    tagline: 'Sagesse des chefferies',
    taglineEn: 'Wisdom of the chiefdoms',
    signature: 'La vraie puissance n’a pas besoin de crier.',
    signatureEn: 'True power need not shout.',
    power: 'Réseau de Perles',
    powerEn: 'Pearl Network',
    weapon: 'Épée Ndop Sacrée',
    special: 'DÉCRET ROYAL',
    palette: { from: '#1a0a14', via: '#4a0e2e', to: '#2d1b0e', accent: '#d4af37' },
    decor: 'chefferie',
    icon: '👸',
    image: '/heroes/princesse-bamileke.png',
    quest: {
      title: 'Les Fortifications de l’Ouest',
      desc: 'Quel souverain traditionnel désigne le chef spirituel suprême chez les Bamiléké ?',
      hint: 'Indice : Le F_n .',
      correct: 'fon',
    },
  },
  {
    id: 8,
    region: 'Sud',
    regionCode: 'SU',
    name: 'Chasseur Bulu',
    nameEn: 'Bulu Hunter',
    archetype: 'Chasseur / pisteur',
    tagline: 'Agilité et instinct',
    taglineEn: 'Agility and instinct',
    signature: 'La forêt laisse toujours une trace.',
    signatureEn: 'The forest always leaves a trail.',
    power: 'Instinct',
    powerEn: 'Instinct',
    weapon: 'Arc & machette',
    special: 'PISTE INVISIBLE',
    palette: { from: '#0d1f12', via: '#1e3d24', to: '#3d2a14', accent: '#c9a227' },
    decor: 'foret-sud',
    icon: '🏹',
    image: '/heroes/chasseur-bulu.png',
    quest: {
      title: 'Les Secrets de Ngog Lituba',
      desc: 'En décembre 1915, un leader de la résistance utilise un pseudonyme. Quel est le nom de famille de ce chef ?',
      hint: 'Indice : ab_n_ .',
      correct: 'abena',
    },
  },
  {
    id: 9,
    region: 'Sud-Ouest',
    regionCode: 'SW',
    name: 'Danseur Bakweri',
    nameEn: 'Bakweri Dancer',
    archetype: 'Danseur / ritualiste / gardien du volcan',
    tagline: 'Rythme du Fako',
    taglineEn: 'Rhythm of Fako',
    signature: 'Lorsque la terre danse, les ancêtres répondent.',
    signatureEn: 'When the earth dances, the ancestors answer.',
    power: 'Rythme Volcanique',
    powerEn: 'Volcanic Rhythm',
    weapon: 'Danse & braises',
    special: 'ÉRUPTION RITUELLE',
    palette: { from: '#0a0a0a', via: '#5c0a0a', to: '#1a3a14', accent: '#ff6b35' },
    decor: 'volcan',
    icon: '🔥',
    image: '/heroes/danseur-bakweri.png',
    quest: {
      title: 'La Colère du Mont Fako',
      desc: 'Comment la population locale appelle-t-elle l’esprit du Mont Cameroun ?',
      hint: 'Indice : Ef_s_m_t_ .',
      correct: 'efasamoto',
    },
  },
]

export const introFilm = [
  {
    act: "ACTE I : L'ORAGE DE JANVIER 1916",
    actEn: 'ACT I: THE STORM OF JANUARY 1916',
    title: 'Les Secrets de Ngog Lituba',
    titleEn: 'The Secrets of Ngog Lituba',
    desc: 'La nuit avale la cime des arbres sacrés. Au loin, le bruit mécanique des troupes coloniales déchire le silence de la forêt. Le conseil des anciens grave les derniers mots de la résistance sur l’écorce.',
    descEn: 'Night swallows the crowns of sacred trees. Far away, the mechanical roar of colonial troops tears the forest silence. The council of elders carves the last words of resistance into bark.',
    patois: 'Hegle le nwet a nti mu liyee...',
    trans: 'Le fardeau sacré de la terre et de la mémoire repose sur tes épaules désormais...',
    transEn: 'The sacred burden of land and memory now rests on your shoulders...',
    visual: 'from-stone-900 via-slate-950 to-emerald-950',
    still: '/intro/acte1.png',
  },
  {
    act: "ACTE II : L'INSURRECTION DES 10 CLANS",
    actEn: 'ACT II: THE RISING OF THE 10 CLANS',
    title: 'Le Serment de Sang',
    titleEn: 'The Blood Oath',
    desc: 'De l’estuaire du Wouri aux savanes du Nord, en passant par les collines fortifiées de l’Ouest, les 10 gardiens paritaires se lèvent en secret. L’histoire officielle a voulu les oublier, mais leur force se réveille en toi.',
    descEn: 'From the Wouri estuary to the northern savannas, through the fortified western hills, the 10 parity guardians rise in secret. Official history tried to forget them — their force awakens in you.',
    patois: 'Mpodol a nti mu nkondol...',
    trans: 'Le guide ne plie pas le genou face à l’orage, il devient l’orage.',
    transEn: 'The guide does not kneel before the storm — he becomes the storm.',
    visual: 'from-red-950/80 via-slate-950 to-stone-950',
    still: '/intro/acte2.png',
  },
  {
    act: 'ACTE III : TON AVENTURE COMMENCE',
    actEn: 'ACT III: YOUR JOURNEY BEGINS',
    title: 'L’Héritier de la Lignée',
    titleEn: 'Heir of the Lineage',
    desc: 'Choisis ton héros, infiltre les lignes ennemies, parle aux éclaireurs cachés dans le Mboa, résous les quêtes culturelles et rebâtis les grandes chefferies. Prépare ton armure, gardien.',
    descEn: 'Choose your hero, infiltrate enemy lines, speak to scouts hidden in the Mboa, solve cultural quests and rebuild the great chiefdoms. Prepare your armor, guardian.',
    patois: 'Zamba a nti mu njel...',
    trans: 'Les ancêtres ouvrent la voie. Avance sans trembler.',
    transEn: 'The ancestors open the path. Walk without trembling.',
    visual: 'from-amber-950/70 via-slate-950 to-emerald-950',
    still: '/intro/acte3.png',
  },
]

export type EnemyArchetype = {
  id: string
  name: string
  nameEn: string
  hpMax: number
  attack: number
  image: string
}

export const enemies: EnemyArchetype[] = [
  {
    id: 'patrouilleur',
    name: 'Patrouilleur Colonial',
    nameEn: 'Colonial Patrol',
    hpMax: 85,
    attack: 12,
    image: '/enemies/patrouilleur.png',
  },
  {
    id: 'milicien',
    name: 'Milicien de Ligne',
    nameEn: 'Line Militiaman',
    hpMax: 105,
    attack: 15,
    image: '/enemies/milicien.png',
  },
]
