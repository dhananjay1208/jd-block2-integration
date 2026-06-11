import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { PILLAR_MODULES } from '../content/modules'
import {
  useProgress,
  selectTotalScore,
  selectCompletedCount,
} from '../store/progress'
import { FEATURES } from '../config'
import { ProgressBar } from '../components/ProgressBar'
import { Trophy, ArrowRight } from '../components/icons'
import { PillarCard } from './PillarCard'

export function Launcher() {
  const results = useProgress((s) => s.results)
  const name = useProgress((s) => s.name)
  const completed = selectCompletedCount({ results })
  const total = selectTotalScore({ results })
  const joinUrl = window.location.href

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-br from-jd-green-deep via-jd-green-dark to-jd-green text-white">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-jd-yellow">
                John Deere Pune · Block 2
              </div>
              <h1 className="h-display mt-1 text-2xl font-extrabold sm:text-3xl">
                Integration & Communication
              </h1>
              <p className="mt-1.5 max-w-xl text-sm text-white/85">
                How factory data moves, from the machine to analytics. Start
                with the Data Journey map, then play any topic to go deep.
              </p>
              {name && (
                <p className="mt-2 text-sm font-semibold text-jd-yellow">
                  Welcome, {name}.
                </p>
              )}
            </div>
            {FEATURES.joinQR && (
              <div className="hidden shrink-0 rounded-xl bg-white p-2 text-center sm:block">
                <QRCodeSVG
                  value={joinUrl}
                  size={84}
                  fgColor="#16320F"
                  bgColor="#ffffff"
                />
                <div className="mt-1 text-[10px] font-bold text-jd-green-deep">
                  Scan to join
                </div>
              </div>
            )}
          </div>

          <div className="mt-5">
            <ProgressBar done={completed} total={PILLAR_MODULES.length} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <Link
              to="/progress"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 font-bold text-white transition hover:bg-white/25"
            >
              <Trophy size={15} /> {total} points
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link
          to="/journey"
          className="group mb-5 block overflow-hidden rounded-2xl bg-jd-green-deep text-white ring-1 ring-jd-green-dark shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-center gap-4 p-4 sm:p-5">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-jd-yellow">
                Start here
              </div>
              <div className="mt-0.5 text-lg font-extrabold">
                The Data Journey
              </div>
              <p className="mt-1 text-sm text-white/85">
                The whole map on one screen. Machine to edge to Ignition, then
                MQTT to RabbitMQ to Kafka to analytics. Tap any hop to go deep.
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-jd-yellow text-jd-green-deep transition group-hover:translate-x-0.5">
              <ArrowRight size={20} />
            </span>
          </div>
        </Link>

        <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-jd-green">
          The ten topics
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PILLAR_MODULES.map((p) => (
            <PillarCard key={p.id} pillar={p} result={results[p.id]} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-soft">
          Integration & Communication · John Deere Pune leadership workshop ·
          Block 2
        </p>
      </main>
    </div>
  )
}
