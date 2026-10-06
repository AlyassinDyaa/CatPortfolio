import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useMedia'
import Doodle from './Doodle'

/* A long strip of red tape stuck across the page under the hero, with words running along it. */
export default function Marquee({ items, speed = 34 }) {
  const reduced = useReducedMotion()
  if (!items.length) return null
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="band" aria-hidden="true">
      <motion.div className="band-track" animate={reduced ? {} : { x: ['0%', '-50%'] }} transition={{ duration: speed, ease: 'linear', repeat: Infinity }}>
        {row.map((t, i) => <span className="band-item" key={i}>{t}<Doodle kind="sparkle" /></span>)}
      </motion.div>
    </div>
  )
}
