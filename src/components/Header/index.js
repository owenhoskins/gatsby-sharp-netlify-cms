import React from 'react'
import Headroom from 'react-headroom'
import { Headline, Subline } from '../Styled'

const Header = ({ name, instagram, enquire, isCover }) => (
    <Headroom disableInlineStyles>
      <Headline
        style={{
          display: 'inline-block',
          opacity: isCover ? 0 : 1,
        }}>
        {name}
      </Headline>
      <div css={{ float: 'right', opacity: isCover ? 0 : 1, }}>
        <Subline
          style={{
            display: 'inline-block',
            marginRight: '3rem'
          }}
        >
          <a href={`https://instagram.com/${instagram}`} target='_blank'>
            {`Instagram`}
          </a>
        </Subline>
        <Subline
          style={{
            display: 'inline-block'
          }}
        >
          <a href={`mailto:${enquire}`}>
            {`Email Agent`}
          </a>
        </Subline>
      </div>
  </Headroom>
)

export default Header
