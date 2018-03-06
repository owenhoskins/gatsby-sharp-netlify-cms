import React, { Component } from 'react'
import { Blurry } from '../Styled'
import Breadcrumb from './Breadcrumb'

export default class Breadcrumbs extends Component {
  state = {
  }

  render () {
    return (
      <div
        css={{
          position: `fixed`,
          zIndex: 2000,
          top: `2rem`,
          left: `18rem`,
          height: `2.5rem`,
          padding: `0.75rem`,
        }}
      >
        {
          this.props.breadcrumbs.length > 0 && this.props.breadcrumbs.map((pathObject, i) => {
            return (
              <span key={i}>
                {
                  this.props.breadcrumbs.length - 1 === i ? (
                    <Breadcrumb
                      opacity={1}
                      {...pathObject}
                    />
                  ) : (
                    <Breadcrumb
                      prepend
                      opacity={0.3}
                      {...pathObject}
                    />
                  )
                }
              </span>
            )
          })
        }
      </div>
    )
  }
}
