import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { asset, brand, commissions, events, fresh, hero, heroPanels, home, marquee, project, redraws, shop, shows, work } from '../data/site'
import { tiltOf } from '../data/tilt'
import { useFinePointer, useReducedMotion } from '../hooks/useMedia'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Ransom from '../components/Ransom'
import Print from '../components/Print'
import Doodle, { Tape } from '../components/Doodle'
import Marquee from '../components/Marquee'
import Magnetic from '../components/Magnetic'
import QuoteLink from '../components/QuoteLink'
import Compare from '../components/Compare'
import Lightbox from '../components/Lightbox'

/* Where the three prints of the pile sit, back to front: [left %, top %, width %, angle]. */
const PILE = [[46, 2, 50, 7], [0, 20, 46, -8], [20, 8, 58, -2]]

/* The pile of prints beside the name. With a mouse they can be picked up and moved about, the
   way loose prints on a desk can; let go and they stay where they were put. */
function Pile() {
  const desk = useRef(null)
  const fine = useFinePointer(), reduced = useReducedMotion()
  const loose = fine && !reduced
  // back to front: the first piece (the one ticked "1") goes on top
  const prints = [...heroPanels].reverse()
  const from = PILE.slice(PILE.length - prints.length)
  return (
    <div className="pile" ref={desk}>
      <i className="pile-paper" aria-hidden="true" />
      {prints.map((p, i) => {
        const [x, y, w, r] = from[i]
        return (
          <motion.div
            key={p.slug} className="pile-print" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, rotate: r }}
            initial={{ opacity: 0, y: 60, rotate: r * 2.5 }} animate={{ opacity: 1, y: 0, rotate: r }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            drag={loose} dragConstraints={desk} dragElastic={0.12} dragMomentum={false} whileDrag={{ scale: 1.04, rotate: 0, zIndex: 5, cursor: 'grabbing' }}
          >
            <Print src={p.src} title={p.title} kind="polaroid" tape={i === prints.length - 1} eager caption={p.title} />
          </motion.div>
        )
      })}
      <Doodle kind="star" className="pile-star" />
      <Doodle kind="star" className="pile-star two" />
      <Doodle kind="heart" className="pile-heart" />
      <Doodle kind="sparkle" className="pile-sparkle" />
      {loose && prints.length > 1 && <span className="pile-hint hand" aria-hidden="true">psst, you can move these</span>}
    </div>
  )
}

/* The discount code on a ticket: a press copies it. */
function Coupon({ code, note }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }).catch(() => { /* not copied: it can still be read and typed */ })
  }
  return (
    <button type="button" className="coupon" onClick={copy} aria-label={`Copy the code ${code}`}>
      <span className="coupon-code">{code}</span>
      <span className="coupon-note" role="status">{copied ? 'Copied!' : note || 'Tap to copy'}</span>
    </button>
  )
}

