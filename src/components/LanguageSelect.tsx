import { Play } from 'lucide-react'
import { Embers } from './Embers'

type Props = {
  lang: 'FR' | 'EN'
  playerName: string
  onLang: (lang: 'FR' | 'EN') => void
  onName: (name: string) => void
  onStart: () => void
  playSound: (type: string) => void
}

export function LanguageSelect({ lang, playerName, onLang, onName, onStart, playSound }: Props) {
  const fr = lang === 'FR'

  return (
    <div className="screen-shell flex flex-col items-center justify-center">
      <Embers count={6} />
      <div className="panel-matte fade-up relative z-10 w-full max-w-xl rounded-lg p-8 text-center md:p-10 lg:max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--mist)]">
          ALUCI · Édition cinématique
        </p>
        <h1 className="font-display font-display-lg mt-4 text-3xl text-[var(--bronze)] md:text-4xl lg:text-5xl">
          {fr ? 'Bienvenue, Gardien' : 'Welcome, Guardian'}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--ivory)]/75 md:text-base">
          {fr
            ? 'Cameroun 1916 — choisis ta langue et ton nom avant le film d’ouverture.'
            : 'Cameroon 1916 — choose your language and name before the opening film.'}
        </p>

        <div className="mt-8 flex justify-center gap-3">
          {(['FR', 'EN'] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                playSound('click')
                onLang(code)
              }}
              className={`rounded-md px-6 py-2.5 text-sm font-semibold ${
                lang === code
                  ? 'bg-[var(--bronze)] text-[var(--ink)]'
                  : 'border border-[rgba(232,220,196,0.2)] text-[var(--mist)]'
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={playerName}
          onChange={(e) => onName(e.target.value)}
          className="mt-6 w-full max-w-sm rounded-md border border-[rgba(232,220,196,0.2)] bg-[var(--ink)] px-3 py-2.5 text-center text-sm text-[var(--ivory)] outline-none focus:border-[var(--bronze)]"
        />

        <div>
          <button
            type="button"
            onClick={() => {
              playSound('click')
              onStart()
            }}
            className="btn-bronze mt-7 inline-flex items-center gap-2 rounded-md px-8 py-3 text-xs font-bold uppercase tracking-[0.14em]"
          >
            <Play className="h-3.5 w-3.5" />
            {fr ? 'Commencer' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  )
}
