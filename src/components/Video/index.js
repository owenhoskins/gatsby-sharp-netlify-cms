import React, { Component } from 'react'
import Player from 'react-player'

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
          paddingBottom: '56.25%', /* 16:9 */
          paddingTop: 0,
          height: 0,
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
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50%',
            backgroundColor: 'transparent',
            display: this.state.playing ? 'none' : 'flex',
            //backgroundImage: `url(${this.props.poster})`
          }}
          onClick={this.handleClick}
        >
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
          <h3>{this.props.title}</h3>
        </div>
        <Player
          css={{ height: '0px !important' }}
          { ...this.props }
          playing={ this.state.playing }
        />
      </div>
    )
  }
}