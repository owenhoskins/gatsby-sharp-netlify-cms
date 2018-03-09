import React, { Component } from 'react'

import Link from 'gatsby-link'

import Item from './ServicesItem'

export default class Menu extends Component {

  render() {
    const {
      isCover,
      isHovered,
      sections,
      scrollToSection,
      currentSection
    } = this.props

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
          transition: 'opacity 1000ms ease-out'
        }}
      >

        <ul
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          css={{
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
                  marginBottom: 0,
                }}
              >
                <Item
                  index={i}
                  isHovered={isHovered}
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
