// John Deere brand tokens, for use in TS and SVG where Tailwind cannot reach.
export const COLORS = {
  green: '#367C2B',
  greenDark: '#23501C',
  greenDeep: '#16320F',
  greenMist: '#E8F0E4',
  yellow: '#FFDE00',
  yellowDark: '#C9A800',
  yellowSoft: '#FFF6C2',
  cream: '#F7F8F4',
  ink: '#1A1A1A',
  inkSoft: '#4A4A4A',
  line: '#E2E4DD',
} as const

// Accent rotation used for cards / pillars so the screens don't feel flat.
export const ACCENTS = [COLORS.green, COLORS.greenDark, COLORS.yellowDark] as const
