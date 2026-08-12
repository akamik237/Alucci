import { useState } from 'react'
import type { Hero } from '../data/heroes'

const decorClass: Record<string, string> = {
  savane: 'terrain-savane',
  foret: 'terrain-forest',
  'foret-dense': 'terrain-forest',
  'foret-sud': 'terrain-forest',
  forge: 'terrain-forge',
  estuaire: 'terrain-littoral',
  sahel: 'terrain-sahel',
  grassfields: 'terrain-grassfields',
  chefferie: 'terrain-chefferie',
  volcan: 'terrain-volcan',
}

type Props = {
  hero: Hero
  className?: string
  showIcon?: boolean
}

/** Painted CSS portrait with optional real image from /public/heroes */
export function HeroArt({ hero, className = '', showIcon = true }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const terrain = decorClass[hero.decor] ?? 'terrain-forest'

  return (
    <div className={`relative overflow-hidden ${terrain} ${className}`}>
      {imgOk && (
        <img
          src={hero.image}
          alt={hero.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgOk(false)}
        />
      )}

      {!imgOk && (
        <>
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(ellipse at 50% 70%, ${hero.palette.accent}33 0%, transparent 55%),
                linear-gradient(160deg, ${hero.palette.from}, ${hero.palette.via} 45%, ${hero.palette.to})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
          {/* Silhouette figure */}
          <div className="absolute inset-x-0 bottom-0 top-[18%] flex items-end justify-center">
            <div
              className="relative h-[78%] w-[42%] max-w-[160px]"
              style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.55))' }}
            >
              <div
                className="absolute left-1/2 top-0 h-[22%] w-[38%] -translate-x-1/2 rounded-full"
                style={{ background: `linear-gradient(180deg, ${hero.palette.accent}, ${hero.palette.via})` }}
              />
              <div
                className="absolute left-1/2 top-[18%] h-[38%] w-[55%] -translate-x-1/2 rounded-[40%_40%_30%_30%]"
                style={{ background: `linear-gradient(180deg, ${hero.palette.accent}cc, ${hero.palette.from})` }}
              />
              <div
                className="absolute bottom-0 left-1/2 h-[48%] w-[70%] -translate-x-1/2 rounded-t-[30%]"
                style={{ background: `linear-gradient(180deg, ${hero.palette.via}, ${hero.palette.from})` }}
              />
              {showIcon && (
                <div className="absolute left-1/2 top-[36%] -translate-x-1/2 text-3xl drop-shadow-lg sm:text-4xl">
                  {hero.icon}
                </div>
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.2em] text-amber-200/70">
            {hero.region}
          </div>
        </>
      )}

      {imgOk && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      )}
    </div>
  )
}
