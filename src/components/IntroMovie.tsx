import { ArrowRight, Film } from 'lucide-react'
import { introFilm } from '../data/heroes'
import { Embers } from './Embers'
import { TopBar } from './TopBar'

type Props = {
  scene: number
  fade: boolean
  lang: 'FR' | 'EN'
  muted: boolean
  onLang: (lang: 'FR' | 'EN') => void
  onMute: () => void
  onBack: () => void
  onNext: () => void
}

export function IntroMovie({
  scene,
  fade,
  lang,
  muted,
  onLang,
  onMute,
  onBack,
  onNext,
}: Props) {
  const frame = introFilm[scene]
  const fr = lang === 'FR'
  const last = scene >= introFilm.length - 1

  return (
    <div className="screen-shell">
      <Embers count={5} />
      <TopBar lang={lang} muted={muted} onLang={onLang} onMute={onMute} onBack={onBack} />

      <div className="relative z-10 mt-4 flex min-h-[440px] flex-1 flex-col justify-between overflow-hidden rounded-lg border border-[rgba(184,137,58,0.3)] md:min-h-[520px] lg:mx-auto lg:max-w-5xl">
        <div
          className={`intro-still transition-opacity duration-450 ${fade ? 'opacity-100' : 'opacity-40'}`}
          style={{ backgroundImage: `url(${frame.still})` }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
          <div className="flex items-start justify-between gap-3">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mist)] md:text-xs">
              <Film className="h-3.5 w-3.5" />
              {fr ? frame.act : frame.actEn}
            </p>
            <span className="rounded border border-[rgba(184,137,58,0.3)] bg-black/40 px-2 py-0.5 font-mono text-[10px] text-[var(--mist)]">
              #{String(scene + 1).padStart(2, '0')}
            </span>
          </div>

          <div
            className={`my-auto max-w-2xl transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="font-display font-display-lg text-2xl text-[var(--bronze)] md:text-4xl">
              {fr ? frame.title : frame.titleEn}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--ivory)]/85 md:text-lg md:leading-8">
              “{fr ? frame.desc : frame.descEn}”
            </p>

            <div className="mt-6 rounded-md border border-[rgba(232,220,196,0.12)] bg-black/45 px-4 py-3 md:max-w-xl">
              <p className="text-xs text-[var(--ivory)]/90 md:text-sm">
                {fr ? 'Voix originale' : 'Original voice'} :{' '}
                <span className="italic">{frame.patois}</span>
              </p>
              <p className="mt-1 text-[11px] text-[var(--mist)] md:text-xs">
                {fr ? 'Traduction' : 'Translation'} : {fr ? frame.trans : frame.transEn}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="btn-bronze font-display mt-8 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-md py-3 text-xs uppercase md:self-start"
          >
            {last
              ? fr
                ? 'Choisir ton héros'
                : 'Choose your hero'
              : fr
                ? "Passer à l'acte suivant"
                : 'Next act'}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
