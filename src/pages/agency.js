import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Grid, Row, Col } from '../components/Grid'
import { Paragraph, HeaderXS, HeaderSM, HeaderMD, HeaderLG } from '../components/Styled'
import Burger from '../components/Burger'


export default class AgencyPage extends Component {

  render() {

    const {
      data: {
        site: {
          siteMetadata: {
            title: siteTitle,
            agency: {
              title,
              description,
              contact,
              addresses
            }
          }
        }
      },
      transition
    } = this.props

    return (
      <div style={transition && transition.style}>
        <div
          css={{
            marginTop: `10rem`,
            marginLeft: `16rem`,
            maxWidth: `50rem`
          }}
        >
          <Grid fluid>
            <Row>
              <Col xs={12} md={10}>
                <HeaderSM style={{marginBottom: `6rem`}}>{description}</HeaderSM>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {
                  contact && contact.map(item => {
                    return (
                      <div css={{marginBottom: `2rem`}}>
                        <HeaderXS uppercase>
                          {item.header}
                        </HeaderXS>
                        <Paragraph>
                          <a href={item.url} target='_blank'>
                            {item.name}
                          </a>
                        </Paragraph>
                      </div>
                    )
                  })
                }
              </Col>
              <Col xs={12} md={6}>
                {
                  addresses && addresses.map(item => {
                    return (
                      <div css={{marginBottom: `5rem`}}>
                        <HeaderXS uppercase>
                          {item.header}
                        </HeaderXS>
                        <Paragraph>
                        {item.address.split('\n').map(function(item, key) {
                          return (
                            <span key={key}>
                              {item}
                              <br/>
                            </span>
                          )
                        })}
                        </Paragraph>
                      </div>
                    )
                  })
                }
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

AgencyPage.contextTypes = {
  collapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func
}

export const agencyFragment = graphql`
  fragment agency on RootQueryType {
    site {
      siteMetadata {
        title
        agency {
          title
          description
          contact {
            header
            name
            url
          }
          addresses {
            header
            address
          }
        }
      }
    }
  }
`

export const pageQuery = graphql`
  query AgencyPageQuery {
    ...agency
  }
`;

