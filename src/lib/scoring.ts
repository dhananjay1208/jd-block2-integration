import type { Step, PillarModule } from '../content/types'

/** Percentage 0..100 of points earned against points available. */
export function percent(score: number, max: number): number {
  if (max <= 0) return 0
  return Math.round((score / max) * 100)
}

export type Band = 'high' | 'mid' | 'low'

/** Score band, used to colour the results bar. */
export function band(pct: number): Band {
  if (pct >= 80) return 'high'
  if (pct >= 60) return 'mid'
  return 'low'
}

/** Tailwind background class for a band. */
export function bandBarClass(b: Band): string {
  return b === 'high'
    ? 'bg-jd-green'
    : b === 'mid'
      ? 'bg-jd-yellow-dark'
      : 'bg-red-500'
}

/** A short verdict line for the results screen. */
export function verdictLine(pct: number): string {
  if (pct >= 80) return 'Strong. You have the core of this pillar.'
  if (pct >= 60) return 'Good. A couple are worth a second look.'
  return 'A start. Run it again and read the explanations.'
}

/** Maximum points a single step can award. */
export function stepMaxPoints(step: Step): number {
  if (step.kind === 'match') return step.points * step.items.length
  return step.points
}

/** Total points available across a module. */
export function moduleMaxScore(m: PillarModule): number {
  return m.steps.reduce((a, s) => a + stepMaxPoints(s), 0)
}
