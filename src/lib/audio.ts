export type Sfx =
  | 'click'
  | 'hit'
  | 'victory'
  | 'ambush'
  | 'evade'
  | 'ultimate'
  | 'enemy-patrouilleur'
  | 'enemy-milicien'

const cache: Partial<Record<Sfx | 'ambient', HTMLAudioElement>> = {}

const SRC: Record<Sfx, string> = {
  click: '/audio/click.wav',
  hit: '/audio/hit.wav',
  victory: '/audio/victory.wav',
  ambush: '/audio/ambush.wav',
  evade: '/audio/evade.wav',
  ultimate: '/audio/ultimate.wav',
  'enemy-patrouilleur': '/audio/enemy-patrouilleur.wav',
  'enemy-milicien': '/audio/enemy-milicien.wav',
}

const VOL: Record<Sfx, number> = {
  click: 0.35,
  hit: 0.55,
  victory: 0.55,
  ambush: 0.65,
  evade: 0.45,
  ultimate: 0.6,
  'enemy-patrouilleur': 0.58,
  'enemy-milicien': 0.6,
}

function getAudio(key: Sfx | 'ambient', src: string, loop = false) {
  if (!cache[key]) {
    const a = new Audio(src)
    a.preload = 'auto'
    a.loop = loop
    cache[key] = a
  }
  return cache[key]!
}

export function playSfx(type: Sfx, muted: boolean) {
  if (muted) return
  try {
    const a = getAudio(type, SRC[type])
    a.currentTime = 0
    a.volume = VOL[type]
    void a.play().catch(() => {})
  } catch {
    /* ignore */
  }
}

/** Enemy counter-attack SFX by archetype id */
export function playEnemySfx(enemyId: string, muted: boolean) {
  if (enemyId === 'milicien') playSfx('enemy-milicien', muted)
  else playSfx('enemy-patrouilleur', muted)
}

export function setAmbient(playing: boolean, muted: boolean) {
  try {
    const a = getAudio('ambient', '/audio/ambient.wav', true)
    a.volume = 0.22
    if (playing && !muted) {
      void a.play().catch(() => {})
    } else {
      a.pause()
    }
  } catch {
    /* ignore */
  }
}
