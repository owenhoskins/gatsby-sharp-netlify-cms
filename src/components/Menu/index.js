import React, { Component } from 'react'


const Menu = ({
  sections
}) => {
  return (
    <ul>
      {
        sections.map((section, i) => {
          return <li key={i}>{section.title}</li>
        })
      }
    </ul>
  )
}

export default Menu
