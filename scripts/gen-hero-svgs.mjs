import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'heroes')
mkdirSync(dir, { recursive: true })

const heroes = [
  {
    file: 'cavalier-mbororo.svg',
    label: 'CAVALIER MBORORO',
    c0: '#6b4a1e',
    c1: '#3d2a14',
    c2: '#8a9a3a',
    accent: '#d4a017',
    mark: '🐎',
  },
  {
    file: 'prince-ewondo.svg',
    label: 'PRINCE EWONDO',
    c0: '#0a1f14',
    c1: '#143d28',
    c2: '#1a4d2e',
    accent: '#c9a227',
    mark: '👑',
  },
  {
    file: 'chasseresse-baka.svg',
    label: 'CHASSERESSE BAKA',
    c0: '#0c1f12',
    c1: '#1a3d24',
    c2: '#2d5a34',
    accent: '#c45c26',
    mark: '🏹',
  },
  {
    file: 'forgeron-tupuri.svg',
    label: 'FORGERON TUPURI',
    c0: '#1a0a05',
    c1: '#5c1f0a',
    c2: '#8b3a12',
    accent: '#e85d04',
    mark: '🔨',
  },
  {
    file: 'jouteur-sawa.svg',
    label: 'JOUTEUR SAWA',
    c0: '#041525',
    c1: '#0a3d5c',
    c2: '#0e7490',
    accent: '#f0e6d2',
    mark: '🌊',
  },
  {
    file: 'griot-peul.svg',
    label: 'GRIOT PEUL',
    c0: '#1c1408',
    c1: '#4a3720',
    c2: '#1e3a5f',
    accent: '#d4af37',
    mark: '🎶',
  },
  {
    file: 'fon-grassfields.svg',
    label: 'FON DES GRASSFIELDS',
    c0: '#0a0a0a',
    c1: '#3b0a14',
    c2: '#1a3a1a',
    accent: '#c9a227',
    mark: '👑',
  },
  {
    file: 'princesse-bamileke.svg',
    label: 'PRINCESSE BAMILÉKÉ',
    c0: '#1a0a14',
    c1: '#4a0e2e',
    c2: '#2d1b0e',
    accent: '#d4af37',
    mark: '👸',
  },
  {
    file: 'chasseur-bulu.svg',
    label: 'CHASSEUR BULU',
    c0: '#0d1f12',
    c1: '#1e3d24',
    c2: '#3d2a14',
    accent: '#c9a227',
    mark: '🏹',
  },
  {
    file: 'danseur-bakweri.svg',
    label: 'DANSEUR BAKWERI',
    c0: '#0a0a0a',
    c1: '#5c0a0a',
    c2: '#1a3a14',
    accent: '#ff6b35',
    mark: '🔥',
  },
]

for (const h of heroes) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${h.c0}"/>
      <stop offset="45%" stop-color="${h.c1}"/>
      <stop offset="100%" stop-color="${h.c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="${h.accent}" stop-opacity=".4"/>
      <stop offset="100%" stop-color="${h.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <rect width="800" height="1000" fill="url(#glow)"/>
  <ellipse cx="400" cy="930" rx="300" ry="70" fill="#000" opacity=".35"/>
  <path d="M280 860 Q400 920 520 860 L500 620 Q400 560 300 620 Z" fill="${h.c1}"/>
  <path d="M330 620 Q400 700 470 620 L455 420 Q400 360 345 420 Z" fill="${h.accent}" opacity=".9"/>
  <circle cx="400" cy="330" r="78" fill="${h.accent}"/>
  <circle cx="400" cy="330" r="62" fill="${h.c0}"/>
  <text x="400" y="360" text-anchor="middle" font-size="54">${h.mark}</text>
  <rect x="60" y="40" width="680" height="4" fill="${h.accent}" opacity=".55"/>
  <text x="400" y="960" text-anchor="middle" fill="#f5e6b8" font-family="Georgia, serif" font-size="26" letter-spacing="4">${h.label}</text>
</svg>`
  writeFileSync(join(dir, h.file), svg)
  console.log('wrote', h.file)
}
