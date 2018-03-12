import React from 'react'
import Link from 'gatsby-link'
import { HeaderLG } from '../Styled'
import { EASE } from '../../utils/presets'

const NameList = ({ inViewKey, column, handleClick }) => (

  <div
    css={{
      height: `25rem`,
      alignSelf: `center`
    }}
  >
    {
      column.map(({slug, title, type, first, last }) => {
        return (
          <HeaderLG
            key={slug}
            style={{
              willChange: `opacity, filter`,
              opacity: type == inViewKey ? 1 : 0.3,
              filter: type == inViewKey ? `` : `blur(2px)`,
              transition: `opacity 300ms ${EASE}`,
              marginBottom: last ? '2.5rem' : 0
            }}
          >
            <Link to={slug}>{title}</Link>
          </HeaderLG>
        )
      })
    }

  {/*
  <p>{refKey}</p>
  <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>
  */}
  </div>

)

export default NameList