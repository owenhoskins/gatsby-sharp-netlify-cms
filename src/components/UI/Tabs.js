import React, { Component } from 'react'
import { InlineBlock } from 'glamor/jsxstyle'
import SwipeableViews from 'react-swipeable-views'

import Tab from './Tab'

class Tabs extends Component {
/*  shouldComponentUpdate(nextProps) {
    if (this.props.tabIndex !== nextProps.tabIndex) {
      return true
    } else {
      return false
    }
  }*/

  handleChange = (tabIndex, sectionKey, index) => {
    if (this.props.scrollToSection) {
      this.props.scrollToSection(index, sectionKey)
    }
  }

  handleChangeIndex = index => {
    if (this.props.onChangeTabIndex) {
      this.props.onChangeTabIndex(index)
    }
  }

  render() {
    const {
      sections,
      tabIndex,
    } = this.props

    console.log('Tabs render method called!')

    return (
      <SwipeableViews
        ignoreNativeScroll={true}
        enableMouseEvents={true}
        threshold={1}
        hysteresis={0.1}
        resistance={true}
        index={tabIndex}
        onChangeIndex={this.handleChangeIndex}
        style={{
          padding: '0 10rem 0 0',
          width: window && window.innerWidth
        }}
        slideStyle={{
          padding: '0 0'
        }}
      >
        {
          sections.map((section, index) => {
            return (
              <InlineBlock
                key={index}
                onClick={() => this.handleChange(tabIndex, section.key, index)}
                css={{
                  padding: '2rem 2.3rem',
                }}
              >
                <Tab
                  label={section.title}
                  active={tabIndex === index}
                />
              </InlineBlock>
            )
          })
        }
      </SwipeableViews>
    )
  }
}

export default Tabs
/*
const Tabs = ({
  sections,
  onChangeTabIndex,
  tabIndex,
  scrollToSection
}) => {

  const handleChange = (tabIndex, sectionKey) => {
    if (onChangeTabIndex) {
      onChangeTabIndex(tabIndex)
    }
    if (scrollToSection) {
      scrollToSection(sectionKey)
    }
  };

  const handleChangeIndex = index => {
    if (onChangeTabIndex) {
      onChangeTabIndex(index)
    }
  };

  return (
    <SwipeableViews
      hysteresis={0.2}
      resistance={true}
      index={tabIndex}
      onChangeIndex={handleChangeIndex}
      style={{
        padding: '0 10rem 0 0',
        width: window && window.innerWidth
      }}
      slideStyle={{
        padding: '0 0'
      }}
    >
      {
        sections.map((section, index) => {
          return (
            <InlineBlock
              key={index}
              onClick={() => handleChange(tabIndex, section.key)}
              css={{
                padding: '2rem 2.3rem',
              }}
            >
              <Tab
                label={section.title}
                active={tabIndex === index}
              />
            </InlineBlock>
          )
        })
      }
    </SwipeableViews>
  )
}

export default Tabs
*/