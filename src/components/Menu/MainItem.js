import React, { Component } from 'react'
import Link from 'gatsby-link'
import { basekick } from '../../utils/typography'

import Emdash from '../Emdash'

const ease = `cubic-bezier(0.455, 0.03, 0.515, 0.955)` // easeInOutQuad

export default class Item extends Component {
  state = {
    opacity: 1,
    y: 0
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.index, this.props.startingYs, this.props.collapsed)
  }

  componentWillReceiveProps (nextProps) {

    if (this.props.collapsed !== nextProps.collapsed) {
      if (nextProps.collapsed) {

        if (nextProps.startingYs.length > 0) {
          const marginTop = 12
          const startingY = nextProps.startingYs[this.props.index]
          console.log('startingY: ', this.props.index, ' starts at ', startingY)
          const y = -startingY + marginTop + (this.props.index * 8)
          this.setState({
            y,
            opacity: 0
          })
        }
      } else {
        this.setState({y: 0, opacity: 0.6})
      }
    }

/*    if (
      this.props.startingYs.length > 0 &&
      this.props.startingYs !== nextProps.startingYs
    ) {
      this.setState({startingY: nextProps.startingYs[this.props.index]})
    }
*/
  }

  onMouseEnter = () => {
    if (!this.props.collapsed) {
      this.setState({opacity: 1})
    }
  }

  onMouseLeave = () => {
    if (!this.props.collapsed) {
      this.setState({opacity: 0.6})
    }
  }

  innerRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, this.props.title)
    }
  }

  render() {

    const { title, active, timeout } = this.props

    return (
      <div
        ref={this.innerRef}
        css={{
          width: '16rem',
          textAlign: 'right',
          paddingRight: '3rem',
          pointerEvents: this.props.collapsed ? 'none' : 'auto'
        }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
          <div
            css={{
              transition: `opacity ${timeout}ms ease-in-out, transform ${timeout}ms ${ease}`,
              transform: `translate3d(0px, ${this.state.y}px, 0px)`, // x, y, z
              opacity: this.state.opacity,
            }}
          >
            <div css={{
              filter: 'blur(1px)',
              letterSpacing: '3px',
              textTransform: 'lowercase',
              ...basekick({
                typeSizeModifier: 0.875,
                typeRowSpan: 3,
              })
            }}
            >
              <Link
                to={`/${title}`}
              >
                {title}
              </Link>
            </div>
          </div>
          <Emdash
            timeout={timeout}
            //opacity={ this.props.collapsed ? 0 : 0.6 }
            opacity={ 0.6 }
            top={'19px'}
            y={this.state.y}
          />
      </div>
    )
  }
}
