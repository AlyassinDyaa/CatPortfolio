import Ransom from './Ransom'
import Print from './Print'
import Doodle from './Doodle'

/* The top of every page but the home page: a label punched out of label tape, the title in
   cut-out letters, a sentence, and whatever is passed inside (filters, a status, buttons).
   Given a picture (`art`), it is taped up at the right, at an angle. */
export default function PageHead({ label, title, lead, art, artTitle, children }) {
  return (
    <header className={`container page-head ${art ? 'has-art' : ''}`}>
      <div className="page-head-text">
        {label && <div className="label">{label}</div>}
        <Ransom as="h1" className="h-xl" text={title} />
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
      {art && (
        <div className="page-head-art" aria-hidden="true">
          <Print src={art} title={artTitle} kind="polaroid" tilt={3} tape eager />
          <Doodle kind="star" className="ph-star" />
          <Doodle kind="heart" className="ph-heart" />
        </div>
      )}
    </header>
  )
}
