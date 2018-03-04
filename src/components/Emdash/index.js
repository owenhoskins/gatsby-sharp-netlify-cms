import React from 'react'
import { basekick } from '../../utils/typography'

// http://easings.net/#easeInOutQuad
// const ease = `cubic-bezier(0.6, 0.04, 0.98, 0.335)` // easeInCirc
const ease = `cubic-bezier(0.455, 0.03, 0.515, 0.955)` // easeInOutQuad

const Emdash = ({ opacity, y, top }) => {

  return (
    <span
      css={{
        opacity,
        position: 'absolute',
        right: 0,
        top: top,
        transition: `opacity 300ms ease-in-out, transform 300ms ${ease}`,
        transform: `translate3d(0px, ${y}px, 0px)`, // x, y, z
        display: 'inline-block',
        marginLeft: '3rem',
        letterSpacing: '-1px',
        filter: 'blur(1px)',
        width: '1rem',
        height: 0,
        borderTop: `2px solid #575483`
      }}
    >
     {` `}
    </span>
  )

}

Emdash.defaultProps = {
  y: '0px',
  top: '0px'
}

export default Emdash
