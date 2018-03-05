import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LogoSvg from '../../static/assets/logo.svg'

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