import React from 'react'
import { basekick } from '../../utils/typography'

const Subline = ({ children, style }) => (
  <h3
    css={{
      letterSpacing: '2px',
      textTransform: 'uppercase',
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: 3,
      }),
      ...style
    }}
  >
    {children}
  </h3>
)

export default Subline