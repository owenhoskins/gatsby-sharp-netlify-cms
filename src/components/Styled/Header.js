import React from 'react'
import { basekick } from '../../utils/typography'
import { MIN_MOBILE_MQ } from '../../utils/presets'

export const HeaderXL = ({ children, style, onClick }) => (
  <h1
    onClick={onClick}
    css={{
      filter: 'blur(2px)',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      fontWeight: 400,
      ...basekick({
        typeSizeModifier: 4,
        typeRowSpan: 8,
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
      fontWeight: 400,
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
      fontWeight: 400,
      ...basekick({
        typeSizeModifier: 1.125,
        typeRowSpan: 2,
      }),
      [MIN_MOBILE_MQ]: {
        ...basekick({
          typeSizeModifier: 1.5,
          typeRowSpan: 3,
        }),
      },
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
      fontWeight: 400,
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
