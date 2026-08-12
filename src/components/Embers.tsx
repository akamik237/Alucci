/** Sparse dust motes — kept subtle to avoid “AI glow” look */
export function Embers({ count = 8 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="ember-particle"
          style={{
            left: `${12 + ((i * 19) % 76)}%`,
            animationDuration: `${8 + (i % 6)}s`,
            animationDelay: `${(i % 7) * 0.6}s`,
            opacity: 0.2 + (i % 3) * 0.08,
          }}
        />
      ))}
    </div>
  )
}
