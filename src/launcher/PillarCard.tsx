import { Link } from 'react-router-dom'
import type { PillarModule } from '../content/types'
import type { PillarResult } from '../store/progress'
import { ACCENTS } from '../theme'
import { scenarioById } from '../content/scenarios'
import { Check, ArrowRight } from '../components/icons'
import { ScenarioTag } from '../components/ui'

export function PillarCard({
  pillar,
  result,
}: {
  pillar: PillarModule
  result?: PillarResult
}) {
  const accent = ACCENTS[pillar.accentIndex % ACCENTS.length]
  const sc = scenarioById(pillar.scenario)
  const done = result?.completed

  return (
    <Link
      to={`/pillar/${pillar.id}`}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-center gap-3 p-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-extrabold text-white"
          style={{ backgroundColor: accent }}
        >
          {pillar.order}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
            Topic {pillar.order} · {pillar.short}
          </div>
          <div className="truncate text-[16px] font-extrabold text-jd-green-deep">
            {pillar.name}
          </div>
        </div>
        {done ? (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jd-green text-white">
            <Check size={16} />
          </span>
        ) : (
          <span className="shrink-0 text-jd-green-dark opacity-0 transition group-hover:opacity-100">
            <ArrowRight size={18} />
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-2.5">
        <ScenarioTag name={sc.name} />
        <span className="shrink-0 text-[11px] font-semibold text-ink-soft">
          {pillar.minutes} min · {pillar.steps.length} tasks
          {done ? ` · best ${result!.score}` : ''}
        </span>
      </div>
    </Link>
  )
}
