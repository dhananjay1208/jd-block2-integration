import { PILLAR_MODULES } from './modules'
import { PILLARS } from './pillarsBase'
import { SCENARIOS } from './scenarios'
import { SOURCES } from './sources'

/**
 * Dev-only content invariants. Called from main.tsx behind import.meta.env.DEV,
 * so it never ships. Catches the authoring slips the type system cannot.
 */
export function validateModules(): void {
  const pillarIds = new Set(PILLARS.map((p) => p.id))
  const scenarioIds = new Set(SCENARIOS.map((s) => s.id))
  const sourceLabels = new Set(SOURCES.map((s) => s.label))
  const problems: string[] = []

  for (const m of PILLAR_MODULES) {
    if (!pillarIds.has(m.id)) problems.push(`${m.id}: id not in pillarsBase`)
    if (!scenarioIds.has(m.scenario))
      problems.push(`${m.id}: unknown scenario "${m.scenario}"`)
    if (m.intro.facets.length !== 4)
      problems.push(`${m.id}: expected 4 facets, got ${m.intro.facets.length}`)
    if (!sourceLabels.has(m.results.source))
      problems.push(`${m.id}: source not in sources.ts -> "${m.results.source}"`)

    for (const step of m.steps) {
      if (step.kind === 'mcq') {
        const c = step.options.filter((o) => o.correct).length
        if (c !== 1)
          problems.push(`${m.id}/${step.id}: mcq has ${c} correct options`)
      }
      if (step.kind === 'before-after' && step.check) {
        const c = step.check.options.filter((o) => o.correct).length
        if (c !== 1)
          problems.push(`${m.id}/${step.id}: check has ${c} correct options`)
      }
      if (step.kind === 'match') {
        const keys = new Set(step.buckets.map((b) => b.key))
        for (const it of step.items) {
          if (!keys.has(it.bucket))
            problems.push(
              `${m.id}/${step.id}: item ${it.id} bucket "${it.bucket}" not in buckets`,
            )
        }
      }
      if (step.kind === 'scenario-decision') {
        const s = step.choices.filter((c) => c.verdict === 'success').length
        if (s < 1)
          problems.push(`${m.id}/${step.id}: no success choice`)
      }
      if (step.kind === 'hotspot') {
        const c = step.regions.filter((r) => r.correct).length
        if (c < 1) problems.push(`${m.id}/${step.id}: no correct region`)
      }
    }
  }

  if (problems.length) {
    console.warn(
      `[pillars] ${problems.length} content issue(s):\n${problems.join('\n')}`,
    )
  } else {
    console.info(
      `[pillars] ${PILLAR_MODULES.length} modules validated, no issues.`,
    )
  }
}
