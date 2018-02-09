import React from 'react'
import { basekick } from '../../utils/typography'

const Tab = ({ label, active }) => (
  <div
    css={{
      transition: 'opacity 300ms ease-in-out',
      opacity: active ? 1 : 0.3,
      filter: 'blur(1px)',
      letterSpacing: '3px',
      textTransform: 'lowercase',
      whiteSpace: 'nowrap',
      marginBottom: '2.5rem',
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: 3,
      })
    }}
  >
    {label}
  </div>
)

export default Tab