import React, { Component } from 'react'

import Link from 'gatsby-link'

import Item from './MainItem'
import Toggle from './Toggle'

export default class Menu extends Component {

  state = {
    isVisible: true
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
          width: '14rem',
          marginLeft: '2rem',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2000,
          opacity: isCover ? 0 : 1,
          transition: 'opacity 1000ms ease-out'
        }}
      >

        <ul
          css={{
            marginLeft: 0,
            marginTop: '3rem',
            marginBottom: 0,
            listStyle: 'none',
            textAlign: 'right',
          }}
        >
          <li
            css={{
              marginBottom: '10rem'
            }}
          >
            <Link to='/'><Toggle>{title}</Toggle></Link>
          </li>
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
                  index={i}
                  //isVisible={this.state.isVisible}
                  isVisible
                  title={section}
                  onClick={scrollToSection}
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
