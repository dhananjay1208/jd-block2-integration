import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { COLORS } from '../theme'
import {
  JOURNEY_NODES,
  JOURNEY_EDGES,
  journeyNodeById,
  NODE_W,
  NODE_H,
  VIEW_W,
  VIEW_H,
  type JourneyNode,
  type NodeKind,
} from '../content/journeyNodes'
import { moduleById } from '../content/modules'
import { ChevronLeft, ArrowRight } from '../components/icons'

type Selection =
  | { type: 'node'; id: string }
  | { type: 'edge'; id: string }
  | null

const NODE_STYLE: Record<
  NodeKind,
  { fill: string; stroke: string; text: string; sub: string }
> = {
  source: {
    fill: '#ffffff',
    stroke: COLORS.green,
    text: COLORS.greenDeep,
    sub: COLORS.inkSoft,
  },
  edge: {
    fill: COLORS.green,
    stroke: COLORS.greenDark,
    text: '#ffffff',
    sub: 'rgba(255,255,255,0.82)',
  },
  platform: {
    fill: COLORS.greenDeep,
    stroke: COLORS.greenDeep,
    text: '#ffffff',
    sub: COLORS.yellow,
  },
  broker: {
    fill: COLORS.greenDark,
    stroke: COLORS.greenDark,
    text: '#ffffff',
    sub: 'rgba(255,255,255,0.82)',
  },
  stream: {
    fill: COLORS.green,
    stroke: COLORS.greenDark,
    text: '#ffffff',
    sub: 'rgba(255,255,255,0.82)',
  },
  analytics: {
    fill: COLORS.yellow,
    stroke: COLORS.yellowDark,
    text: COLORS.greenDeep,
    sub: COLORS.greenDark,
  },
}

function rightAnchor(n: JourneyNode) {
  return { x: n.cx + NODE_W / 2, y: n.cy }
}
function leftAnchor(n: JourneyNode) {
  return { x: n.cx - NODE_W / 2, y: n.cy }
}

