import React from 'react'
import PropTypes from 'prop-types'
import { basekick } from '../../utils/typography'
import { EASE } from '../../utils/presets'

const Emdash = ({ opacity, y, top }, { color }) => {

  return (
    <span
      css={{
        top: top,
        opacity,
        backgroundColor: color,
        position: `absolute`,
        right: 0,
        transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}, backgroundColor 300ms ${EASE}`,
        transform: `translate3d(0px, ${y}px, 0px)`, // x, y, z
        display: `inline-block`,
        marginLeft: `3rem`,
        letterSpacing: `-1px`,
        filter: `blur(1px)`,
        width: `1rem`,
        height: `2px`
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


Emdash.contextTypes = {
  color: PropTypes.string
}