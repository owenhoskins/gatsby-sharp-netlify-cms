import React from 'react'
import Headroom from 'react-headroom'
import { HeaderMD, HeaderSM } from '../Styled'

const Header = ({ name, instagram, enquire, isCover }) => (
    <Headroom disableInlineStyles>
      <HeaderMD
        style={{
          display: 'inline-block',
          opacity: isCover ? 0 : 1,
        }}>
        {name}
      </HeaderMD>
      <div css={{ float: 'right', opacity: isCover ? 0 : 1, }}>
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
