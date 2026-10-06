import { useState } from 'react'
import { brand, commissions, quote, work } from '../data/site'
import Page from '../components/Page'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import Picker from '../components/Picker'
import PageHead from '../components/PageHead'
import Ransom from '../components/Ransom'
import Doodle from '../components/Doodle'

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
/* What is drawn in the window of each card, in turn. */
const SIGNS = ['moon', 'star', 'sparkle', 'heart']

export default function Commissions() {
  const [sent, setSent] = useState(false)
  const { open, title, intro, tiers, steps, notes, processLabel, processTitle, requestLabel, requestTitle, closedTitle, closedText } = commissions
  const kinds = [...tiers.map((t) => t.name), 'Something else']
  // with no email and no form service to send to, the request goes to Instagram instead of a form
  const form = Boolean(brand.email || brand.contactAction)
  const submit = (e) => {
    if (brand.contactAction) return
    e.preventDefault()
    const d = new FormData(e.target)
    const body = encodeURIComponent(`${d.get('idea')}\n\nReference pictures: ${d.get('refs') || 'none yet'}\nNeeded by: ${d.get('due') || 'no deadline'}\n\n— ${d.get('name')} (${d.get('email')})`)
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(`Commission: ${d.get('kind')} for ${d.get('name')}`)}&body=${body}`
    setSent(true)
  }
  return (
    <Page title="Commissions">
      <PageHead label="Commissions" title={title} lead={intro} art={work.find((p) => p.src)?.src}>
        <div className={`status ${open ? 'on' : ''}`}><i />{open ? 'Commissions are open' : 'Commissions are closed right now'}</div>
      </PageHead>

      {/* the offers, dealt out like a spread of tarot cards */}
      {tiers.length > 0 && (
        <section className="spread is-first">
          <div className="container">
            <div className="tarot-row">
              {tiers.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08} className="cell">
                  <article className="tarot" style={{ '--tilt': `${[-1.5, 1, -0.8, 1.6][i % 4]}deg` }}>
                    <div className="tarot-in">
                      <header className="tarot-window">
                        <span className="tarot-no" aria-hidden="true">{NUMERALS[i] || i + 1}</span>
                        <Doodle kind={SIGNS[i % SIGNS.length]} />
                      </header>
                      <h2 className="display">{t.name}</h2>
                      <p>{t.text}</p>
                      {t.includes?.length > 0 && <ul>{t.includes.map((x) => <li key={x}>{x}</li>)}</ul>}
                      {/* the foot: the price if there is one, and the way to a quote */}
                      {quote.url
                        ? <a className="tarot-go" href={quote.url} target="_blank" rel="noreferrer"><span>{t.price || quote.label}</span><i aria-hidden="true">↗</i></a>
                        : <div className="tarot-go"><span>{t.price || 'Ask for a quote'}</span></div>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* how it works, written out like a recipe on a page of the notebook */}
      {steps.length > 0 && (
        <section className="spread">
          <div className="container">
            <div className="spread-head">
              <div>
                {processLabel && <div className="label">{processLabel}</div>}
                <Ransom as="h2" className="h-lg" text={processTitle} />
              </div>
            </div>
            <ol className="recipe">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08} y={20}>
                  <span className="recipe-n" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="display h-sm">{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="spread" id="request">
        <div className="container cm">
          <Reveal className="note">
            {requestLabel && <div className="label">{requestLabel}</div>}
            <Ransom as="h2" className="h-lg" text={open ? requestTitle : closedTitle} />
            {!open && closedText && <p className="lead">{closedText}</p>}
            {notes.length > 0 && <ul className="notes">{notes.map((x) => <li key={x}>{x}</li>)}</ul>}
          </Reveal>
          {form ? (
            <Reveal className="letter" delay={0.1}>
              <form onSubmit={submit} action={brand.contactAction || undefined} method={brand.contactAction ? 'post' : undefined}>
                <div className="field"><input id="c-name" name="name" type="text" placeholder=" " required autoComplete="name" /><label htmlFor="c-name">Your name</label></div>
                <div className="field"><input id="c-email" name="email" type="email" placeholder=" " required autoComplete="email" /><label htmlFor="c-email">Email</label></div>
                <Picker label="What kind of piece" name="kind" options={kinds} />
                <div className="field"><textarea id="c-idea" name="idea" placeholder=" " required rows={5} /><label htmlFor="c-idea">The idea: who or what, the mood, the pose</label></div>
                <div className="field"><input id="c-refs" name="refs" type="text" placeholder=" " /><label htmlFor="c-refs">Link to reference pictures (optional)</label></div>
                <div className="field"><input id="c-due" name="due" type="text" placeholder=" " /><label htmlFor="c-due">Needed by (optional)</label></div>
                <Magnetic><button className="btn" type="submit">{sent ? 'Opening your mail app…' : 'Send the request'} <span className="arrow">→</span></button></Magnetic>
                <p className="form-alt">
                  {brand.email && <>Or write to <a href={`mailto:${brand.email}`}>{brand.email}</a>. </>}
                  {quote.url && <>For a quick quote, <a href={quote.url} target="_blank" rel="noreferrer">message me on Instagram</a>.</>}
                </p>
              </form>
            </Reveal>
          ) : (
            <Reveal className="call dm" delay={0.1}>
              <Doodle kind="heart" className="call-star" />
              <p className="dm-say">Send me the idea. I answer every message, with a quote.</p>
              {quote.url && <Magnetic><a className="btn is-cream" href={quote.url} target="_blank" rel="noreferrer">{quote.label} on Instagram <span className="arrow">↗</span></a></Magnetic>}
              {brand.handle && <p className="hand dm-handle">{brand.handle}</p>}
            </Reveal>
          )}
        </div>
      </section>
    </Page>
  )
}
