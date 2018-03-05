import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import { Blurry } from '../Styled'

import Background from '../Background'

import Burger from '../Burger'
import Menu from '../Menu/Main'


import { YELLOW, PURPLE, EASE } from '../../utils/presets'

function breadcrumber(pathname) {
  const pathArray = pathname.replace(/^\/|\/$/g, '').split('/')
  if (pathArray.length > 1) {
    return {
      breadcrumbs: [
        pathArray[0],
        pathArray[1].replace(/-/g, ' ')
      ],
      page: 'artist'
    }
  } else {
    return {
      breadcrumbs: pathArray[0].length > 0 ? [pathArray[0]] : [],
      page: pathArray[0].length > 0 ? pathArray[0] : 'home'
    }
  }
}

function colorways(page) {
  if (page === 'home') {
    return { backgroundColor: YELLOW, color: PURPLE }
  }
  if (page === 'services' || page === 'agency') {
    return { backgroundColor: YELLOW, color: PURPLE }
  }
  if (page === 'artists') {
    return { backgroundColor: PURPLE, color: YELLOW }
  }
  if (page === 'artist') {
    return { backgroundColor: `#FFF`, color: PURPLE }
  }
}

export default class Interstitcher extends Component {
  state = {
    breadcrumbs: [],
    page: 'home',
    backgroundColor: '',
    color: '',
    collapsed: false
  }

  getChildContext () {
    return {
      collapsed: this.state.collapsed,
      toggleCollapse: this.toggleCollapse,
      page: this.state.page,
      color: this.state.color
    }
  }

  componentDidMount() {
    const pathObject = breadcrumber(this.props.location.pathname)
    this.setState({
      breadcrumbs: pathObject.breadcrumbs,
      page: pathObject.page,
      ...colorways(pathObject.page)
    })
    this.setState({
      collapsed: true
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      const pathObject = breadcrumber(nextProps.location.pathname)
      this.setState({
        breadcrumbs: pathObject.breadcrumbs,
        page: pathObject.page,
        ...colorways(pathObject.page)
      })
    }

    // if exiting = true
    // else

    if (
      this.props.exiting !== nextProps.exiting
    ) {
      if (
        !nextProps.exiting &&
        nextProps.location.pathname === '/'
        ) {
        console.log('Not exiting and headed home', nextProps)
        this.setState({collapsed: false})
      }

      if (
        !nextProps.exiting &&
        nextProps.location.pathname !== '/'
      ) {
        this.setState({collapsed: true})
      }
    }
  }

  toggleCollapse = () => this.setState({collapsed: !this.state.collapsed})

/*
  toggleCollapse = (bool) => {
    console.log('is a boolean passed?', bool, typeof(bool) === typeof(true))
    if (typeof(bool) === typeof(true)) {
      this.setState({collapsed: bool})
    } else {
      this.setState({collapsed: !this.state.collapsed})
    }
  }
*/

  handleBurgerClick = () => {
    if (this.state.page !== 'home') {
      window.___navigateTo('/')
    } else {
      this.toggleCollapse()
    }
  }

  render () {

    return (
      <div
        css={{color: this.state.color}}
      >

        <Burger
          onClick={this.handleBurgerClick}
        />

        <Menu
          title={`menu`}
          sections={[
            'artists',
            'services',
            'agency'
          ]}
        />

        <div
          css={{
            position: `fixed`,
            top: `2rem`,
            left: `18rem`,
            height: `2.5rem`,
            padding: `0.75rem`,
          }}
        >
          {
            this.state.breadcrumbs.length > 0 && this.state.breadcrumbs.map((path, i) => {
              return (
                <span key={i}>
                  { i !== 0 && <Blurry inline opacity={0.3} style={{ margin: `0 1rem` }}>{`/`}</Blurry> }
                  <Blurry
                    inline
                    opacity={
                      this.state.breadcrumbs.length - 1 === i ? 1 : 0.3
                    }
                  >{path}</Blurry>
                </span>
              )
            })
          }
        </div>
        <Background
          page={this.state.page}
          collapsed={this.state.collapsed}
          backgroundColor={this.state.backgroundColor}
        />
        {this.props.children}
      </div>
    )
  }

}


Interstitcher.childContextTypes = {
  collapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func,
  page: PropTypes.string,
  color: PropTypes.string
}

