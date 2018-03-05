import React, { Component } from 'react'

import Emdash from '../Emdash'

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
          cursor: `pointer`,
          position: `fixed`,
          zIndex: 2000,
          top: `47px`,
          left: `14.25rem`,
          height: `2.5rem`,
          width: `2.5rem`,
          padding: `0.75rem`,
        }}
      >
        <div
          css={{position: `relative`}}
        >
          <Emdash top={`0`} opacity={this.state.hovered ? 0.7 : 0.6} />
          <Emdash top={`8px`} opacity={this.state.hovered ? 0.7 : 0.6} />
          <Emdash top={`16px`} opacity={this.state.hovered ? 0.7 : 0.6} />
        </div>
      </div>
    )
  }
}
