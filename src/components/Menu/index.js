import React, { Component } from 'react'

import Item from './Item'
import Toggle from './Toggle'

const Menu = ({
  type,
  sections,
  scrollToSection,
  currentSection
}) => {
  return (
    <div
      css={{
        position: 'fixed'
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
          <Toggle>{type}</Toggle>
        </li>
        {
          sections.map((section, i) => {
            return <li
              key={i}
              onClick={() => scrollToSection(i, section.key)}
              css={{
                cursor: 'pointer',
                marginBottom: '2rem'
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
