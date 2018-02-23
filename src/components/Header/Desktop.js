import React from 'react'
import Headroom from 'react-headroom'
import { HeaderMD, HeaderSM } from '../Styled'

const Header = ({ name, instagram, enquire, isCover }) => (
    <Headroom
      disableInlineStyles
      style={{
        opacity: isCover ? 0 : 1,
        pointerEvents: isCover ? 'none' : 'auto'
      }}
    >
      <HeaderMD
        style={{
          display: 'inline-block'
        }}>
        {name}
      </HeaderMD>
      <div css={{ float: 'right' }}>
        <HeaderSM
          style={{
            display: 'inline-block',
            marginRight: '3rem'
          }}
        >
          <a href={`https://instagram.com/${instagram}`} target='_blank'>
            {`Instagram`}
          </a>
        </HeaderSM>
        <HeaderSM
          style={{
            display: 'inline-block'
          }}
        >
          <a href={`mailto:${enquire}`}>
            {`Email Agent`}
          </a>
        </HeaderSM>
      </div>
  </Headroom>
)

export default Header
