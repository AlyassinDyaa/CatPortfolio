import { Link } from 'react-router-dom'
import { about, asset, brand, shows, social } from '../data/site'
import { tiltOf } from '../data/tilt'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Print from '../components/Print'
import SocialIcon from '../components/SocialIcon'
import PageHead from '../components/PageHead'
import QuoteLink from '../components/QuoteLink'
import Doodle from '../components/Doodle'

/* The About page is kept like a diary: a title page, then an entry at a time (a taped-in
   picture and the words beside it, swapping sides as it goes), then a page out of a slam book
   with her answers written in, and where to find her. */
export default function About() {
  return (
    <Page title="About">
      <PageHead label={brand.artist || brand.name} title={about.title} lead={about.intro} art={about.image}>
        <div className="actions">
          <QuoteLink>Commission a piece</QuoteLink>
          {shows('pages', 'work') && <Link className="btn ghost" to="/work">See the work</Link>}
        </div>
      </PageHead>

      {about.story.length > 0 && (
        <section className="spread is-first">
          <div className="container">
            <ol className="diary">
              {about.story.map((s, i) => (
                <Reveal as="li" key={i} className={`entry ${s.image ? 'has-art' : ''} ${i % 2 ? 'is-flipped' : ''}`} y={28}>
                  {s.image && <div className="entry-art" aria-hidden="true"><Print src={s.image} kind="polaroid" tilt={tiltOf(i + 1)} tape /></div>}
                  <div className="entry-text">
                    <span className="hand entry-no" aria-hidden="true">entry no. {i + 1}</span>
                    {s.title && <h2 className="display h-md">{s.title}</h2>}
                    <p className="lead">{s.text}</p>
                    {s.url && <a className="btn" href={s.url} target="_blank" rel="noreferrer">{s.button || 'See more'} <span className="arrow">↗</span></a>}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {(about.facts.length > 0 || social.length > 0) && (
        <section className="spread">
          <div className="container ab">
            {about.facts.length > 0 && (
              <Reveal className="slam">
                {/* set out like the page a friend fills in in a slam book */}
                <div className="slam-head">
                  {brand.logo && <img src={asset(brand.logo)} alt="" width="56" height="56" />}
                  <span><b className="display">All about me</b><small>fill in with your best glitter pen</small></span>
                  <Doodle kind="star" />
                </div>
                <dl className="slam-rows">
                  {about.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd className="hand">{f.value}</dd></div>)}
                </dl>
              </Reveal>
            )}
            {social.length > 0 && (
              <Reveal className="note ab-links" delay={0.08}>
                <h2 className="display h-md">Find me</h2>
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
              </Reveal>
            )}
          </div>
        </section>
      )}
    </Page>
  )
}
