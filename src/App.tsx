import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HeroSelect } from './components/HeroSelect'
import { IntroMovie } from './components/IntroMovie'
import { LanguageSelect } from './components/LanguageSelect'
import { OpenWorld } from './components/OpenWorld'
import {
  AlbumScreen,
  BoutiqueScreen,
  CombatScreen,
  MissionsScreen,
} from './components/SideScreens'
import { enemies, heroes, introFilm, type EnemyArchetype } from './data/heroes'
import { playEnemySfx, playSfx, setAmbient } from './lib/audio'

type Step =
  | 'language_select'
  | 'intro_movie'
  | 'hero_select'
  | 'open_world'
  | 'combat'
  | 'missions'
  | 'boutique'
  | 'album'

const shopItems = [
  {
    id: 1,
    name: 'Lance Bassa Électrifiée',
    price: 140,
    dmg: 45,
    desc: 'La puissance de la foudre combinée au bois sacré.',
  },
  {
    id: 2,
    name: 'Fusil Colonial Saboté',
    price: 80,
    dmg: 32,
    desc: 'Arraché à l’ennemi et recalibré par la résistance.',
  },
]

const npcs = [
  {
    id: 'elder',
    name: 'Ancien Um',
    x: 160,
    y: 140,
    token: '/tokens/npc-elder.png',
    message:
      'La brousse est vaste, mais la mémoire est éternelle. Explore le Nord ou le Littoral avec tes touches clavier.',
  },
  {
    id: 'blacksmith',
    name: 'Forgeron Kamga',
    x: 550,
    y: 380,
    token: '/tokens/npc-blacksmith.png',
    message:
      'Récupère des coupons en écrasant les patrouilles coloniales pour forger mes lances foudroyantes.',
  },
  {
    id: 'scout',
    name: 'Éclaireur Tako',
    x: 320,
    y: 460,
    token: '/tokens/npc-scout.png',
    message: 'Si ta santé faiblit sous l’assaut, utilise le bouton Fuir pour sauver tes coupons.',
  },
]

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [lang, setLang] = useState<'FR' | 'EN'>(
    () => (localStorage.getItem('al_lang') as 'FR' | 'EN') || 'FR',
  )
  const [step, setStepRaw] = useState<Step>('language_select')
  const [transitioning, setTransitioning] = useState(false)
  const [ambush, setAmbush] = useState(false)
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem('al_name') || "GARDIEN D'ALUCI",
  )
  const [xp, setXp] = useState(() => Number(localStorage.getItem('al_pro_xp')) || 0)
  const [coupons, setCoupons] = useState(
    () => Number(localStorage.getItem('al_pro_coupons')) || 150,
  )
  const [selectedHero, setSelectedHero] = useState(
    () => Number(localStorage.getItem('al_hero')) || 8,
  )
  const [muted, setMuted] = useState(false)
  const [questAnswers, setQuestAnswers] = useState<Record<number, string>>({})
  const [questStatuses, setQuestStatuses] = useState<Record<number, string>>({})
  const [completedQuests, setCompletedQuests] = useState<Record<number, boolean>>(() =>
    readJson('al_quests_done', {}),
  )
  const [inventory, setInventory] = useState<string[]>(() =>
    readJson('al_inventory', ["Potion d'Écorce Sacrée"]),
  )
  const [worldItems, setWorldItems] = useState([
    {
      id: 'i1',
      name: 'Remède de Matomb',
      x: 150,
      y: 250,
      token: '/tokens/loot-herb.png',
      collected: false,
    },
    {
      id: 'i2',
      name: 'Amulette de Nyong',
      x: 600,
      y: 150,
      token: '/tokens/loot-amulet.png',
      collected: false,
    },
    {
      id: 'i3',
      name: 'Racine de Babimbi',
      x: 400,
      y: 450,
      token: '/tokens/loot-root.png',
      collected: false,
    },
  ])
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 200 })
  const [isMoving, setIsMoving] = useState(false)
  const [currentRegion, setCurrentRegion] = useState('Centre & Est (Forêts Sacrées)')
  const [activeNpcMessage, setActiveNpcMessage] = useState<{
    name: string
    text: string
  } | null>(null)
  const [screenShake, setScreenShake] = useState(false)
  const [damageFlash, setDamageFlash] = useState<string | null>(null)
  const [playerHp, setPlayerHp] = useState(100)
  const [enemyHp, setEnemyHp] = useState(100)
  const [enemyType, setEnemyType] = useState<EnemyArchetype>(enemies[0])
  const [combatLog, setCombatLog] = useState<string[]>([])
  const [mysticShield, setMysticShield] = useState(false)
  const [rage, setRage] = useState(0)
  const [movieScene, setMovieScene] = useState(0)
  const [cinemaFade, setCinemaFade] = useState(true)
  const [equippedWeapon, setEquippedWeapon] = useState({ name: 'Lance Initiale', dmg: 15 })
  const transitionTimer = useRef<number | null>(null)

  const currentHero = heroes[selectedHero] ?? heroes[0]

  const setStep = useCallback((next: Step) => {
    setTransitioning(true)
    if (transitionTimer.current) window.clearTimeout(transitionTimer.current)
    transitionTimer.current = window.setTimeout(() => {
      setStepRaw(next)
      setTransitioning(false)
    }, 280)
  }, [])

  const playSound = useCallback((type: string): void => {
    const allowed = [
      'click',
      'hit',
      'victory',
      'ambush',
      'evade',
      'ultimate',
      'enemy-patrouilleur',
      'enemy-milicien',
    ] as const
    if ((allowed as readonly string[]).includes(type)) {
      playSfx(type as (typeof allowed)[number], muted)
    }
  }, [muted]) as (type: string) => void

  useEffect(() => {
    localStorage.setItem('al_lang', lang)
    localStorage.setItem('al_pro_xp', String(xp))
    localStorage.setItem('al_pro_coupons', String(coupons))
    localStorage.setItem('al_quests_done', JSON.stringify(completedQuests))
    localStorage.setItem('al_inventory', JSON.stringify(inventory))
    localStorage.setItem('al_name', playerName)
    localStorage.setItem('al_hero', String(selectedHero))
  }, [lang, xp, coupons, completedQuests, inventory, playerName, selectedHero])

  useEffect(() => {
    const shouldPlay =
      step === 'open_world' || step === 'intro_movie' || step === 'hero_select'
    setAmbient(shouldPlay, muted)
  }, [step, muted])

  useEffect(() => {
    const respawn = setInterval(() => {
      setWorldItems((prev) =>
        prev.map((item) =>
          item.collected
            ? {
                ...item,
                collected: false,
                x: Math.floor(Math.random() * 700) + 60,
                y: Math.floor(Math.random() * 400) + 60,
              }
            : item,
        ),
      )
    }, 20000)
    return () => clearInterval(respawn)
  }, [])

  const beginCombat = useCallback(
    (chosen: EnemyArchetype) => {
      setAmbush(true)
      setScreenShake(true)
      playSfx('ambush', muted)
      window.setTimeout(() => setScreenShake(false), 250)
      window.setTimeout(() => {
        setEnemyType(chosen)
        setPlayerHp(100)
        setEnemyHp(chosen.hpMax)
        setRage(15)
        setCombatLog([])
        setMysticShield(false)
        setAmbush(false)
        setStep('combat')
      }, 1100)
    },
    [muted, setStep],
  )

  const nextMovieScene = () => {
    playSound('click')
    setCinemaFade(false)
    window.setTimeout(() => {
      if (movieScene < introFilm.length - 1) {
        setMovieScene((s) => s + 1)
        setCinemaFade(true)
      } else {
        setStep('hero_select')
      }
    }, 300)
  }

  const movePlayer = useCallback(
    (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
      if (ambush) return
      setIsMoving(true)
      window.setTimeout(() => setIsMoving(false), 80)
      const speed = 18
      setPlayerPos((pos) => {
        let nextX = pos.x
        let nextY = pos.y
        if (direction === 'UP') nextY = Math.max(20, pos.y - speed)
        if (direction === 'DOWN') nextY = Math.min(560, pos.y + speed)
        if (direction === 'LEFT') nextX = Math.max(20, pos.x - speed)
        if (direction === 'RIGHT') nextX = Math.min(860, pos.x + speed)

        if (nextY < 180) setCurrentRegion('Grand Nord (Régions Sahéliennes)')
        else if (nextX < 320) setCurrentRegion('Littoral (Zone Côtière Sawa)')
        else setCurrentRegion('Centre & Est (Forêts Sacrées)')

        setWorldItems((prev) =>
          prev.map((item) => {
            if (item.collected) return item
            const dist = Math.hypot(nextX - item.x, nextY - item.y)
            if (dist < 28) {
              setInventory((inv) => [...inv, item.name])
              playSound('victory')
              return { ...item, collected: true }
            }
            return item
          }),
        )

        let near = false
        npcs.forEach((npc) => {
          const distance = Math.hypot(nextX - npc.x, nextY - npc.y)
          if (distance < 28) {
            setActiveNpcMessage({ name: npc.name, text: npc.message })
            near = true
          }
        })
        if (!near) setActiveNpcMessage(null)

        if (!near && Math.random() < 0.045) {
          const chosen = enemies[Math.floor(Math.random() * enemies.length)]
          beginCombat(chosen)
        }

        return { x: nextX, y: nextY }
      })
    },
    [ambush, beginCombat, playSound],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step !== 'open_world') return
      const key = e.key.toLowerCase()
      if (['arrowup', 'z', 'w'].includes(key)) movePlayer('UP')
      if (['arrowdown', 's'].includes(key)) movePlayer('DOWN')
      if (['arrowleft', 'q', 'a'].includes(key)) movePlayer('LEFT')
      if (['arrowright', 'd'].includes(key)) movePlayer('RIGHT')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, movePlayer])

  const handleActionCombat = (actionType: 'ATTACK' | 'EVADE' | 'ULTIMATE' | 'FLEE') => {
    if (enemyHp <= 0 || playerHp <= 0) return
    const logLines: string[] = []

    if (actionType === 'FLEE') {
      if (Math.random() < 0.5) {
        setCoupons((c) => Math.max(0, c - 10))
        setStep('open_world')
        return
      }
      logLines.push('Fuite échouée — la patrouille bloque le passage.')
    }

    let nextEnemyHp = enemyHp
    let nextPlayerHp = playerHp
    let shield = mysticShield

    if (actionType === 'ATTACK') {
      const dmg = Math.floor(Math.random() * 10) + equippedWeapon.dmg
      nextEnemyHp = Math.max(0, enemyHp - dmg)
      setEnemyHp(nextEnemyHp)
      setRage((r) => Math.min(100, r + 20))
      setDamageFlash('enemy')
      window.setTimeout(() => setDamageFlash(null), 180)
      logLines.push(`Impact — ${dmg} dégâts.`)
      playSound('hit')
    } else if (actionType === 'EVADE') {
      shield = true
      setMysticShield(true)
      logLines.push('Posture défensive adoptée.')
      playSound('evade')
    } else if (actionType === 'ULTIMATE' && rage >= 100) {
      const dmg = Math.floor(equippedWeapon.dmg * 2.5)
      nextEnemyHp = Math.max(0, enemyHp - dmg)
      setEnemyHp(nextEnemyHp)
      setRage(0)
      setDamageFlash('enemy')
      window.setTimeout(() => setDamageFlash(null), 220)
      logLines.push(`${currentHero.special} — ${dmg} dégâts critiques.`)
      playSound('ultimate')
    }

    if (nextEnemyHp <= 0) {
      setXp((x) => x + 50)
      setCoupons((c) => c + 40)
      setCombatLog((prev) => [
        'Patrouille écrasée (+50 XP / +40 Coupons)',
        ...logLines,
        ...prev,
      ])
      playSound('victory')
      return
    }

    let enemyDmg = Math.floor(Math.random() * enemyType.attack) + 4
    if (actionType !== 'FLEE' || logLines.length > 0) {
      if (shield) {
        enemyDmg = 0
        setMysticShield(false)
        logLines.push('Esquive parfaite.')
        playSound('evade')
      } else {
        nextPlayerHp = Math.max(0, playerHp - enemyDmg)
        setPlayerHp(nextPlayerHp)
        setDamageFlash('player')
        window.setTimeout(() => setDamageFlash(null), 180)
        logLines.push(`${enemyType.name} riposte — ${enemyDmg} PV.`)
        playEnemySfx(enemyType.id, muted)
      }
    }

    if (nextPlayerHp <= 0) {
      setCoupons((c) => Math.max(0, c - 15))
      logLines.push('K.O. — ton clan te rapatrie à la chefferie.')
    }

    setCombatLog((prev) => [...logLines, ...prev])
  }

  const checkQuestAnswer = () => {
    const input = (questAnswers[currentHero.id] || '').toLowerCase().trim()
    if (input === currentHero.quest.correct) {
      setQuestStatuses((prev) => ({ ...prev, [currentHero.id]: 'success' }))
      setCompletedQuests((prev) => ({ ...prev, [currentHero.id]: true }))
      setXp((x) => x + 150)
      setCoupons((c) => c + 100)
      playSound('victory')
    } else {
      setQuestStatuses((prev) => ({ ...prev, [currentHero.id]: 'error' }))
    }
  }

  const cam = useMemo(
    () => ({
      x: Math.min(Math.max(0, playerPos.x - 320), 420),
      y: Math.min(Math.max(0, playerPos.y - 180), 280),
    }),
    [playerPos],
  )

  return (
    <div
      className={`min-h-[100dvh] text-[var(--ivory)] transition-transform duration-200 ${
        screenShake ? 'scale-[0.985]' : ''
      }`}
    >
      <div className={`step-transition ${transitioning ? 'active' : ''}`} />

      {ambush && (
        <div className="ambush-overlay" aria-live="assertive">
          <div />
          <p className="ambush-title">
            {lang === 'FR' ? 'PATROUILLE…' : 'PATROL…'}
          </p>
          <div />
        </div>
      )}

      {step === 'language_select' && (
        <LanguageSelect
          lang={lang}
          playerName={playerName}
          onLang={setLang}
          onName={setPlayerName}
          onStart={() => {
            setMovieScene(0)
            setCinemaFade(true)
            setStep('intro_movie')
          }}
          playSound={playSound}
        />
      )}

      {step === 'intro_movie' && (
        <IntroMovie
          scene={movieScene}
          fade={cinemaFade}
          lang={lang}
          muted={muted}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('language_select')}
          onNext={nextMovieScene}
        />
      )}

      {step === 'hero_select' && (
        <HeroSelect
          heroes={heroes}
          selectedId={selectedHero}
          playerName={playerName}
          lang={lang}
          muted={muted}
          onSelect={setSelectedHero}
          onName={setPlayerName}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('intro_movie')}
          onContinue={() => setStep('open_world')}
          playSound={playSound}
        />
      )}

      {step === 'open_world' && (
        <OpenWorld
          hero={currentHero}
          playerName={playerName}
          lang={lang}
          muted={muted}
          xp={xp}
          coupons={coupons}
          region={currentRegion}
          inventory={inventory}
          playerPos={playerPos}
          cam={cam}
          isMoving={isMoving}
          npcMessage={activeNpcMessage}
          worldItems={worldItems}
          npcs={npcs}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('hero_select')}
          onMove={movePlayer}
          onGo={setStep}
        />
      )}

      {step === 'combat' && (
        <CombatScreen
          lang={lang}
          muted={muted}
          hero={currentHero}
          playerHp={playerHp}
          enemyHp={enemyHp}
          enemy={enemyType}
          rage={rage}
          log={combatLog}
          flash={damageFlash}
          onAction={handleActionCombat}
          onLeave={() => setStep('open_world')}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('open_world')}
        />
      )}

      {step === 'missions' && (
        <MissionsScreen
          lang={lang}
          muted={muted}
          hero={currentHero}
          completed={!!completedQuests[currentHero.id]}
          answer={questAnswers[currentHero.id] || ''}
          status={questStatuses[currentHero.id]}
          onAnswer={(v) =>
            setQuestAnswers((prev) => ({ ...prev, [currentHero.id]: v }))
          }
          onSubmit={checkQuestAnswer}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('open_world')}
        />
      )}

      {step === 'boutique' && (
        <BoutiqueScreen
          lang={lang}
          muted={muted}
          coupons={coupons}
          items={shopItems}
          onBuy={(id) => {
            const item = shopItems.find((i) => i.id === id)
            if (!item) return
            if (coupons >= item.price) {
              setCoupons((c) => c - item.price)
              setEquippedWeapon({ name: item.name, dmg: item.dmg })
              playSound('victory')
            }
          }}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('open_world')}
        />
      )}

      {step === 'album' && (
        <AlbumScreen
          lang={lang}
          muted={muted}
          onLang={setLang}
          onMute={() => setMuted((m) => !m)}
          onBack={() => setStep('open_world')}
        />
      )}

      <footer className="pointer-events-none fixed bottom-1 left-0 right-0 text-center text-[9px] tracking-[0.2em] text-[var(--mist)]/30">
        ALUCI · Gardien des coutumes et traditions · 10 Gardiens
      </footer>
    </div>
  )
}
