import React from 'react'
import { HeaderMD, HeaderXS } from '../Styled'

const Header = ({ name, instagram, enquire, isCover }) => (
    <div
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
