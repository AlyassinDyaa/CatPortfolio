import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import { brand, previewing, shows } from './data/site'
import { useReducedMotion } from './hooks/useMedia'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import Gallery from './pages/Gallery'
import Commissions from './pages/Commissions'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const loc = useLocation()
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  useLenis(!reduced)
  // what search engines and link previews say about the site: the blurb from "Name and contact" in the admin
  useEffect(() => { if (brand.blurb) document.querySelector('meta[name="description"]')?.setAttribute('content', brand.blurb) }, [])
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      {/* Between routes the page is turned: a torn sheet of the red paper comes up over the
          screen and carries on out of the top (not on arrival: the opening sheet has just done that job) */}
      <AnimatePresence>
        {ready && !reduced && loc.key !== 'default' && (
          <motion.i key={loc.pathname} className="turn" aria-hidden="true" initial={{ y: '104%' }} animate={{ y: ['104%', '0%', '0%', '-104%'] }} transition={{ duration: 0.9, times: [0, 0.42, 0.52, 1], ease: [0.76, 0, 0.24, 1] }} />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes location={loc} key={loc.pathname}>
          <Route path="/" element={<Home />} />
          {/* a page the admin has hidden has no route, so its address shows "not found" */}
          {shows('pages', 'work') && <Route path="/work" element={<Work />} />}
          {shows('pages', 'gallery') && <Route path="/gallery" element={<Gallery />} />}
          {shows('pages', 'commissions') && <Route path="/commissions" element={<Commissions />} />}
          {shows('pages', 'about') && <Route path="/about" element={<About />} />}
          {shows('pages', 'contact') && <Route path="/contact" element={<Contact />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      {previewing && <div className="fresh-note" role="status">Admin view: showing your latest saved changes. Visitors see them in about a minute.</div>}
    </>
  )
}
