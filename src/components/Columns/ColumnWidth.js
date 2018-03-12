import React, { Component } from 'react'
import { HeaderMD } from '../Styled'

export default class ColumnWidth extends Component {

  state = {
    opacity: 0
  }

  componentWillReceiveProps(nextProps) {

    let { limit, active, percentage, inView, index, refKey } = nextProps
    if (
        this.props.percentage !== percentage ||
        this.props.active !== active ||
        this.props.limit !== limit
      ) {
      let opacity
      if (percentage > limit) { // edge of menu
        opacity = 1 - percentage
      } else if (percentage < (limit - 0.1)) { // right edge
        opacity = 0.6
      } else {
        opacity = percentage * 1.5
      }

      if (percentage > limit) {
        percentage = limit
      }
      this.setState({opacity, percentage})
      this.props.onChange({percentage, inView, index, refKey})
    }

  }

  render () {

    // Calculate how many columns of a fixed width should fit in the window
    //
    const { viewportUnit, vwUnits } = this.props

    return (
      <div
        css={{
          //height: `14.375vh`,
          //marginBottom: '2vh',
          height: `${vwUnits}vh`
          //backgroundColor: `rgba(0,0,0,${(this.props.index - 10)})`
        }}
      >
          <div
            css={{
              position: `fixed`,
              display: 'flex',
              top: 0,
              bottom: 0,

              // this works at full width (2560px)
              // left: `100${viewportUnit}`,
              // width: `16.375${viewportUnit}`,

              // 1282px
              left: `100${viewportUnit}`,
              width: `${vwUnits + viewportUnit}`,

              // do they need to be the same?
              //left: `${100 - vwUnits}${viewportUnit}`,

              //left: `${vwUnits + viewportUnit}`,
              //width: `${vwUnits + viewportUnit}`,

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
                opacity: this.state.opacity,
                willChange: `opacity`,
                ...this.props.style
                //transition: `opacity 300ms linear, 800ms filter linear`,
              }}
            >
              {this.props.children}
              {/*<p>{this.state.percentage} — {this.props.refKey}</p>*/}
            </div>
          </div>
          {/*<p>{this.state.percentage} — {this.props.refKey}</p>*/}
      </div>
    )
  }

}
