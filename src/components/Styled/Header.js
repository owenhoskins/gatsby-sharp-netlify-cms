import React from 'react'
import { basekick } from '../../utils/typography'

export const HeaderXL = ({ children, style, onClick }) => (
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

export const HeaderLG = ({ children, style }) => (
  <h2
    css={{
      letterSpacing: '2px',
      filter: 'blur(1px)',
      textTransform: 'uppercase',
      ...basekick({
        typeSizeModifier: 2,
        typeRowSpan: 4,
      }),
      ...style
    }}
  >
    {children}
  </h2>
)

export const HeaderMD = ({ children, style }) => (
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

export const HeaderSM = ({ children, style }) => (
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
