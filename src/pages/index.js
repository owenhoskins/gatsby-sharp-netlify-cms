import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import LogoSvg from '../../static/assets/logo.svg'


const blurry = css.keyframes({
  '0%': { filter: 'blur(0px)', opacity: 1 },
  '10%': { filter: 'blur(3px)', opacity: 1 },
  '20%': { filter: 'blur(6px)', opacity: 0.8 },
  '30%': { filter: 'blur(3px)', opacity: 0.8 },
  '40%': { filter: 'blur(9px)', opacity: 1 },
  '50%': { filter: 'blur(12px)', opacity: 1 },
  '60%': { filter: 'blur(9px)', opacity: 0.9 },
  '70%': { filter: 'blur(6px)', opacity: 0.9 },
  '80%': { filter: 'blur(3px)', opacity: 0.7 },
  '90%': { filter: 'blur(6px)', opacity: 0.7 },
  '100%': { filter: 'blur(3px)', opacity: 1 }
})

export default class IndexPage extends Component {

  render() {
    const { transition } = this.props
    return <div
      css={{
        position: `fixed`,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1999,
        textAlign: `center`,
      }}
      style={transition && transition.style}
    >
      <LogoSvg
        onClick={this.context.toggleCollapse}
        css={{
          filter: `blur(4px)`,
          animation: `${blurry} 30s infinite`,
          cursor: `pointer`,
        }}
        width={'21rem'}
        height={'auto'}
      />
    </div>
  }

}

IndexPage.contextTypes = {
  toggleCollapse: PropTypes.func
}