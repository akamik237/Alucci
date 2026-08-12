import { Check } from 'lucide-react'
import type { Hero } from '../data/heroes'
import { Embers } from './Embers'
import { HeroArt } from './HeroArt'
import { TopBar } from './TopBar'

type Props = {
  heroes: Hero[]
  selectedId: number
  playerName: string
  lang: 'FR' | 'EN'
  muted: boolean
  onSelect: (id: number) => void
  onName: (name: string) => void
  onLang: (lang: 'FR' | 'EN') => void
  onMute: () => void
  onBack: () => void
  onContinue: () => void
  playSound: (type: string) => void
}

export function HeroSelect({
  heroes,
  selectedId,
  playerName,
  lang,
  muted,
  onSelect,
  onName,
  onLang,
  onMute,
  onBack,
  onContinue,
  playSound,
}: Props) {
  const hero = heroes[selectedId] ?? heroes[0]
  const fr = lang === 'FR'

  return (
    <div className="screen-shell">
      <Embers count={7} />
      <TopBar
        lang={lang}
        muted={muted}
        onLang={onLang}
        onMute={onMute}
        onBack={onBack}
      />

      <h1 className="fade-up font-display font-display-lg relative z-10 mt-2 text-center text-2xl text-[var(--bronze)] md:text-left md:text-3xl lg:text-4xl">
        {fr ? 'CHOISIS TON HÉROS' : 'CHOOSE YOUR HERO'}
      </h1>

      <div className="relative z-10 mt-6 grid gap-8 md:grid-cols-[minmax(280px,420px)_1fr] md:items-start lg:gap-12">
        {/* Featured portrait */}
        <div className="hero-card-frame fade-up mx-auto w-full max-w-[320px] overflow-hidden rounded-md bg-[var(--bark)] md:mx-0 md:max-w-none">
          <HeroArt hero={hero} className="aspect-[3/4] w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-4 pt-16 text-center md:text-left">
            <p className="font-display text-lg uppercase text-[var(--ivory)] md:text-xl">
              {fr ? hero.name : hero.nameEn}
            </p>
            <p className="mt-1 text-sm text-[var(--mist)]">
              {fr ? hero.tagline : hero.taglineEn}
            </p>
            <p className="mt-2 hidden text-xs italic text-[var(--mist)]/80 md:block">
              « {fr ? hero.signature : hero.signatureEn} »
            </p>
          </div>
        </div>

        {/* Right column: info + grid + form */}
        <div className="flex min-w-0 flex-col">
          <div className="panel-matte hidden rounded-md p-4 md:block">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--mist)]">
              {hero.region} · {hero.archetype}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ivory)]/80">
              {fr ? hero.power : hero.powerEn} — {hero.weapon}
            </p>
          </div>

          <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--mist)] md:text-left">
            {fr ? 'Les 10 gardiens' : 'The 10 guardians'}
          </p>

          <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-5 md:grid-cols-5 lg:gap-3">
            {heroes.map((h) => {
              const active = h.id === selectedId
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => {
                    playSound('click')
                    onSelect(h.id)
                  }}
                  className={`relative aspect-square overflow-hidden rounded-md border transition ${
                    active
                      ? 'border-[var(--bronze)] ring-1 ring-[var(--bronze)]'
                      : 'border-[rgba(232,220,196,0.15)] opacity-80 hover:opacity-100'
                  }`}
                  aria-label={h.name}
                  title={fr ? h.name : h.nameEn}
                >
                  <HeroArt hero={h} className="h-full w-full" showIcon />
                  {active && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-sm bg-[var(--bronze)] text-[var(--ink)]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-6 max-w-md md:max-w-lg">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mist)]">
              {fr ? 'TON NOM DE GARDIEN' : 'YOUR GUARDIAN NAME'}
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => onName(e.target.value)}
              className="panel-matte w-full rounded-md px-3 py-2.5 text-center font-display text-sm text-[var(--ivory)] outline-none focus:border-[var(--bronze)] md:text-left md:tracking-[0.12em]"
              placeholder={fr ? "GARDIEN D'ALUCI" : 'GUARDIAN OF ALUCI'}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click')
              onContinue()
            }}
            className="btn-bronze font-display mt-4 w-full max-w-md rounded-md py-3.5 text-sm uppercase transition active:scale-[0.99] md:max-w-xs"
          >
            {fr ? 'CONTINUER' : 'CONTINUE'}
          </button>
        </div>
      </div>
    </div>
  )
}
