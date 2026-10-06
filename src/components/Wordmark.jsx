import { brand, nameParts } from '../data/site'

/* The name as a signature: the second half of a two-part name takes the red. */
export default function Wordmark({ className = '' }) {
  const [a, b] = nameParts(brand.name)
  return <span className={`wordmark ${className}`}>{a}{b && <b>{brand.name.includes(' ') ? ' ' : ''}{b}</b>}</span>
}
