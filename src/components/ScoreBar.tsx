import { band, bandBarClass } from '../lib/scoring'
import { cn } from '../lib/cn'

/** Results percentage bar, coloured green, yellow or red by band. */
export function ScoreBar({ pct }: { pct: number }) {
  const cls = bandBarClass(band(pct))
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', cls)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
