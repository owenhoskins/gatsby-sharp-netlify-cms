import React from 'react'
import { basekick } from '../../utils/typography'

const Headline = ({ children, style }) => (
  <h2
    css={{
      letterSpacing: '2px',
      textTransform: 'uppercase',
      ...basekick({
        typeSizeModifier: 1.5,
        typeRowSpan: 3,
      }),
      ...style
    }}
  >
    {children}
  </h2>
)

export default Headline