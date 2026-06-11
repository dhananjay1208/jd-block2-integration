import type { PillarModule } from '../content/types'
import { scenarioById } from '../content/scenarios'
import {
  Callout,
  Card,
  JDExample,
  PrimaryButton,
  ScenarioTag,
  SectionLabel,
} from '../components/ui'
import { ArrowRight } from '../components/icons'

export function IntroScreen({
  pillar,
  onStart,
}: {
  pillar: PillarModule
  onStart: () => void
}) {
  const sc = scenarioById(pillar.scenario)
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-5">
      <Callout tone="green" title={`What is ${pillar.name}?`}>
        {pillar.intro.whatIsIt}
      </Callout>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {pillar.intro.facets.map((f) => (
          <Card key={f.label} className="p-4">
            <div className="text-sm font-extrabold text-jd-green-deep">
              {f.label}
            </div>
            <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
              {f.text}
            </p>
          </Card>
        ))}
      </div>

      {pillar.intro.primer && (
        <div className="mt-5">
          <SectionLabel className="mb-2">
            {pillar.intro.primer.title ?? 'Know this before you play'}
          </SectionLabel>

          {pillar.intro.primer.blocks && (
            <div className="space-y-2">
              {pillar.intro.primer.blocks.map((b) => (
                <Card key={b.heading} className="p-4">
                  <div className="text-sm font-extrabold text-jd-green-deep">
                    {b.heading}
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {pillar.intro.primer.table && (
            <Card className="mt-3 overflow-x-auto no-scrollbar p-0">
              <table className="w-full min-w-[480px] text-left text-[13px]">
                <thead>
                  <tr className="bg-jd-green-mist">
                    {pillar.intro.primer.table.headers.map((h) => (
                      <th
                        key={h}
                        className="whitespace-nowrap px-3 py-2 text-[12px] font-extrabold uppercase tracking-wide text-jd-green-dark"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pillar.intro.primer.table.rows.map((row, i) => (
                    <tr key={i} className="border-t border-line align-top">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={
                            j === 0
                              ? 'whitespace-nowrap px-3 py-2 font-bold text-jd-green-deep'
                              : 'px-3 py-2 text-ink-soft'
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {pillar.intro.primer.table.caption && (
                <div className="border-t border-line px-3 py-2 text-xs text-ink-soft">
                  {pillar.intro.primer.table.caption}
                </div>
              )}
            </Card>
          )}
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <SectionLabel>On the {sc.line}</SectionLabel>
          <ScenarioTag name={sc.name} />
        </div>
        <JDExample>{pillar.anchor.today}</JDExample>
      </div>

      <Callout tone="yellow" title="Your mission" className="mt-4">
        {pillar.intro.mission}
      </Callout>

      <PrimaryButton
        block
        className="mt-5"
        icon={<ArrowRight size={18} />}
        onClick={onStart}
      >
        Start
      </PrimaryButton>
    </div>
  )
}
