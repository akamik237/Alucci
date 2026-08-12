import type { ReactNode } from 'react'
import type { Hero } from '../data/heroes'
import { TopBar } from './TopBar'

type Shared = {
  lang: 'FR' | 'EN'
  muted: boolean
  onLang: (lang: 'FR' | 'EN') => void
  onMute: () => void
  onBack: () => void
}

export function MissionsScreen({
  hero,
  lang,
  muted,
  completed,
  answer,
  status,
  onAnswer,
  onSubmit,
  onLang,
  onMute,
  onBack,
}: Shared & {
  hero: Hero
  completed: boolean
  answer: string
  status?: string
  onAnswer: (v: string) => void
  onSubmit: () => void
}) {
  const fr = lang === 'FR'
  return (
    <Shell lang={lang} muted={muted} onLang={onLang} onMute={onMute} onBack={onBack} title={fr ? 'Quêtes régionales' : 'Regional quests'}>
      <p className="text-xs text-amber-200/60">
        {fr ? 'Ligne active' : 'Active line'}: {fr ? hero.name : hero.nameEn}
      </p>
      <h3 className="mt-2 font-display text-lg text-[var(--bronze)]">{hero.quest.title}</h3>
      <p className="mt-2 text-sm text-amber-50/80">{hero.quest.desc}</p>
      <p className="mt-2 text-xs text-amber-400/70">{hero.quest.hint}</p>
      {completed ? (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-3 text-sm text-emerald-300">
          ✓ {fr ? 'Opération historique résolue ! (+150 XP)' : 'Historical operation solved! (+150 XP)'}
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          <input
            value={answer}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder={fr ? 'Réponse historique...' : 'Historical answer...'}
            className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-xs outline-none focus:border-amber-500"
          />
          {status === 'error' && (
            <p className="text-xs text-red-400">
              {fr ? 'Réponse inexacte pour le Conseil des Anciens.' : 'Incorrect answer for the Council of Elders.'}
            </p>
          )}
          <button
            type="button"
            onClick={onSubmit}
            className="btn-bronze font-display w-full rounded-md py-2 text-xs uppercase"
          >
            {fr ? "Sceller l'alignement" : 'Seal the alignment'}
          </button>
        </div>
      )}
    </Shell>
  )
}

