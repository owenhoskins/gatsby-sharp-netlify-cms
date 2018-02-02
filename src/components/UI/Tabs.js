import React, { Component } from 'react'
import { InlineBlock } from 'glamor/jsxstyle'
import SwipeableViews from 'react-swipeable-views'

const Tabs = ({
  children,
  onChange,
  onChangeTabIndex,
  tabIndex,
  viewIndexes
}) => {

  const handleChange = (tabIndex, tabStartIndex) => {
    if (onChangeTabIndex) {
      onChangeTabIndex(tabIndex)
    }
    if (onChange)
      onChange(tabStartIndex)
  };

  const handleChangeIndex = index => {
    if (onChangeTabIndex) {
      onChangeTabIndex(index)
    }
  };

  return (
    <SwipeableViews
      index={tabIndex}
      onChangeIndex={handleChangeIndex}
      style={{
        padding: '0 60vw 0 0'
      }}
      slideStyle={{
        padding: '0 0'
      }}
    >
    {
      children.map((child, tabIndex) => {
        return (
          <InlineBlock
            key={tabIndex}
            onClick={() => handleChange(tabIndex, viewIndexes[tabIndex])}
            css={{
              padding: '0 2.3rem',
            }}
          >
            { child }
          </InlineBlock>
        )
      })
    }
    </SwipeableViews>
  )
}

export default Tabs
