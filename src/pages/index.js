import React, { Component } from 'react'
import Menu from '../components/Menu/Main'


export default class IndexPage extends Component {

  render() {

    return (
      <div
        css={{
          paddingTop: '15rem',
          marginLeft: '21rem'
        }}
      >
        <Menu
          title={`menu`}
          sections={[
            'artists',
            'services',
            'agency'
          ]}
        />

      </div>

    )

  }

}
