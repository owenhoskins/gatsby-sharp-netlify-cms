import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from 'gatsby-link'

import Item from './MainItem'
import Toggle from './Toggle'


export default class Menu extends Component {

  state = {
    isVisible: true,
    startingYs: [],
    ready: false
  }

  returnRef = (ref, refKey) => this[refKey] = ref

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('Menu context: ', this.context, nextContext)
  }

  componentDidMount() {

    // we only know where the Y position is on mount
    // so how to start collapsed?
    const startingYs = this.props.sections.map((section, i) => {
      return this[section].getBoundingClientRect().y
    })

    this.setState({startingYs})
    //this.context.toggleCollapse(true)

    console.log('startingYs: ', startingYs)
    setTimeout(() => {
      this.setState({ready: true})
    }, 300)

    // on resize we need to reset the startingYs.
  }

  render() {
    const {
      title,
      sections,
      scrollToSection,
      currentSection
    } = this.props

    const isCover = false

    return (
      <div
        css={{
          display: 'flex',
          width: '14rem',
          //marginLeft: '2rem',
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
                  collapsed={this.context.collapsed}
                  startingYs={this.state.startingYs}
                  //isVisible={this.state.isVisible}
                  isVisible
                  title={section}
                  active={currentSection === i}
                />
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}


Menu.contextTypes = {
  collapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func
}
