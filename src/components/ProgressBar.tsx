import { cn } from '../lib/cn'

/** Launcher meter: a filled bar with a label. */
export function ProgressBar({
  done,
  total,
}: {
  done: number
  total: number
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/25">
        <div
          className="h-full rounded-full bg-jd-yellow transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1.5 text-sm font-semibold text-white/85">
        {done} of {total} topics complete
      </div>
    </div>
  )
}

/** In-module step dots, like the quiz progress row. */
export function StepDots({
  count,
  current,
}: {
  count: number
  current: number
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 flex-1 rounded-full',
            i < current
              ? 'bg-jd-green'
              : i === current
                ? 'bg-jd-yellow-dark'
                : 'bg-line',
          )}
        />
      ))}
    </div>
  )
}