export function DataJourney() {
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(true)
  const [sel, setSel] = useState<Selection>(null)

  const selectedNode =
    sel?.type === 'node' ? journeyNodeById(sel.id) : undefined
  const selectedEdge =
    sel?.type === 'edge'
      ? JOURNEY_EDGES.find((e) => e.id === sel.id)
      : undefined

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-gradient-to-r from-jd-green-deep to-jd-green text-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/')}
            aria-label="Back to all topics"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 transition hover:bg-white/25"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-jd-yellow">
              The map
            </div>
            <div className="truncate text-base font-extrabold leading-tight sm:text-lg">
              The Data Journey
            </div>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="shrink-0 rounded-lg bg-jd-yellow px-3 py-1.5 text-xs font-extrabold text-jd-green-deep transition hover:brightness-95"
          >
            {playing ? 'Pause flow' : 'Play flow'}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-5">
        <p className="mb-3 text-sm text-ink-soft">
          One path, from the machine to analytics. Tap any box or any line to
          see what it does and open its topic card.
        </p>

        <div className="overflow-x-auto no-scrollbar rounded-2xl bg-white p-2 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="h-auto w-full"
            style={{ minWidth: 860 }}
            role="img"
            aria-label="The plant data journey from machines to analytics"
          >
            <defs>
              <marker
                id="jd-arrow"
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="4.5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M1 1 L8 4.5 L1 8 Z" fill={COLORS.greenDark} />
              </marker>
            </defs>

            {/* clear selection when tapping the background */}
            <rect
              x={0}
              y={0}
              width={VIEW_W}
              height={VIEW_H}
              fill="transparent"
              onClick={() => setSel(null)}
            />

            {/* edges */}
            {JOURNEY_EDGES.map((e) => {
              const from = journeyNodeById(e.from)
              const to = journeyNodeById(e.to)
              if (!from || !to) return null
              const a = rightAnchor(from)
              const b = leftAnchor(to)
              const mx = (a.x + b.x) / 2
              const my = (a.y + b.y) / 2
              const isSel = sel?.type === 'edge' && sel.id === e.id
              const labelW = e.label.length * 7.3 + 18
              return (
                <g key={e.id} className="cursor-pointer">
                  {/* base line */}
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={isSel ? COLORS.yellowDark : COLORS.green}
                    strokeOpacity={isSel ? 1 : 0.35}
                    strokeWidth={isSel ? 5 : 4}
                    markerEnd="url(#jd-arrow)"
                  />
                  {/* animated flow overlay */}
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={COLORS.yellow}
                    strokeWidth={3}
                    strokeLinecap="round"
                    className={playing ? 'jd-flow' : undefined}
                    strokeDasharray="10 12"
                    strokeOpacity={playing ? 0.95 : 0}
                  />
                  {/* hit target */}
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="transparent"
                    strokeWidth={26}
                    onClick={() => setSel({ type: 'edge', id: e.id })}
                  />
                  {/* label */}
                  <g
                    onClick={() => setSel({ type: 'edge', id: e.id })}
                    transform={`translate(${mx}, ${my - 16})`}
                  >
                    <rect
                      x={-labelW / 2}
                      y={-13}
                      width={labelW}
                      height={24}
                      rx={12}
                      fill="#ffffff"
                      stroke={isSel ? COLORS.yellowDark : COLORS.line}
                    />
                    <text
                      textAnchor="middle"
                      y={4}
                      fontSize={14}
                      fontWeight={700}
                      fill={COLORS.greenDeep}
                    >
                      {e.label}
                    </text>
                  </g>
                </g>
              )
            })}

            {/* nodes */}
            {JOURNEY_NODES.map((n) => {
              const s = NODE_STYLE[n.kind]
              const x = n.cx - NODE_W / 2
              const y = n.cy - NODE_H / 2
              const isSel = sel?.type === 'node' && sel.id === n.id
              return (
                <g
                  key={n.id}
                  className="cursor-pointer"
                  onClick={() => setSel({ type: 'node', id: n.id })}
                >
                  {isSel && (
                    <rect
                      x={x - 5}
                      y={y - 5}
                      width={NODE_W + 10}
                      height={NODE_H + 10}
                      rx={18}
                      fill="none"
                      stroke={COLORS.yellowDark}
                      strokeWidth={3}
                    />
                  )}
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={14}
                    fill={s.fill}
                    stroke={s.stroke}
                    strokeWidth={2}
                  />
                  <text
                    x={n.cx}
                    y={n.cy - 4}
                    textAnchor="middle"
                    fontSize={19}
                    fontWeight={800}
                    fill={s.text}
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.cx}
                    y={n.cy + 18}
                    textAnchor="middle"
                    fontSize={12.5}
                    fontWeight={600}
                    fill={s.sub}
                  >
                    {n.sub}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* detail panel */}
        <AnimatePresence mode="wait">
          {selectedNode && (
            <DetailCard
              key={`n-${selectedNode.id}`}
              title={selectedNode.label}
              role={selectedNode.role}
              blurb={selectedNode.blurb}
              moduleIds={[
                ...(selectedNode.moduleId ? [selectedNode.moduleId] : []),
                ...(selectedNode.related ?? []),
              ]}
              onOpen={(id) => navigate(`/pillar/${id}`)}
            />
          )}
          {selectedEdge && (
            <DetailCard
              key={`e-${selectedEdge.id}`}
              title={selectedEdge.label}
              role="The protocol on this hop."
              blurb={selectedEdge.blurb}
              moduleIds={selectedEdge.modules}
              onOpen={(id) => navigate(`/pillar/${id}`)}
            />
          )}
          {!sel && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 rounded-xl bg-jd-green-mist p-4 text-center text-sm text-jd-green-dark ring-1 ring-jd-green/20"
            >
              Nothing selected yet. Tap a box like Ignition or Kafka, or a line
              like MQTT, to learn what it does.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function DetailCard({
  title,
  role,
  blurb,
  moduleIds,
  onOpen,
}: {
  title: string
  role: string
  blurb: string
  moduleIds: string[]
  onOpen: (id: string) => void
}) {
  const mods = moduleIds
    .map((id) => moduleById(id))
    .filter((m): m is NonNullable<ReturnType<typeof moduleById>> => Boolean(m))
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-5"
    >
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-jd-green">
        {role}
      </div>
      <div className="mt-1 text-lg font-extrabold text-jd-green-deep">
        {title}
      </div>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{blurb}</p>
      {mods.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {mods.map((m) => (
            <button
              key={m.id}
              onClick={() => onOpen(m.id)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-jd-green px-3 py-2 text-sm font-bold text-white transition hover:bg-jd-green-dark"
            >
              Open the {m.short} card
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
