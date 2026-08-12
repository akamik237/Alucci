import { ChevronLeft, Volume2, VolumeX } from 'lucide-react'

type Props = {
  lang: 'FR' | 'EN'
  muted: boolean
  onLang: (lang: 'FR' | 'EN') => void
  onMute: () => void
  onBack?: () => void
  showBack?: boolean
}

export function TopBar({ lang, muted, onLang, onMute, onBack, showBack = true }: Props) {
  return (
    <div className="relative z-20 flex items-center justify-between px-1 py-2">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="font-display flex items-center gap-1 rounded-md border border-[rgba(184,137,58,0.4)] px-2.5 py-1 text-xs text-[var(--bronze)] transition hover:bg-[rgba(184,137,58,0.08)]"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {lang === 'FR' ? 'Retour' : 'Back'}
        </button>
      ) : (
        <div className="w-16" />
      )}

      <div className="flex items-center gap-2">
        <div className="flex overflow-hidden rounded-md border border-[rgba(184,137,58,0.35)] text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => onLang('FR')}
            className={`px-2.5 py-1 ${
              lang === 'FR' ? 'bg-[var(--bronze)] text-[var(--ink)]' : 'text-[var(--mist)]'
            }`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => onLang('EN')}
            className={`px-2.5 py-1 ${
              lang === 'EN' ? 'bg-[var(--bronze)] text-[var(--ink)]' : 'text-[var(--mist)]'
            }`}
          >
            EN
          </button>
        </div>
        <button
          type="button"
          onClick={onMute}
          className="rounded-md border border-[rgba(184,137,58,0.35)] p-1.5 text-[var(--bronze)] transition hover:bg-[rgba(184,137,58,0.08)]"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}
