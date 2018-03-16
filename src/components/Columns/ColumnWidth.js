import React, { Component } from 'react'
import { HeaderMD } from '../Styled'
import NameList from './NameList'

import { EASE } from '../../utils/presets'

export default class ColumnWidth extends Component {

  state = {
    opacity: 0
  }
/*
  constructor(props) {
    super(props)

    const first = props.column.filter((artist, index) => {
      return artist.first
    })

    const last = props.column.filter((artist, index) => {
      return artist.last
    })

    this.state = {
      opacity: 0,
      first,
      last
    }
  }
*/
  componentWillReceiveProps(nextProps) {

    let { limit, active, percentage, inView, index, refKey } = nextProps
    if (
        this.props.percentage !== percentage ||
        this.props.active !== active ||
        this.props.limit !== limit
      ) {
      let opacity
      if (percentage > limit) { // edge of menu
        //opacity = 1 - percentage
        opacity = 0
      } else if (percentage < (limit - 0.05)) { // right edge
        opacity = 0.8
      } else {
        //opacity = percentage * 1.5
        opacity = 0.8
      }

      //opacity = 0.6

      if (percentage > limit) {
        percentage = limit
      }
      this.setState({opacity, percentage})
      this.props.onChange({
        percentage,
        inView,
        //first: this.state.first,
        //last: this.state.last,
        index
      })

    }

  }

  render () {

    const { viewportUnit, vwUnits } = this.props

    return (
      <div
        css={{
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

              left: `100${viewportUnit}`,
              width: `${vwUnits + viewportUnit}`,

              willChange:`transform`, // https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
              //backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
            style={{
              transform: `translate3d(${-(this.state.percentage * 100) + viewportUnit}, 0px, 0px)`,
            }}
          >
            <div
              css={{
                //filter: percentage < 0.30 || percentage > 0.55 ? `blur(1px)` : `blur(0)`
                marginTop: `3rem`,
                alignSelf: `center`,
                opacity: this.state.opacity,
                transition: `opacity 300ms ${EASE}`,
                willChange: `opacity`,
                ...this.props.style
              }}
            >
              <NameList
                onHover={this.props.onHover}
                column={this.props.column}
                inViewKey={this.props.inViewKey}
                opacity={this.state.opacity}
              />
              {this.props.children}
              {/*<p>{this.state.percentage}</p>*/}
            </div>
          </div>
          {/*<p>{this.state.percentage}</p>*/}
      </div>
    )
  }

}
