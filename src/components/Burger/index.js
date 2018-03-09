import React, { Component } from 'react'

import Emdash from '../Emdash'
import { EASE } from '../../utils/presets'

export default class Burger extends Component {
  state = {
    hovered: true
  }

  onMouseEnter = () => {
    this.setState({hovered: true})
  }

  onMouseLeave = () => {
    this.setState({hovered: false})
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render () {
    return (
      <div
        onClick={this.handleClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        css={{
          pointerEvents: 'auto',
          cursor: `pointer`,
          position: `fixed`,
          zIndex: 200,
          top: `20px`,
          left: `14.25rem`,
          height: `2.5rem`,
          width: `2.5rem`,
          padding: `0.75rem`,
        }}
      >
        <div
          css={{
            transition: `opacity 300ms ${EASE}`,
            transitionDelay: this.props.collapsed ? `0ms` : `300ms`,
            opacity: this.props.collapsed ? 0 : 1,
            position: `relative`,
          }}
        >
          <Emdash
            top={`8px`}
            opacity={this.state.hovered ? 0.7 : 0.6}
            style={{
              transitionProperty: `top, transform`,
              transform: `rotate(45deg)`
            }}
          />
          <Emdash
            top={`8px`}
            opacity={this.state.hovered ? 0.7 : 0.6}
            style={{
              transitionProperty: `bottom, transform`,
              transform: `rotate(-45deg)`
            }}
          />
        </div>
      </div>
    )
  }
}
