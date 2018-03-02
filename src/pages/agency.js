import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Grid, Row, Col } from '../components/Grid'
import { HeaderXS, HeaderSM, HeaderMD, HeaderLG } from '../components/Styled'
import Toggle from '../components/Menu/Toggle'


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
      }
    } = this.props

    return (
      <div>

        <div
          css={{
            width: '14rem',
            marginLeft: '2rem',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2000,
            opacity: 1,
            transition: 'opacity 1000ms ease-out'
          }}
        >

          <ul
            css={{
              marginLeft: 0,
              marginTop: '3rem',
              marginBottom: 0,
              listStyle: 'none',
              textAlign: 'right',
            }}
          >
            <li
              css={{
                marginBottom: '10rem'
              }}
            >
              <Link to='/'><Toggle>{title}</Toggle></Link>
            </li>
          </ul>
        </div>

        <div css={{
          top: '2.5rem',
          position: 'fixed',
          width: 'calc(100% - 18rem)',
          left: '18rem'
        }}>
          <HeaderSM
            uppercase
            style={{ display: 'inline-block' }}
          >
            {siteTitle}
          </HeaderSM>
        </div>

        <div
          css={{
            marginTop: `14rem`,
            marginLeft: `16rem`,
            maxWidth: `50rem`
          }}
        >

          <Grid fluid>
            <Row>
              <Col xs={12} md={10}>
                <HeaderSM>{description}</HeaderSM>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                {
                  contact && contact.map(item => {
                    return (
                      <div>
                        <HeaderSM uppercase>
                          {item.header}
                        </HeaderSM>
                        <a href={item.url} target='_blank'>
                          {item.name}
                        </a>
                      </div>
                    )
                  })
                }
              </Col>
              <Col xs={12} md={6}>
                {
                  addresses && addresses.map(item => {
                    return (
                      <div>
                        <HeaderSM uppercase>
                          {item.header}
                        </HeaderSM>
                        <div>
                          {item.address}
                        </div>
                      </div>
                    )
                  })
                }
              </Col>
            </Row>
          </Grid>
        </div>

        <div>
        </div>

      </div>

    )

  }

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

