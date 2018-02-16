import React, { Component } from 'react'
import Player from 'react-player'

import { HeaderLG } from '../Styled'

export default class Video extends Component {

  state = {
    playing: false
  }

  handleClick = () => {
    this.setState({
      playing: !this.state.playing
    });
  }

  render () {
    return (
      <div // wrapper
        css={{
          position: 'relative',
          paddingBottom: this.props.ratio || '56.25%', /* 16:9 */
          //paddingTop: 0,
          //height: 0,
          ...this.props.style
        }}
      >
        <div // cover
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            display: this.state.playing ? 'none' : 'flex',
            overflow: 'hidden',
            backgroundColor: '#F9E8CE'
          }}
          onClick={this.handleClick}
        >
          <div
            css={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              bottom: '-6px',
              left: '-6px',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'transparent',
              backgroundImage: `url(${this.props.poster})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              filter: 'blur(3px)',
              opacity: 0.5
            }}
          />
          {/*
          <Svg
            path={ 'static/assets/icons/play.svg' }
            className={ 'play-icon' }
            style={{
              filter: 'drop-shadow(12px 12px 7px rgba(0,0,0,0.5))',
              width: '5rem'
            }}
          />
          */}
          <HeaderLG style={{ maxWidth: '30rem' }}>{this.props.title}</HeaderLG>
        </div>
        <Player
          css={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
          width='40rem'
          height='100%'
          url={this.props.url}
          playing={this.state.playing}
        />
      </div>
    )
  }
}