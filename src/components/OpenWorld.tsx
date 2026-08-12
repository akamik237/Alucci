import type { ReactNode } from 'react'
import { BookOpen, Package, Store } from 'lucide-react'
import type { Hero } from '../data/heroes'
import { Embers } from './Embers'
import { HeroArt } from './HeroArt'
import { TopBar } from './TopBar'

type WorldNpc = {
  id: string
  name: string
  x: number
  y: number
  token: string
  message: string
}

type WorldItem = {
  id: string
  name: string
  x: number
  y: number
  token: string
  collected: boolean
}

type Props = {
  hero: Hero
  playerName: string
  lang: 'FR' | 'EN'
  muted: boolean
  xp: number
  coupons: number
  region: string
  inventory: string[]
  playerPos: { x: number; y: number }
  cam: { x: number; y: number }
  isMoving: boolean
  npcMessage: { name: string; text: string } | null
  worldItems: WorldItem[]
  npcs: WorldNpc[]
  onLang: (lang: 'FR' | 'EN') => void
  onMute: () => void
  onBack: () => void
  onMove: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void
  onGo: (step: 'missions' | 'boutique' | 'album' | 'hero_select') => void
}

export function OpenWorld({
  hero,
  playerName,
  lang,
  muted,
  xp,
  coupons,
  region,
  inventory,
  playerPos,
  cam,
  isMoving,
  npcMessage,
  worldItems,
  npcs,
  onLang,
  onMute,
  onBack,
  onMove,
  onGo,
}: Props) {
  const fr = lang === 'FR'
  const terrain =
    hero.decor.includes('foret')
      ? 'terrain-forest'
      : hero.decor === 'estuaire'
        ? 'terrain-littoral'
        : hero.decor === 'savane' || hero.decor === 'sahel'
          ? 'terrain-savane'
          : hero.decor === 'forge'
            ? 'terrain-forge'
            : hero.decor === 'volcan'
              ? 'terrain-volcan'
              : 'terrain-grassfields'

  return (
    <div className="screen-shell">
      <Embers count={5} />
      <TopBar lang={lang} muted={muted} onLang={onLang} onMute={onMute} onBack={onBack} />

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-[var(--bronze)] md:text-3xl">
            {fr ? 'Explorer le Mboa' : 'Explore the Mboa'}
          </h2>
          <p className="mt-1 text-sm text-[var(--mist)]">
            {fr ? 'Biome' : 'Biome'}: {region}
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono text-sm text-[var(--ivory)]/80">
          <span>XP {xp}</span>
          <span>{coupons} C</span>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        <NavBtn onClick={() => onGo('missions')}>
          <BookOpen className="h-3.5 w-3.5" /> {fr ? 'Quêtes' : 'Quests'}
        </NavBtn>
        <NavBtn onClick={() => onGo('boutique')}>
          <Store className="h-3.5 w-3.5" /> {fr ? 'Marché' : 'Shop'}
        </NavBtn>
        <NavBtn onClick={() => onGo('album')} accent>
          <Package className="h-3.5 w-3.5" /> Album
        </NavBtn>
        <NavBtn onClick={() => onGo('hero_select')} outline className="md:ml-auto">
          {fr ? 'Héros' : 'Hero'}
        </NavBtn>
      </div>

      <div className="relative z-10 mt-5 grid gap-5 lg:grid-cols-[220px_1fr_200px]">
        <aside className="panel-matte overflow-hidden rounded-md">
          <HeroArt hero={hero} className="aspect-[4/5] w-full" showIcon={false} />
          <div className="p-3">
            <p className="font-display text-sm text-[var(--bronze)]">
              {fr ? hero.name : hero.nameEn}
            </p>
            <p className="truncate text-xs text-[var(--mist)]">{playerName}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[var(--ivory)]/70">
              {hero.region} · {fr ? hero.power : hero.powerEn}
            </p>
          </div>
        </aside>

        <div className="relative h-[280px] overflow-hidden rounded-md border border-[rgba(184,137,58,0.25)] bg-[var(--ink)] md:h-[420px] lg:h-[480px]">
          <div
            className={`absolute h-[600px] w-[900px] transition-transform duration-200 ease-out ${terrain}`}
            style={{ transform: `translate(${-cam.x}px, ${-cam.y}px)` }}
          >
            <div className="landmark-chefferie" style={{ left: 480, top: 210 }} />
            <div className="landmark-path" style={{ left: 120, top: 300, width: 280 }} />
            <div className="landmark-path" style={{ left: 360, top: 180, width: 200 }} />
            <div className="landmark-shore" style={{ left: 40, top: 420 }} />

            {worldItems.map(
              (item) =>
                !item.collected && (
                  <div
                    key={item.id}
                    className="world-token"
                    style={{ left: item.x, top: item.y }}
                    title={item.name}
                  >
                    <img src={item.token} alt={item.name} />
                  </div>
                ),
            )}

            {npcs.map((npc) => (
              <div
                key={npc.id}
                className="world-token"
                style={{ left: npc.x, top: npc.y }}
                title={npc.name}
              >
                <img src={npc.token} alt={npc.name} />
              </div>
            ))}

            <div
              className={`world-token player-token ${isMoving ? 'moving' : ''}`}
              style={{ left: playerPos.x, top: playerPos.y }}
            >
              <img src={hero.image} alt={hero.name} />
            </div>
          </div>
          <div className="map-vignette" />
        </div>

        <aside className="flex flex-col gap-4">
          <div className="panel-matte rounded-md p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {fr ? 'Déplacement' : 'Move'}
            </p>
            <div className="mx-auto grid w-[132px] grid-cols-3 gap-2 place-items-center">
              <div />
              <Pad label="▲" onClick={() => onMove('UP')} />
              <div />
              <Pad label="◀" onClick={() => onMove('LEFT')} />
              <Pad label="▼" onClick={() => onMove('DOWN')} />
              <Pad label="▶" onClick={() => onMove('RIGHT')} />
            </div>
            <p className="mt-3 text-center text-[10px] text-[var(--mist)]">ZQSD / flèches</p>
          </div>

          <div className="panel-matte flex-1 rounded-md p-3 text-[11px] text-[var(--mist)]">
            <p className="font-semibold text-[var(--ivory)]/80">
              {fr ? "Sacoche d'herboristerie" : 'Herb pouch'}
            </p>
            <p className="mt-1 leading-relaxed">
              {inventory.length === 0 ? (fr ? 'Vide' : 'Empty') : inventory.join(' · ')}
            </p>
          </div>
        </aside>
      </div>

      {npcMessage && (
        <div className="panel-matte relative z-10 mt-4 max-w-2xl rounded-md p-4 text-sm">
          <span className="font-bold text-[var(--bronze)]">{npcMessage.name}</span>
          <p className="mt-1 text-[var(--ivory)]/80">“{npcMessage.text}”</p>
        </div>
      )}
    </div>
  )
}

function NavBtn({
  children,
  onClick,
  accent,
  outline,
  className = '',
}: {
  children: ReactNode
  onClick: () => void
  accent?: boolean
  outline?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold ${
        outline
          ? 'border border-[rgba(184,137,58,0.4)] text-[var(--bronze)]'
          : accent
            ? 'bg-[var(--bark)] text-[var(--bronze)]'
            : 'bg-[var(--bark)] text-[var(--ivory)] hover:brightness-110'
      } ${className}`}
    >
      {children}
    </button>
  )
}

function Pad({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 w-10 rounded-md border border-[rgba(184,137,58,0.3)] bg-[var(--ink)] text-[var(--ivory)] active:bg-[rgba(184,137,58,0.2)]"
    >
      {label}
    </button>
  )
}
