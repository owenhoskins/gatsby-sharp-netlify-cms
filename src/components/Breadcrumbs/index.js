import React, { Component } from 'react'
import { Blurry } from '../Styled'
import Breadcrumb from './Breadcrumb'

import { EASE } from "../../utils/presets"

export default class Breadcrumbs extends Component {
  state = {
  }

  render () {
    return (
      <div
        css={{
          position: `fixed`,
          zIndex: 2000,
          top: `0.25rem`,
          left: `18rem`,
          right: `2rem`,
          height: `2.5rem`,
          padding: `0.75rem`,
          display: `flex`,
          justifyContent: `space-between`,
          //width: `100%`,
          ':before': {
            content: ` `,
            position: `fixed`,
            top: `-1rem`,
            left: `-18rem`,
            right: 0,
            height: `10rem`,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0) 90%)`,
            transition: `opacity 300ms ${EASE}`,
            opacity: this.props.gradient ? 0.6 : 0,
            pointerEvents: 'none'
          },
          ...this.props.style
        }}
      >
        <div>
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
                      opacity={0.6}
                      {...pathObject}
                    />
                  )
                }
              </span>
            )
          })
        }
        </div>
        {
          this.props.frontmatter && (
            <div>
            {
              this.props.frontmatter.enquire && (
                <span>
                  <Blurry
                    inline
                    style={{
                      opacity: 0.6,
                      ':hover': {
                        opacity: 1
                      }
                    }}
                  >
                    <a href={`mailto:${this.props.frontmatter.enquire}`}>
                      {`Email Agent`}
                    </a>
                  </Blurry>
                </span>
              )
            }
            {
              this.props.frontmatter.instagram_handle && (
                <span>
                  <Blurry inline opacity={0.3} style={{ margin: `0 1rem` }}>{`/`}</Blurry>
                  <Blurry
                    inline
                    style={{
                      opacity: 0.6,
                      ':hover': {
                        opacity: 1
                      }
                    }}
                  >
                    <a href={`https://instagram.com/${this.props.frontmatter.instagram_handle}`} target='_blank'>
                      {`Instagram`}
                    </a>
                  </Blurry>
                </span>
              )
            }
          </div>
          )
        }
      </div>
    )
  }
}
