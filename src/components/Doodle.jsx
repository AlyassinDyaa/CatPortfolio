/* The bits stuck around a scrapbook page: gold glitter stars, hearts scribbled in red pen, a
   crescent moon, four-point sparkles and strips of tape. All decoration, hidden from screen readers. */
const SHAPES = {
  star: { box: '0 0 100 100', d: 'M50 6c3 0 5 2 6 5l9 22 24 2c7 1 9 8 4 12L75 63l6 23c1 7-5 11-11 8L50 81 30 94c-6 3-12-1-11-8l6-23L7 47c-5-4-3-11 4-12l24-2 9-22c1-3 3-5 6-5z' },
  sparkle: { box: '0 0 100 100', d: 'M50 2c3 26 12 39 48 48-36 9-45 22-48 48-3-26-12-39-48-48 36-9 45-22 48-48z' },
  moon: { box: '0 0 100 100', d: 'M68 6a46 46 0 1 0 26 62A38 38 0 0 1 68 6z' },
}
// a heart drawn in one go and scribbled in, the way it is on her reel covers
const HEART = 'M50 88C20 66 8 50 10 34 12 18 30 12 42 22c4 3 6 7 8 11 2-4 4-8 8-11 12-10 30-4 32 12 2 16-10 32-40 54z'
const SCRIBBLE = 'M20 32l12-8-14 22 26-24-28 36 38-34-32 44 42-40-34 48 44-42-30 44 36-34-22 32'

export default function Doodle({ kind = 'star', className = '', style }) {
  if (kind === 'heart') {
    return (
      <svg className={`doodle is-heart ${className}`} style={style} viewBox="0 0 100 100" aria-hidden="true">
        <path className="doodle-paper" d={HEART} />
        <path className="doodle-pen" d={SCRIBBLE} />
        <path className="doodle-pen" d={HEART} />
      </svg>
    )
  }
  const shape = SHAPES[kind] || SHAPES.star
  return (
    <svg className={`doodle is-${kind} ${className}`} style={style} viewBox={shape.box} aria-hidden="true">
      <path d={shape.d} />
    </svg>
  )
}

/* A strip of washi tape holding something down. */
export function Tape({ className = '', style }) {
  return <i className={`tape ${className}`} style={style} aria-hidden="true" />
}
