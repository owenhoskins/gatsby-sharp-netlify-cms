import React from 'react'
import Link from 'gatsby-link'
import { basekick } from '../../utils/typography'

const Item = ({ title, active, isVisible, onClick, index }) => {

  let opacity
  if (isVisible) {
    opacity = 0.3
    if (active) {
      opacity = 1
    }
  } else {
    opacity = 0
    if (active) {
      opacity = 1
    }
  }

  const handleOnClick = () => {
    if (onClick) {
      onClick(index, title.replace(/\s+/g, ''))
    }
  }

  return (
    <Link to={`/${title}`}>
      <div
        // onClick={handleOnClick}
        css={{
          transition: 'opacity 300ms ease-in-out',
          //opacity: active ? 1 : 0.3,
          opacity,
          filter: 'blur(1px)',
          letterSpacing: '3px',
          textTransform: 'lowercase',
          ...basekick({
            typeSizeModifier: 0.875,
            typeRowSpan: 3,
          })
        }}
      >
        {title}
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
    </Link>
  )
}
export default Item
