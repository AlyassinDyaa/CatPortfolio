import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { asset, brand, commissions, nav, shows, social } from '../data/site'
import Wordmark from './Wordmark'
import ThemeSwitch from './ThemeSwitch'
import Doodle from './Doodle'

function Status() {
  return <><i className={commissions.open ? 'on' : ''} />{commissions.open ? 'Commissions open' : 'Commissions closed'}</>
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    window.__lenis?.[open ? 'stop' : 'start']?.()
  }, [open])
  const hire = shows('pages', 'commissions')

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="container nav-bar">
          <Link to="/" className="brand" aria-label={`${brand.name} home`} onClick={() => setOpen(false)}>
            {brand.logo && <img className="brand-logo" src={asset(brand.logo)} alt="" width="42" height="42" />}
            <Wordmark />
          </Link>
          {/* the pages, each one underlined with a swipe of marker when it is the open one */}
          <nav className="nav-links" aria-label="Main">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end className={({ isActive }) => `nav-link ${isActive ? 'on' : ''}`}>{n.label}</NavLink>)}
          </nav>
          {hire && <Link className="nav-status" to="/commissions"><Status /></Link>}
          <ThemeSwitch />
          <button className={`burger ${open ? 'open' : ''}`} aria-expanded={open} aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            <div className="container menu-inner">
              <ul className="menu-links">
                {nav.map((n, i) => (
                  <motion.li key={n.to} style={{ '--tilt': `${i % 2 ? 1.5 : -1.5}deg` }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <NavLink to={n.to} end onClick={() => setOpen(false)}>{n.label}</NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="menu-foot">
                {hire && <span className="nav-status"><Status /></span>}
                <ul>{social.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
              </div>
              <Doodle kind="star" className="menu-star" />
              <Doodle kind="heart" className="menu-heart" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
