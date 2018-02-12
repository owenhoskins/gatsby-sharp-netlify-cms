import React, { Component } from 'react'
import Img from '../Image'
import { HeaderXL } from '../Styled'

const Cover = ({
  cover,
  isCover,
  name,
  onClick
}) => {
  if (cover && cover.childImageSharp) {
    const { childImageSharp: { sizes }} = cover
    const { aspectRatio, src, srcSet } = sizes
    return (
      <div>
        <HeaderXL
          onClick={onClick}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            zIndex: 3000,
            cursor: 'pointer',
            opacity: isCover ? 1 : 0,
            pointerEvents: isCover ? 'auto' : 'none',
            transition: '1s opacity ease-in-out',
            textAlign: 'center'
          }}
        >{name}</HeaderXL>
        <div
          css={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            opacity: isCover ? 1 : 0.2,
            transition: '2s opacity ease-in-out, 2s filter ease-in-out, 2s transform ease-in-out',
            filter: isCover ? 'blur(0)' : 'blur(50px)',
            transform: isCover ? 'scale(1)' : 'scale(1.1)'
          }}
        >
          <Img
            customAspect={{ height: '100vh' }}
            objectFit={`cover`}
            sizes={sizes}
          />
        </div>
    </div>
    )
  } else {
    return <div/>
  }
}

export default Cover
