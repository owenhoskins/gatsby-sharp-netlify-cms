import React from 'react'
//import Headroom from 'react-headroom'
import { HeaderMD, HeaderXS } from '../Styled'

const Header = ({ name, instagram, enquire, isCover }) => (
    <div
      disableInlineStyles
      style={{
        opacity: isCover ? 0 : 1,
        pointerEvents: isCover ? 'none' : 'auto'
      }}
    >
      <HeaderMD
        uppercase
        style={{
          display: 'inline-block'
        }}>
        {name}
      </HeaderMD>
      <div css={{ float: 'right' }}>
        <HeaderXS
          uppercase
          style={{
            display: 'inline-block',
            marginRight: '3rem'
          }}
        >
          <a href={`https://instagram.com/${instagram}`} target='_blank'>
            {`Instagram`}
          </a>
        </HeaderXS>
        <HeaderXS
          uppercase
          style={{
            display: 'inline-block'
          }}
        >
          <a href={`mailto:${enquire}`}>
            {`Email Agent`}
          </a>
        </HeaderXS>
      </div>
  </div>
)

export default Header
