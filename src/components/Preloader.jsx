import { useEffect, useRef, useState } from 'react'
import { brand, nameParts } from '../data/site'
import { useReducedMotion } from '../hooks/useMedia'
import Ransom from './Ransom'
import Doodle from './Doodle'

/* The cover of the scrapbook: a sheet of the red paper with her first name glued on, a letter
   at a time. Then the cover is lifted away.
   The whole sequence is plain CSS (see .preloader in components.css) and ends with the sheet
   hidden, so it cannot get stuck on screen; the timers here only tell the site when the lift
   starts and take the sheet out of the page once it is over. */
const LIFT_AT = 1250 // ms: the same moment the CSS starts the lift
const OVER_AT = 2000

export default function Preloader({ onDone }) {
  const reduced = useReducedMotion()
  const [over, setOver] = useState(false)
  const done = useRef(onDone)
  useEffect(() => { done.current = onDone })
  useEffect(() => {
    const start = setTimeout(() => done.current?.(), reduced ? 0 : LIFT_AT)
    const end = setTimeout(() => setOver(true), reduced ? 0 : OVER_AT)
    return () => { clearTimeout(start); clearTimeout(end) }
  }, [reduced])
  if (over || reduced) return null
  return (
    <div className="preloader" role="status" aria-label={`${brand.name} is loading`}>
      <Ransom className="preloader-name" text={nameParts(brand.name)[0]} pop />
      <Doodle kind="star" className="preloader-star" />
    </div>
  )
}
