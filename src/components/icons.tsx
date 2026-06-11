// Lightweight inline stroke icons. No icon-library dependency, works offline.
type IconProps = { className?: string; size?: number }

const base = (size: number) =>
  ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }) as const

export function Menu({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function ChevronLeft({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export function ChevronRight({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function Check({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function Close({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function Spark({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  )
}

export function Trophy({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
    </svg>
  )
}

export function Layers({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <polygon points="12 2 22 8 12 14 2 8 12 2" />
      <polyline points="2 14 12 20 22 14" />
    </svg>
  )
}

export function Clock({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 16 14" />
    </svg>
  )
}

export function Refresh({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6" />
    </svg>
  )
}

export function ArrowRight({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  )
}

export function ArrowUp({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <line x1="12" y1="20" x2="12" y2="4" />
      <polyline points="6 10 12 4 18 10" />
    </svg>
  )
}

export function Tractor({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="7" cy="17" r="4" />
      <circle cx="18" cy="18" r="3" />
      <path d="M7 13V7h5l2 5M12 7h5v6M3 13h2M11 17h4" />
    </svg>
  )
}

export function Target({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Compass({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16 8 14 14 8 16 10 10 16 8" />
    </svg>
  )
}

export function Presenter({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  )
}