export default function Home() {
  const [sel, setSel] = useState(null)
  const hire = shows('pages', 'commissions')
  // when the block is named after a category of Work ("Inktober"), it keeps count of the pieces in it
  const drawn = project.title ? work.filter((p) => p.category === project.title).length : 0
  return (
    <Page>
      {/* ---------------------------------------------------------------- the opening spread */}
      <section className="hero">
        <div className="container hero-in">
          <div className="hero-text">
            {hero.kicker && <motion.div className="label" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>{hero.kicker}</motion.div>}
            <Ransom as="h1" className="h-hero" text={brand.name} />
            {brand.tagline && <p className="hero-tag hand">{brand.tagline}<Doodle kind="sparkle" /></p>}
            {hero.text && <p className="lead">{hero.text}</p>}
            <div className="actions">
              {shows('pages', 'work') && <Magnetic><Link className="btn" to="/work">{hero.primaryLabel} <span className="arrow">→</span></Link></Magnetic>}
              {hire && hero.secondaryLabel && <QuoteLink className="btn ghost">{hero.secondaryLabel}</QuoteLink>}
            </div>
            {hire && (
              <Link to="/commissions" className={`seal ${commissions.open ? 'on' : ''}`} aria-label={commissions.open ? 'Commissions are open' : 'Commissions are closed'}>
                <Doodle kind="star" />
                <span>Commissions<b>{commissions.open ? 'open!' : 'closed'}</b></span>
              </Link>
            )}
          </div>
          {heroPanels.length > 0 && <Pile />}
        </div>
      </section>

      {shows('home', 'ticker') && <Marquee items={marquee} />}

      {/* ---------------------------------------------------------------- what is on the desk */}
      {shows('home', 'project') && project.title && (
        <section className="spread">
          <div className="container desk">
            <Reveal className="desk-art">
              {project.image && (
                <a href={project.url || undefined} target="_blank" rel="noreferrer" className="desk-print" aria-label={project.title}>
                  <Tape className="tl" /><Tape className="br" />
                  <img src={asset(project.image)} alt={project.title} loading="lazy" />
                </a>
              )}
              <Doodle kind="star" className="desk-star" />
            </Reveal>
            <Reveal className="note" delay={0.1}>
              <div className="label">{project.label}</div>
              <Ransom as="h2" className="h-lg" text={project.title} />
              {project.subtitle && <p className="hand note-sub">{project.subtitle}</p>}
              {project.text && <p>{project.text}</p>}
              {drawn > 0 && <p className="stamp" aria-label={`${drawn} drawn so far`}><b>{String(drawn).padStart(2, '0')}</b> drawn so far</p>}
              <div className="actions">
                {project.url && <a className="btn" href={project.url} target="_blank" rel="noreferrer">{project.buttonLabel} <span className="arrow">↗</span></a>}
                {project.secondUrl && project.secondLabel && <a className="btn ghost" href={project.secondUrl} target="_blank" rel="noreferrer">{project.secondLabel} <span className="arrow">↗</span></a>}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- the newest pieces, as a sheet of stickers */}
      {shows('home', 'latest') && fresh.length > 0 && (
        <section className="spread">
          <div className="container">
            <div className="spread-head">
              <div>
                {home.latestLabel && <div className="label">{home.latestLabel}</div>}
                <Ransom as="h2" className="h-lg" text={home.latestTitle} />
              </div>
              {shows('pages', 'work') && <Link className="btn ghost sm" to="/work">All the work <span className="arrow">→</span></Link>}
            </div>
            <ul className="sheet">
              {fresh.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={Math.min(i, 6) * 0.06} y={24}>
                  <button type="button" className="peel" onClick={() => setSel(i)} aria-label={`Open ${p.title}`}>
                    <Print src={p.src} title={p.title} kind="sticker" tilt={tiltOf(i)} />
                    <span className="peel-name">{p.title}</span>
                  </button>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- the shop, on brown paper */}
      {shows('home', 'shop') && shop.url && (
        <section className="spread">
          <div className="container">
            <div className="parcel">
              <Reveal className="parcel-text">
                <div className="label">{shop.label}</div>
                <Ransom as="h2" className="h-lg" text={shop.title} />
                {shop.text && <p>{shop.text}</p>}
                {shop.items?.length > 0 && <ul className="tags">{shop.items.map((x) => <li key={x}>{x}</li>)}</ul>}
                {shop.code && <Coupon code={shop.code} note={shop.codeNote} />}
                <div className="actions"><a className="btn" href={shop.url} target="_blank" rel="noreferrer">{shop.buttonLabel} <span className="arrow">↗</span></a></div>
              </Reveal>
              {shop.products?.length > 0 && (
                <ul className="goods">
                  {shop.products.filter((g) => g && g.title).map((g, i) => (
                    <Reveal as="li" key={g.title + i} delay={Math.min(i, 8) * 0.05} y={20}>
                      <a href={g.url || shop.url} target="_blank" rel="noreferrer" className="good">
                        <Print src={g.image} title={g.title} kind="card" tilt={tiltOf(i + 3) / 2} />
                        <span className="good-name">{g.title}</span>
                        {g.price && <span className="good-price">{g.price}</span>}
                      </a>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- sketch to finish */}
      {shows('home', 'redraws') && redraws.length > 0 && (
        <section className="spread">
          <div className="container">
            <div className="spread-head">
              <div>
                {home.redrawLabel && <div className="label">{home.redrawLabel}</div>}
                <Ransom as="h2" className="h-lg" text={home.redrawTitle} />
                {home.redrawText && <p className="lead">{home.redrawText}</p>}
              </div>
            </div>
            <div className="compare-grid">
              {redraws.map((r, i) => <Reveal key={r.slug} delay={i * 0.1}><Compare set={r} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- commissions */}
      {shows('home', 'commissions') && hire && (
        <section className="spread">
          <div className="container">
            <Reveal className="call">
              <Doodle kind="moon" className="call-moon" />
              <Doodle kind="star" className="call-star" />
              <Doodle kind="sparkle" className="call-sparkle" />
              <p className="hand call-lead">{home.commissionsTitle}</p>
              <Ransom as="h2" className="h-xl" text={commissions.open ? 'Open!' : 'Closed'} />
              {commissions.tiers.length > 0 && <ul className="tags on-red">{commissions.tiers.map((t) => <li key={t.name}>{t.name}</li>)}</ul>}
              <div className="actions">
                <QuoteLink className="btn is-cream">{commissions.open ? 'Commission a piece' : 'Ask about commissions'}</QuoteLink>
                <Link className="btn ghost" to="/commissions">{home.commissionsButton} <span className="arrow">→</span></Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- in person */}
      {shows('home', 'events') && events.length > 0 && (
        <section className="spread">
          <div className="container">
            <div className="spread-head">
              <div>
                {home.eventsLabel && <div className="label">{home.eventsLabel}</div>}
                <Ransom as="h2" className="h-lg" text={home.eventsTitle} />
              </div>
            </div>
            <ul className="tickets">
              {events.map((e, i) => (
                <Reveal as="li" key={e.slug} delay={i * 0.07} y={20}>
                  <a className="ticket" href={e.url || undefined} target="_blank" rel="noreferrer">
                    <span className="ticket-when hand">{e.when}</span>
                    <span className="ticket-what"><strong>{e.name}</strong><small>{[e.role, e.place].filter(Boolean).join(' · ')}</small></span>
                    {e.url && <span className="arrow" aria-hidden="true">↗</span>}
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Lightbox items={fresh} sel={sel} setSel={setSel} />
    </Page>
  )
}
