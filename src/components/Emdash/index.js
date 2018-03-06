import React from 'react'
import PropTypes from 'prop-types'
import { basekick } from '../../utils/typography'
import { EASE } from '../../utils/presets'

const Emdash = ({ timeout = 300, opacity, y, top, style }, { color }) => {

  return (
    <span
      css={{
        top: top,
        opacity,
        backgroundColor: color,
        position: `absolute`,
        right: 0,
        transition: `opacity ${timeout}ms ${EASE}, transform ${timeout}ms ${EASE}, backgroundColor ${timeout}ms ${EASE}`,
        transform: `translate3d(0px, ${y}px, 0px)`, // x, y, z
        display: `inline-block`,
        marginLeft: `3rem`,
        letterSpacing: `-1px`,
        filter: `blur(1px)`,
        width: `1rem`,
        height: `2px`,
        ...style
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