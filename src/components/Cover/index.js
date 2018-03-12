import React, { Component } from 'react'
import Img from '../Image'
import { HeaderXL } from '../Styled'
import { EASE } from '../../utils/presets'

import { Transition } from 'react-transition-group'
//import getTransitionStyle from '../../utils/getTransitionStyle'


const timeout = 300

const getTransitionStyles = (timeout) => {
  return {
    entering: {
      opacity: 0,
      filter: `blur(50px)`,
      //transform: `scale(1.1)`
    },
    entered: {
      transition: `opacity ${timeout}ms ${EASE}, filter ${timeout * 2}ms ${EASE}, transform ${timeout * 2}ms ${EASE}`,
      opacity: 1,
      filter: `blur(0)`,
      //transform: `scale(1)`
    },
    exiting: {
      transition: `opacity ${timeout}ms ${EASE}, filter ${timeout * 2}ms ${EASE}, transform ${timeout * 2}ms ${EASE}`,
      opacity: 0,
      filter: `blur(50px)`,
      //transform: `scale(1.1)`
    },
  }
}

const getTransitionStyle = ({ timeout, status }) =>
  getTransitionStyles(timeout)[status]

const transitionProps = {
  timeout: {
    enter: 0,
    exit: timeout,
  },
  in: true,
  appear: true,
}

const Cover = ({
  cover,
  isCover,
  name,
  onClick,
  images,
  currentImage
}) => {
  if (cover && cover.childImageSharp) {
    const { childImageSharp: { sizes }} = cover
    //const { aspectRatio, src, srcSet } = sizes

    let coverImage
    if (currentImage) {
      coverImage = images[currentImage].sizes
    } else {
      coverImage = sizes
    }

    return (
      <Transition
        timeout={{
          enter: 0,
          exit: 300
        }}
        in={true}
        appear={true}
      >
        {(status) => (
          <div
            style={ getTransitionStyle({ status, timeout }) }
            onClick={onClick}
            css={{
              pointerEvents: isCover ? 'auto' : 'none',
              cursor: 'pointer',
            }}
          >
          <HeaderXL
            weight={700}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              zIndex: 3000,
              opacity: isCover ? 1 : 0,
              //pointerEvents: isCover ? 'auto' : 'none',
              //textShadow: `#575483 1px 0 16px`,
              transition: '1s opacity ease-in-out',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
          >{name}</HeaderXL>
          <Img
            outerCss={{
              position: 'fixed',
              zIndex: -1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: isCover ? 1 : 0,
              willChange: 'opacity, filter, transform',
              filter: isCover ? 'blur(0)' : 'blur(50px)',
              transition: `600ms opacity ${EASE}, 600ms filter ${EASE}, 600ms transform ${EASE}`,
              transform: isCover ? `scale(1)` : `scale(1.1)`
            }}
            customAspect={{ height: '100vh' }}
            objectFit={`cover`}
            sizes={coverImage}
          />
        </div>
      )}
      </Transition>
    )
  } else {
    return <div/>
  }
}

export default Cover
