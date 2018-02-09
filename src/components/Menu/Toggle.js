import React from 'react'

import { basekick } from '../../utils/typography'

const Toggle = ({ children }) => (
  <div
    css={{
      transition: 'opacity 300ms ease-in-out',
      opacity: 1,
      filter: 'blur(1px)',
      letterSpacing: '3px',
      textTransform: 'lowercase',
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: 3,
      })
    }}
  >
    {children}
    <span
      css={{
        display: 'inline-block',
        marginLeft: '3rem',
        letterSpacing: '-1px'
      }}
    >
     {`——`}
    </span>
  </div>
)

export default Toggle
