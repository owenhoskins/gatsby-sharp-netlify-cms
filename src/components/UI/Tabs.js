import React, { Component } from 'react'
import { InlineBlock } from 'glamor/jsxstyle'
import SwipeableViews from 'react-swipeable-views'

import Tab from './Tab'

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
