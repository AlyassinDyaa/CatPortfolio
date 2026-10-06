import { useState } from 'react'
import { Link } from 'react-router-dom'
import { asset, brand, commissions, footer, nav, shows, social } from '../data/site'
import SocialIcon from './SocialIcon'
import Wordmark from './Wordmark'
import QuoteLink from './QuoteLink'
import Ransom from './Ransom'
import Doodle from './Doodle'

/* The inside back cover: a sheet of the red paper, torn along its top edge. The closing line in
   cut-out letters with what to do next, then who this is, the pages, and where else to find her. */
export default function Footer() {
  const [year] = useState(() => new Date().getFullYear()) // read on every visit, so the © line rolls over by itself on 1 January
  const hire = shows('pages', 'commissions')
  return (
    <footer className="footer">
      <div className="container">
        <div className="ft-end">
          <Doodle kind="star" className="ft-star" />
          <Doodle kind="sparkle" className="ft-sparkle" />
          {footer.line && <Ransom as="p" className="ft-line" text={footer.line} />}
          <div className="actions">
            {hire && <QuoteLink className="btn is-cream">{commissions.open ? 'Commission a piece' : 'Ask about commissions'}</QuoteLink>}
            {hire && <Link className="btn ghost" to="/commissions">How it works <span className="arrow">→</span></Link>}
          </div>
        </div>
        <div className="ft">
          <div className="ft-brand">
            <Link to="/" className="ft-mark" aria-label={`${brand.name} home`}>
              {brand.logo && <img src={asset(brand.logo)} alt="" width="54" height="54" />}
              <Wordmark className="lg" />
            </Link>
            <p>{brand.blurb}</p>
            {brand.email && <a className="mail" href={`mailto:${brand.email}`}>{brand.email}</a>}
          </div>
          <div>
            <div className="label">Pages</div>
            <ul className="ft-list">
              {nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            </ul>
          </div>
          {social.length > 0 && (
            <div>
              <div className="label">Find me</div>
              <ul className="social">
                {social.map((s) => (
                  <li key={s.label + s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      <SocialIcon name={s.label} />
                      <span><strong>{s.label}</strong>{s.handle && <small>{s.handle}</small>}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="footer-fine">
          <span>© {year} {brand.artist || brand.name}. {footer.fine}</span>
          {brand.location && <span>{brand.location}</span>}
        </div>
      </div>
    </footer>
  )
}
