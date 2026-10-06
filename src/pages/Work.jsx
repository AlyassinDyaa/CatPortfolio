import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, day, home, pages, redraws, work } from '../data/site'
import { tiltOf } from '../data/tilt'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Print from '../components/Print'
import Compare from '../components/Compare'
import Lightbox from '../components/Lightbox'
import PageHead from '../components/PageHead'
import Ransom from '../components/Ransom'

export default function Work() {
  const [filter, setFilter] = useState('All')
  const [sel, setSel] = useState(null)
  const shown = useMemo(() => (filter === 'All' ? work : work.filter((p) => p.category === filter)), [filter])
  const count = (c) => (c === 'All' ? work.length : work.filter((p) => p.category === c).length)
  const choose = (c) => { setSel(null); setFilter(c) }
  return (
    <Page title="Work">
      <PageHead label={pages.work.label} title={pages.work.title} lead={pages.work.intro}>
        {categories.length > 1 && (
          <div className="filters" role="group" aria-label="Show">
            {['All', ...categories].map((c) => (
              <button key={c} type="button" className={`chip ${filter === c ? 'on' : ''}`} aria-pressed={filter === c} onClick={() => choose(c)}>
                {c}<small>{count(c)}</small>
              </button>
            ))}
          </div>
        )}
      </PageHead>

      {/* every piece as a print with a white edge, its name written underneath */}
      <section className="spread is-first">
        <div className="container">
          <motion.ul className="wall" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p, i) => (
                <motion.li key={p.slug} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  <button type="button" className="pin" onClick={() => setSel(i)} aria-label={`Open ${p.title}`}>
                    <Print src={p.src} title={p.title} kind="polaroid" tilt={tiltOf(i)} tape={i % 3 === 0} eager={i < 4} caption={p.title} />
                    <small>{[p.category, day(p.date)].filter(Boolean).join(' · ')}</small>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      {redraws.length > 0 && filter === 'All' && (
        <section className="spread">
          <div className="container">
            <div className="spread-head">
              <div>
                {home.redrawLabel && <div className="label">{home.redrawLabel}</div>}
                <Ransom as="h2" className="h-lg" text={home.redrawTitle} />
              </div>
            </div>
            <div className="compare-grid">
              {redraws.map((r, i) => <Reveal key={r.slug} delay={i * 0.1}><Compare set={r} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <Lightbox items={shown} sel={sel} setSel={setSel} />
    </Page>
  )
}
