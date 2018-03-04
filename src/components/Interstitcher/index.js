import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Blurry } from '../Styled'

const historyExitingEventType = `history::exiting`


function breadcrumber(pathname) {
  const pathArray = pathname.replace(/^\/|\/$/g, '').split('/')
  if (pathArray.length > 1) {
    return [
      pathArray[0],
      pathArray[1].replace(/-/g, ' ')
    ]
  } else {
    return pathArray[0].length > 0 ? [pathArray[0]] : []
  }
}

export default class Interstitcher extends Component {
  state = {
    pathname: '',
    exiting: false
  }

  listenerHandler = (event) => {
    this.setState({pathname: breadcrumber(event.detail.pathname), exiting: true })
  }

  componentDidMount() {
    window.addEventListener(historyExitingEventType, this.listenerHandler)
    this.setState({pathname: breadcrumber(this.props.location.pathname) })
  }

  componentWillUnmount() {
    window.removeEventListener(historyExitingEventType, this.listenerHandler)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ exiting: false, pathname: '' })
    }
  }

  render () {

    return (
      <div
        css={{
          position: `fixed`,
          top: `2rem`,
          left: `18rem`,
          height: `2.5rem`,
          padding: `0.75rem`,
        }}
      >
        <Blurry inline opacity={0.3}>{`swa`}</Blurry>
        {
          this.state.pathname.length > 0 && this.state.pathname.map((path, i) => {
            return (
              <span key={i}>
                <Blurry inline opacity={0.3} style={{ margin: `0 1rem` }}>{`/`}</Blurry>
                <Blurry
                  inline
                  opacity={
                    this.state.pathname.length - 1 === i ? 1 : 0.3
                  }
                >{path}</Blurry>
              </span>
            )
          })
        }
      </div>
    )
  }

}

