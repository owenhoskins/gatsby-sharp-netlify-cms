import React, { Component } from 'react'

import Link from 'gatsby-link'

import Item from './Item'
import Toggle from './Toggle'

export default class Menu extends Component {

  state = {
    isVisible: true
  }

  onMouseEnter = () => {
    this.setState({isVisible: true})
  }

  onMouseLeave = () => {
    this.setState({isVisible: false})
  }

  render() {
    const {
      isCover,
      type,
      sections,
      scrollToSection,
      currentSection
    } = this.props

    return (
      <div
        css={{
          position: 'fixed',
          zIndex: 2000,
          opacity: isCover ? 0 : 1,
          transition: 'opacity 1000ms ease-out'
        }}
      >

        <ul
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
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
            <Link to='/artists'><Toggle>{type}</Toggle></Link>
          </li>
          {
            sections.map((section, i) => {
              return <li
                key={i}
                onClick={() => scrollToSection(i, section.key)}
                css={{
                  cursor: 'pointer',
                  marginBottom: '2rem',
                  transition: 'opacity 800ms ease-out, transform 600ms ease-out, 600ms filter ease-out',
                  transform: !isCover ? 'translate3d(0,0,0)' : 'translate3d(0,-40px,0)',
                  opacity: !isCover ? 1 : 0
                }}
              >
                <Item
                  isVisible={this.state.isVisible}
                  title={section.title}
                  //active={currentSection === section.key}
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
/*
const Menu = ({
  isCover,
  type,
  sections,
  scrollToSection,
  currentSection
}) => {
  return (
    <div
      css={{
        position: 'fixed',
        zIndex: 2000
      }}
    >

      <ul
        // onMouseEnter
        // onMouseLeave
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
          <Toggle>{type}</Toggle>
        </li>
        {
          sections.map((section, i) => {
            return <li
              key={i}
              onClick={() => scrollToSection(i, section.key)}
              css={{
                cursor: 'pointer',
                marginBottom: '2rem',
                transition: 'opacity 800ms ease-out, transform 600ms ease-out, 600ms filter ease-out',
                transform: !isCover ? 'translate3d(0,0,0)' : 'translate3d(0,-40px,0)',
                opacity: !isCover ? 1 : 0
              }}
            >
              <Item
                title={section.title}
                active={currentSection === section.key}
              />
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Menu
*/