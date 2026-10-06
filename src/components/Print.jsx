import { useState } from 'react'
import { asset } from '../data/site'
import { Tape } from './Doodle'

/* One picture as a thing you could pick up. `kind` says what it is:
     polaroid  a print with a white edge and room under it for a handwritten caption (cropped to the frame)
     sticker   die-cut, a white edge all round, shown whole at its own shape
     card      a photocard: rounded, cropped to the card
   `tilt` is the angle it was stuck down at; `tape` adds a strip of tape across the top.
   Until a picture has been uploaded it shows blank paper with the title written on, so the site
   never has holes. */
export default function Print({ src, title = '', kind = 'polaroid', tilt = 0, tape = false, eager = false, caption, className = '' }) {
  // Until the file arrives, CSS holds a slot open so the layout does not collapse and jump.
  const [loaded, setLoaded] = useState(false)
  return (
    <span className={`print is-${kind} ${className}`} style={{ '--tilt': `${tilt}deg` }}>
      {tape && <Tape />}
      <span className="print-art">
        {src
          ? <img className={loaded ? undefined : 'pending'} src={asset(src)} alt={title} loading={eager ? 'eager' : 'lazy'} draggable="false" onLoad={() => setLoaded(true)} />
          : <span className="print-blank" role="img" aria-label={title}>{title}</span>}
      </span>
      {caption && <span className="print-cap">{caption}</span>}
    </span>
  )
}

