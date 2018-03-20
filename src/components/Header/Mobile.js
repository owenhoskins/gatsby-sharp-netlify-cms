import React from 'react'
import { HeaderMD, HeaderSM } from '../Styled'

const Header = ({ isCover, biography }) => (
  <div
    css={{
      position: 'fixed',
      top: '3rem',
      left: '2.3rem',
      right: '2.3rem',
      transition: 'opacity 1000ms ease-out',
      opacity: !isCover ? 1 : 0
    }}
  >
    <HeaderMD
      style={{
        display: 'inline-block',
      }}>
      {biography.name}
    </HeaderMD>
    <div css={{ float: 'right'}}>
      <HeaderSM
        style={{
          display: 'inline-block',
          marginRight: '1rem'
        }}
      >
        <a href={`https://instagram.com/${biography.instagram}`} target='_blank'>
          {`I`}
        </a>
      </HeaderSM>
      <HeaderSM
        style={{
          display: 'inline-block'
        }}
      >
        <a href={`mailto:${biography.enquire}`}>
          {`E`}
        </a>
      </HeaderSM>
    </div>

  </div>
)

export default Header
