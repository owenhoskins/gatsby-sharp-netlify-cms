import React from 'react'
import { basekick } from '../../utils/typography'

const Title = ({ children, style, onClick }) => (
  <h1
    onClick={onClick}
    css={{
      filter: 'blur(2px)',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      ...basekick({
        typeSizeModifier: 4,
        typeRowSpan: 4,
      }),
      ...style
    }}
  >
    {children}
  </h1>
)

export default Title