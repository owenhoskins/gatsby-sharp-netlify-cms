import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Headroom from 'react-headroom'
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
          path: `artists#${pathArray[0]}`,
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

function colorways(page, collapsed, isCover) {
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
    if (isCover) {
      return { backgroundColor: `#FFF`, color: YELLOW }
    } else {
      return { backgroundColor: `#FFF`, color: PURPLE }
    }
  }
}

export default class Interstitcher extends Component {
  constructor(props) {
    super(props)

    const pathObject = breadcrumber(props.location.pathname)
    this.state = {
      breadcrumbs: pathObject.breadcrumbs,
      page: pathObject.page,
      ...colorways(pathObject.page, true, pathObject.page === 'artist'),
      isCover: pathObject.page === 'artist' ? true : false,
      lightboxIsOpen: false,
      base64: ''
    }
  }


  getChildContext () {
    return {
      collapsed: this.state.collapsed,
      toggleCollapse: this.toggleCollapse,
      isCover: this.state.isCover,
      toggleIsCover: this.toggleIsCover,
      lightboxIsOpen: this.state.lightboxIsOpen,
      toggleLightbox: this.toggleLightbox,
      page: this.state.page,
      color: this.state.color,
      setBase64: this.setBase64
    }
  }

  componentDidMount() { this.setState({collapsed: true}) }

  componentWillReceiveProps(nextProps) {

    if (this.props.location.key !== nextProps.location.key) {

      const pathObject = breadcrumber(nextProps.location.pathname)
      const collapsed = nextProps.location.pathname === '/' ? false : true
      const isCover = pathObject.page === 'artist' ? true : false
      this.setState({
        collapsed,
        isCover,
        lightboxIsOpen: false,
        breadcrumbs: pathObject.breadcrumbs,
        page: pathObject.page,
        ...colorways(pathObject.page, true, pathObject.page === 'artist')
      })

    }

  }

  setBase64 = (base64) => this.setState({base64})

  toggleCollapse = () => this.setState({collapsed: !this.state.collapsed, ...colorways('home', !this.state.collapsed)})

  toggleIsCover = (bool) => this.setState({isCover: bool, ...colorways('artist', false, !this.state.isCover)})

  toggleLightbox = (bool) => this.setState({lightboxIsOpen: bool})

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
          style={{
            opacity: this.state.lightboxIsOpen ? 0 : 1,
            //pointerEvents: this.state.lightboxIsOpen ? 'none' : 'auto',
            transition: `opacity 300ms ${EASE}`
          }}
        />

        <Breadcrumbs
          breadcrumbs={this.state.breadcrumbs}
          gradient={this.state.page === 'artist' && !this.state.isCover}
          //textShadow={this.state.page === 'artist' && this.state.isCover}
          textShadow={this.state.page === 'artist'}
          frontmatter={this.state.page === 'artist' && this.props.pageResources.json.data.markdownRemark.frontmatter}
          style={{
            opacity: this.state.lightboxIsOpen ? 0 : 1,
            pointerEvents: this.state.lightboxIsOpen ? 'none' : 'auto',
            transition: `opacity 300ms ${EASE}`
          }}
        />
        {/*
        <Headroom
          //disable={ this.state.page === 'artist' ? false : true }
          disable
          disableInlineStyles
          style={{
            //opacity: this.state.isCover ? 0 : 1,
            //pointerEvents: this.state.isCover ? 'none' : 'auto'
          }}
        >
        </Headroom>
        */}
        <Background
          isCover={this.state.isCover}
          page={this.state.page}
          collapsed={this.state.collapsed}
          backgroundColor={this.state.backgroundColor}
          base64={this.state.base64}
        />

        {this.props.children}

      </div>
    )
  }

}


Interstitcher.childContextTypes = {
  collapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func,
  lightboxIsOpen: PropTypes.bool,
  toggleLightbox: PropTypes.func,
  page: PropTypes.string,
  color: PropTypes.string,
  isCover: PropTypes.bool,
  toggleIsCover: PropTypes.func,
  setBase64: PropTypes.func
}

