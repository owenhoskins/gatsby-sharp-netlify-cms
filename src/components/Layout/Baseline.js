import React from 'react'
import mousetrap from "mousetrap"
import { View } from 'glamor/jsxstyle'

// https://github.com/moroshko/react-baseline/blob/master/src/Baseline.js

class Baseline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      unit: 0.5
    }
  }

  componentDidMount() {
    mousetrap.bind(`ctrl+l`, () => this.handleCtrlL())
    mousetrap.bind(`ctrl+g`, () => this.handleCtrlG())
  }

  componentWillUnmount() {
    mousetrap.unbind(`ctrl+l`)
    mousetrap.unbind(`ctrl+g`)
  }

  handleCtrlL = () => {
    if (!document.body.className) {
      document.body.className = 'show-grid'
    } else {
      document.body.className = ''
    }
    return false
  }

  handleCtrlG = () => {
    this.setState({
      active: !this.state.active,
      unit: 0.5
    })
    return false
  }

  render () {
    return (
      <View
        className={ 'baseline' }
        css={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 10000,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to bottom, cyan 0, rgba(255, 255, 255, 0) 1px)',
          backgroundRepeat: 'repeat-y',
          backgroundSize: `100% ${this.state.unit}rem`,
          display: this.state.active ? 'block' : 'none',
        }}
      />
    )
  }
}

export default Baseline
