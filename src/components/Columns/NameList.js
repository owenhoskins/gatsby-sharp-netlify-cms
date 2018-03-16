import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { HeaderLG } from '../Styled'
import { EASE } from '../../utils/presets'
import { get } from 'lodash'

const NameList = ({ onHover, inViewKey, column, handleClick }, { setBase64 }) => (


  <div
    css={{
      height: `25rem`,
      alignSelf: `center`
    }}
  >
    {
      column.map(({slug, cover, title, type, first, last }) => {

        const onMouseEnter = () => {
          const base64 = get(cover, 'childImageSharp.sizes.base64', '')
          if (setBase64) setBase64(base64)
          if (onHover) onHover(type)
        }

        return (
          <div
            onMouseEnter={onMouseEnter}
          >
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
        </div>
        )
      })
    }

  {/*
  <p>{refKey}</p>
  <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>
  */}
  </div>

)

NameList.contextTypes = {
  setBase64: PropTypes.func
}

export default NameList