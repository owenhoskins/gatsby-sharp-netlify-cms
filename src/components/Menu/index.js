import React, { Component } from 'react'

import Item from './Item'

const Menu = ({
  sections,
  scrollToSection,
  currentSection
}) => {
  return (
    <ul
      css={{
        position: 'fixed'
      }}
    >
      {
        sections.map((section, i) => {
          return <li
            key={i}
            onClick={() => scrollToSection(i, section.key)}
            css={{ cursor: 'pointer', listStyle: 'none', textAlign: 'right' }}
          >
            <Item
              title={section.title}
              active={currentSection === section.key}
            />
          </li>
        })
      }
    </ul>
  )
}

export default Menu
