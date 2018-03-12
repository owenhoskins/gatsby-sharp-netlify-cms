import React from 'react'
import { basekick } from '../../utils/typography'
import { MIN_MOBILE_MQ, EASE } from '../../utils/presets'

export const HeaderXL = ({ children, style, onClick, weight }) => (
  <h1
    onClick={onClick}
    css={{
      filter: 'blur(2px)',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      fontWeight: 200,
      ...basekick({
        typeSizeModifier: 4,
        typeRowSpan: 8,
      }),
      fontWeight: weight || 200,
      ...style
    }}
  >
    {children}
  </h1>
)

export const HeaderLG = ({ children, style, uppercase, blur }) => (
  <h2
    css={{
      transform: `color 300ms ${EASE}`,
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: 200,
      ...basekick({
        typeSizeModifier: 2,
        typeRowSpan: 5,
      }),
      marginBottom: 0,
      ...style
  }}
  >
    {children}
  </h2>
)

export const HeaderMD = ({ children, style, uppercase, blur }) => (
  <h2
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: 200,
      ...basekick({
        typeSizeModifier: 1.125,
        typeRowSpan: 2,
      }),
      [MIN_MOBILE_MQ]: {
        ...basekick({
          typeSizeModifier: 1.5,
          typeRowSpan: 4.5,
        }),
      },
      ...style
    }}
  >
    {children}
  </h2>
)

export const HeaderSM = ({ children, style, uppercase, blur }) => (
  <h3
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: 400,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 1,
        typeRowSpan: 2,
      }),
      [MIN_MOBILE_MQ]: {
        ...basekick({
          typeSizeModifier: 1.125,
          typeRowSpan: uppercase ? 2 : 4,
        }),
      },
      ...style
    }}
  >
    {children}
  </h3>
)

export const HeaderXS = ({ children, style, uppercase, blur }) => (
  <h3
    css={{
      letterSpacing: uppercase ? '2px' : 0,
      filter: blur ? 'blur(1px)' : 'blur(0)',
      textTransform: uppercase ? 'uppercase' : 'none',
      fontWeight: 700,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: uppercase ? 2 : 3,
      }),
      ...style
    }}
  >
    {children}
  </h3>
)

export const Paragraph = ({ children, style }) => (
  <p
    css={{
      fontWeight: 400,
      marginBottom: 0,
      ...basekick({
        typeSizeModifier: 0.875,
        typeRowSpan: 3,
      }),
      ...style
    }}
  >
    {children}
  </p>
)

export const Blurry = ({ children, style, inline, opacity, weight }) => (
  <div
    css={{
      opacity: opacity || 1,
      transition: `opacity 300ms ${EASE}`,
      display: inline ? 'inline-block' : 'block',
      filter: 'blur(1px)',
      letterSpacing: '3px',
      textTransform: 'lowercase',
      ...basekick({
        //typeSizeModifier: 0.875,
        typeSizeModifier: 0.9375,
        //typeSizeModifier: 1,
        typeRowSpan: 3,
      }),
      fontWeight: weight || 200,
      ...style
    }}
  >
    {children}
  </div>
)

