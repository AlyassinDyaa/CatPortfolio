/* The angles things are stuck down at, in turn, so a row of them never lines up. */
const TILTS = [-2.5, 1.8, -1.2, 2.6, -1.8, 1.2, -3, 2.2]
export const tiltOf = (i) => TILTS[i % TILTS.length]
