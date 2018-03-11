import React, { Component } from 'react'
import { HeaderMD } from '../Styled'

export default class FullWidth extends Component {

  state = {
    opacity: 0
  }

  componentWillReceiveProps(nextProps) {

    let { active, percentage, inView, index, refKey } = nextProps
    if (
        this.props.percentage !== percentage ||
        this.props.active !== active
      ) {
      //console.log('nextProps.percentage: ', nextProps.percentage)
      //let percentage = nextProps.percentage
      let opacity

/*
      if (percentage > 0.8) {
        opacity = 0
      } else if (percentage < 0.45) { // right edge
        opacity = 0
      } else {
        opacity = 1
      }

      if (opacity !== this.state.opacity) {
        this.setState({opacity})
      }
*/

      if (percentage > 0.75) { // edge of menu
        opacity = 1 - percentage
      } else if (percentage < 0.45) { // right edge
        opacity = percentage
      } else {
        opacity = percentage * 1.5
      }


      if (percentage > 0.75) {
        percentage = 0.75
      }
      this.setState({opacity, percentage})
      this.props.onChange({percentage, inView, index, refKey})
    }

    if (this.props.inView !== inView) {
      // this.props.onChange({percentage, inView, index, refKey})
      //console.log('nextProps.inView: ', inView)
    }

  }

  render () {

    // how should Motion work with the percentage value?
    const { viewportUnit } = this.props

    return (
      <div
        css={{
          height: `100vh`,
          marginBottom: '1vh',
          //backgroundColor: `rgba(0,0,0,0.1)`
        }}
      >
          <div
            css={{
              position: `fixed`,
              display: 'flex',
              top: 0,
              bottom: 0,
              left: `100${viewportUnit}`,
              width: `100${viewportUnit}`,
              willChange:`transform`, // https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
              //backgroundColor: 'rgba(0, 0, 0, 0.1)',
              //transition: `transform 100ms linear`
              // the transition creates jumpy movement in safari
              // still wondering if Motion is a solution for this.
            }}
            style={{
              transform: `translate3d(${-(this.state.percentage * 100) + viewportUnit}, 0px, 0px)`,
            }}
          >
            <div
              css={{
                //filter: percentage < 0.30 || percentage > 0.55 ? `blur(1px)` : `blur(0)`
                alignSelf: `center`,
                width: `60%`,
                maxWidth: `40rem`,
                opacity: this.state.opacity,
                willChange: `opacity`,
                //transition: `opacity 300ms linear, 800ms filter linear`,
              }}
            >
              <HeaderMD>{this.props.description}</HeaderMD>
              {/*<p>{this.state.percentage} — {this.props.refKey}</p>*/}
            </div>
          </div>
          {/*<p>{this.state.percentage} — {this.props.refKey}</p>*/}
      </div>
    )
  }

}
