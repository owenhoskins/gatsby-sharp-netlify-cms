import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'gatsby-link'

import Item from './MainItem'
import Close from '../Burger'


export default class Menu extends Component {

  state = {
    startingYs: [],
    ready: false
  }

  returnRef = (ref, refKey) => this[refKey] = ref

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('Menu context: ', this.context, nextContext)
  }

  componentDidMount() {

    // we only know where the Y position is on mount
    const startingYs = this.props.sections.map((section, i) => this[section].getBoundingClientRect().y)
    this.setState({startingYs})
    console.log('startingYs: ', startingYs)

    // Item's collapsed state animation completes in this.props.timeout
    // Wait a tick to fade in the menu items
    setTimeout(() => this.setState({ready: true}), this.props.timeout)

    // TODO
    // on resize we need to reset the startingYs.
  }

  handleBurgerClick = () => {
    if (this.props.page !== 'home') {
      window.___navigateTo('/')
    } else {
      this.props.toggleCollapse()
    }
  }


  render() {
    const {
      title,
      sections,
    } = this.props

    const isCover = false

    return (
      <div
        css={{
          display: 'flex',
          width: '14rem',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 2000,
          opacity: isCover ? 0 : 1,
          transition: 'opacity 1000ms ease-out',
          //paddingTop: '16rem'
        }}
      >

      { this.state.ready &&
        <Close
          collapsed={this.props.collapsed}
          onClick={this.handleBurgerClick}
        />
      }

        <ul
          css={{
            opacity: this.state.ready ? 1 : 0,
            transition: 'opacity 100ms ease-out',
            marginLeft: 0,
            marginTop: '3rem',
            marginBottom: 0,
            listStyle: 'none',
            textAlign: 'right',
            alignSelf: 'center'
          }}
        >
          {
            sections.map((section, i) => {
              return <li
                key={i}
                css={{
                  cursor: 'pointer',
                  marginBottom: '2rem',
                  transition: 'opacity 800ms ease-out, transform 600ms ease-out, 600ms filter ease-out',
                  transform: !isCover ? 'translate3d(0,0,0)' : 'translate3d(0,-40px,0)',
                  opacity: !isCover ? 1 : 0
                }}
              >
                <Item
                  returnRef={this.returnRef}
                  index={i}
                  collapsed={this.props.collapsed}
                  timeout={this.props.timeout}
                  startingYs={this.state.startingYs}
                  title={section}
                />
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