export function BoutiqueScreen({
  lang,
  muted,
  coupons,
  items,
  onBuy,
  onLang,
  onMute,
  onBack,
}: Shared & {
  coupons: number
  items: { id: number; name: string; price: number; dmg: number; desc: string }[]
  onBuy: (id: number) => void
}) {
  const fr = lang === 'FR'
  return (
    <Shell lang={lang} muted={muted} onLang={onLang} onMute={onMute} onBack={onBack} title={fr ? 'Marché & Forges' : 'Market & Forges'}>
      <p className="mb-3 font-mono text-xs text-amber-300">{coupons} coupons</p>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="panel-matte rounded-md p-4">
            <p className="font-display text-sm text-[var(--bronze)]">{item.name}</p>
            <p className="mt-1 text-sm text-[var(--mist)]">{item.desc}</p>
            <p className="mt-2 text-xs text-[var(--ivory)]">+{item.dmg} dmg</p>
            <button
              type="button"
              onClick={() => onBuy(item.id)}
              className="btn-bronze mt-3 w-full rounded-md py-2 text-[10px] font-bold uppercase"
            >
              {fr ? 'Forger' : 'Forge'} ({item.price} C)
            </button>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function AlbumScreen({ lang, muted, onLang, onMute, onBack }: Shared) {
  const fr = lang === 'FR'
  const panels = [
    { title: fr ? 'PAPA (Génération Centre)' : 'FATHER (Centre lineage)', tone: 'terrain-forest' },
    { title: fr ? 'MAMAN (Lignée Sawa)' : 'MOTHER (Sawa lineage)', tone: 'terrain-littoral' },
    { title: fr ? 'MAMIE (Mémoire Ouest)' : 'GRANDMOTHER (West memory)', tone: 'terrain-chefferie' },
  ]
  return (
    <Shell lang={lang} muted={muted} onLang={onLang} onMute={onMute} onBack={onBack} title={fr ? 'Autel de lignée' : 'Lineage altar'}>
      <p className="mb-3 text-xs text-amber-100/60">
        {fr
          ? 'Portraits et fiches généalogiques d’Aluci (Archives Cameroun 1900–1916).'
          : 'Portraits and genealogy sheets of Aluci (Cameroon archives 1900–1916).'}
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {panels.map((p) => (
          <div key={p.title} className={`overflow-hidden rounded-md border border-[rgba(184,137,58,0.25)] ${p.tone}`}>
            <div className="flex h-36 items-end bg-gradient-to-t from-black/80 to-transparent p-3 md:h-44">
              <p className="font-display text-xs text-[var(--ivory)] md:text-sm">{p.title}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function CombatScreen({
  lang,
  muted,
  hero,
  playerHp,
  enemyHp,
  enemy,
  rage,
  log,
  flash,
  onAction,
  onLeave,
  onLang,
  onMute,
  onBack,
}: Shared & {
  hero: Hero
  playerHp: number
  enemyHp: number
  enemy: { name: string; hpMax: number; attack: number; icon: string }
  rage: number
  log: string[]
  flash: string | null
  onAction: (a: 'ATTACK' | 'EVADE' | 'ULTIMATE' | 'FLEE') => void
  onLeave: () => void
}) {
  const fr = lang === 'FR'
  const done = playerHp <= 0 || enemyHp <= 0
  return (
    <div
      className={`screen-shell transition ${
        flash === 'player' ? 'bg-red-950/40' : flash === 'enemy' ? 'bg-white/5' : ''
      }`}
    >
      <TopBar lang={lang} muted={muted} onLang={onLang} onMute={onMute} onBack={onBack} />
      <h2 className="font-display text-lg text-[var(--bronze)]">{fr ? 'Ligne de front' : 'Front line'}</h2>
      <p className="text-xs text-amber-100/60">{fr ? hero.name : hero.nameEn}</p>

      <div className="mt-4 space-y-3">
        <Bar label={`PV ${playerHp}/100 · Rage ${rage}%`} pct={playerHp} color="bg-emerald-500" />
        <p className="text-sm">
          {enemy.icon} {enemy.name}
        </p>
        <Bar label={`PV ${enemyHp}/${enemy.hpMax}`} pct={(enemyHp / enemy.hpMax) * 100} color="bg-red-500" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Btn disabled={done} onClick={() => onAction('ATTACK')}>{fr ? 'Frapper' : 'Strike'}</Btn>
        <Btn disabled={done} onClick={() => onAction('EVADE')}>{fr ? 'Esquive' : 'Evade'}</Btn>
        <Btn disabled={done || rage < 100} onClick={() => onAction('ULTIMATE')}>{fr ? 'Ultime' : 'Ultimate'}</Btn>
        <Btn disabled={done} onClick={() => onAction('FLEE')} danger>{fr ? 'Fuir' : 'Flee'}</Btn>
        {done && (
          <Btn onClick={onLeave}>{fr ? "Quitter l'engagement" : 'Leave engagement'}</Btn>
        )}
      </div>

      <div className="mt-4 max-h-40 space-y-1 overflow-y-auto text-[11px] text-amber-100/70">
        {log.map((line, i) => (
          <p key={`${i}-${line.slice(0, 12)}`} className={i === 0 ? 'font-bold text-amber-100' : ''}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function Shell({
  title,
  children,
  ...bar
}: Shared & { title: string; children: ReactNode }) {
  return (
    <div className="screen-shell">
      <TopBar {...bar} />
      <h2 className="font-display mt-2 text-2xl text-[var(--bronze)] md:text-3xl">{title}</h2>
      <div className="mt-6 max-w-3xl">{children}</div>
    </div>
  )
}

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="mb-1 text-[11px] text-amber-100/70">{label}</div>
      <div className="h-2 overflow-hidden rounded bg-slate-800">
        <div className={`h-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
      </div>
    </div>
  )
}

function Btn({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  danger?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded px-3 py-1.5 text-xs font-bold uppercase disabled:opacity-40 ${
        danger ? 'bg-red-800 text-white' : 'btn-bronze'
      }`}
    >
      {children}
    </button>
  )
}
