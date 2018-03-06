import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Background from '../Background'
import Breadcrumbs from '../Breadcrumbs'
import Menu from '../Menu/Main'

import { YELLOW, PURPLE, EASE } from '../../utils/presets'

function breadcrumber(pathname) {
  const pathArray = pathname.replace(/^\/|\/$/g, '').split('/')
  if (pathArray.length > 1) {
    return {
      breadcrumbs: [
        {
          path: 'artists',
          name: 'artists'
        },
        {
          path: `artists?${pathArray[0]}`,
          name: pathArray[0]
        },
        {
          path: `${pathArray[0]}/${pathArray[1]}`,
          name: pathArray[1].replace(/-/g, ' ')
        }
      ],
      page: 'artist'
    }
  } else {
    const pathObject = {
      path: pathArray[0],
      name: pathArray[0]
    }
    return {
      breadcrumbs: pathArray[0].length > 0 ? [pathObject] : [],
      page: pathArray[0].length > 0 ? pathArray[0] : 'home'
    }
  }
}

function colorways(page, collapsed) {
  if (page === 'home') {
    console.log('collapsed: ', collapsed)
    if (collapsed) {
      return { backgroundColor: YELLOW, color: PURPLE }
    } else {
      return { backgroundColor: PURPLE, color: YELLOW }
    }
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
      ...colorways(pathObject.page, true)
    })
    this.setState({
      collapsed: true
    })
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.location.key !== nextProps.location.key) {

      const pathObject = breadcrumber(nextProps.location.pathname)
      const collapsed = nextProps.location.pathname === '/' ? false : true
      this.setState({
        collapsed,
        breadcrumbs: pathObject.breadcrumbs,
        page: pathObject.page,
        ...colorways(pathObject.page, true)
      })

    }

  }

  toggleCollapse = () => this.setState({collapsed: !this.state.collapsed, ...colorways('home', !this.state.collapsed)})

  render () {

    return (
      <div
        css={{color: this.state.color}}
      >

        <Menu
          title={`menu`}
          sections={[
            'artists',
            'services',
            'agency'
          ]}
          collapsed={this.state.collapsed}
          toggleCollapse={this.toggleCollapse}
          timeout={300}
          page={this.state.page}
        />

        <Breadcrumbs breadcrumbs={this.state.breadcrumbs} />

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

