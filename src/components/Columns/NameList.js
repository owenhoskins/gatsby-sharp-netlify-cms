import React from 'react'
import Link from 'gatsby-link'
import { HeaderLG } from '../Styled'

const NameList = ({ type, handleClick }) => (

  <div
    css={{
      //width: `21rem`,
      height: `29rem`,
      alignSelf: `center`
      //backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }}
  >
    {
      type.edges.map(({ node: { fields, frontmatter }}) => {
        return (
          <HeaderLG
            key={fields.slug}
          >
            <Link
              to={fields.slug}
              //onClick={e => handleClick(e, fields.slug, frontmatter.type)}
            >{frontmatter.title}</Link>
          </HeaderLG>
        )
      })
    }

  {/*
  <p>{refKey}</p>
  <p>{`Percentage scrolled: ${percentage.toPrecision(2)}%.`}</p>
  */}
  </div>

)

export default NameList