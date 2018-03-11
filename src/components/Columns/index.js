import React from 'react'
import { Motion, spring, presets } from 'react-motion'
const springConfig = presets.noWobble

import NameList from './NameList'

const Columns = ({ dataArray, data, totalPercentage, opacity = 1 }) => (

  <div>
    {

      dataArray && dataArray.map((type, index) => {
        const refKey = Object.keys(data)[index]
        // console.log('refKey: ', refKey, type)
        return (
          <Motion
            key={refKey}
            style={ { z: spring(-Math.round(totalPercentage * 10), springConfig) } }>
            { ({z}) => {
              return (
                <div
                  css={{
                    height: `49vh`,
                    marginBottom: `1vh`
                    // calculate the height by the getting the total width of the columns
                    //height: `calc(23rem * 2)`,
                    // height: `46rem`
                    //backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div
                    css={{
                      display: 'flex',
                      position: `fixed`,
                      top: `0`,
                      bottom: `0`,
                      left: `calc((23rem * ${index + 1}))`,

                    }}
                    style={{
                      opacity: opacity,
                      //transform: `translateX(${-(percentage * 100) + 'vw'})`,
                      //transform: `translateX(${-(percentage * 23) + 'rem'})`,
                      //filter: percentage < rightEdge || percentage > leftEdge ? `blur(1px)` : `blur(0)`
                      transform: `translateX(${z}rem)`
                    }}
                  >
                    <NameList type={type} />
                  </div>
                    {/*<p>{refKey}</p>
                      <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>*/}
                </div>
              )
            }}
          </Motion>
        )
      })
    }
  </div>
)

export default Columns