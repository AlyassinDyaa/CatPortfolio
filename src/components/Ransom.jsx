/* A heading set the way the covers of Cat's reels are: every letter cut from a different
   magazine and glued down, each on its own scrap of paper, in its own face, at its own angle.
   The cut is worked out from the words themselves, so a heading always looks the same from one
   visit to the next, and no two headings look alike.
   Screen readers are given the plain words; the scraps are decoration. */
const FACES = ['f-fat', 'f-didone', 'f-slab', 'f-tall', 'f-type']
// the paper the letters are cut from: mostly white and pinks, the pastels, and now and then red pen or plum
const SCRAPS = ['s-ox', 's-cream', 's-pink', 's-lilac', 's-ox', 's-red', 's-sky', 's-cream', 's-gold', 's-ox', 's-mint', 's-pink', 's-kraft', 's-ink']
const CUTS = 5

const hash = (text) => {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

export default function Ransom({ text = '', as: Tag = 'span', className = '', pop = false }) {
  const words = String(text).trim().split(/\s+/).filter(Boolean)
  let n = 0, last = ''
  return (
    <Tag className={`ransom ${pop ? 'is-pop' : ''} ${className}`} aria-label={String(text)}>
      {words.map((word, w) => (
        <span className="ransom-word" key={w} aria-hidden="true">
          {[...word].map((ch, i) => {
            const h = hash(`${text}/${n}/${ch}`)
            let scrap = SCRAPS[h % SCRAPS.length]
            if (scrap === last) scrap = SCRAPS[(h + 1) % SCRAPS.length] // never two scraps of the same paper side by side
            last = scrap
            const letter = /[a-z]/i.test(ch) ? ((h >>> 9) % 3 ? ch.toUpperCase() : ch.toLowerCase()) : ch
            const style = { '--r': `${((h >>> 4) % 11) - 5}deg`, '--y': `${(((h >>> 13) % 7) - 3) * 0.018}em`, '--i': n }
            n += 1
            return <span key={i} className={`ransom-l ${FACES[(h >>> 17) % FACES.length]} ${scrap} cut-${(h >>> 21) % CUTS}`} style={style}>{letter}</span>
          })}
        </span>
      ))}
    </Tag>
  )
}
