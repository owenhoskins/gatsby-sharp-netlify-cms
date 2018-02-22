import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import Img from '../Image'
import Video from '../Video'

export class Portfolios extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.portfolios.length !== nextProps.portfolios.length) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {
      portfolios,
      sections,
      returnRef,
      onPositionChange
    } = this.props
    console.log("Portfolios render method called!")
    return (
      <div css={{display: 'inherit'}}>
      {
        portfolios && portfolios.map((portfolio, index) => {
        const refKey = sections[index].key
          return (
            <Waypoint
              horizontal={true}
              onPositionChange={(props) => onPositionChange(props, refKey) }
              key={index}
              ref={ (ref) => returnRef(ref, refKey) }
            >
              <div css={{display: 'inherit'}}>
              {
                portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                  const { childImageSharp: { sizes }} = image
                  const { aspectRatio, src, srcSet } = sizes
                  sizes.sizes = '500px'
                  return (
                    <Img
                      key={index}
                      outerCss={{
                        width: 375 * aspectRatio + 'px',
                        display: 'block',
                        float: 'left',
                        margin: '16px'
                      }}
                      sizes={sizes}
                    />
                  )
                })
              }
            </div>
          </Waypoint>
          )
        })
      }
      </div>
    )
  }
}


/*
export const Portfolios = ({
  portfolios,
  sections,
  returnRef,
  onPositionChange
}) => {
  console.log("Portfolios render method called!")
  return (
    <div css={{display: 'inherit'}}>
    {
      portfolios && portfolios.map((portfolio, index) => {
      const refKey = sections[index].key
        return (
          <Waypoint
            horizontal={true}
            onPositionChange={(props) => onPositionChange(props, refKey) }
            key={index}
            ref={ (ref) => returnRef(ref, refKey) }
          >
            <div css={{display: 'inherit'}}>
            {
              portfolio.gallery && portfolio.gallery.map(({image}, index) => {
                const { childImageSharp: { sizes }} = image
                const { aspectRatio, src, srcSet } = sizes
                sizes.sizes = '500px'
                return (
                  <Img
                    key={index}
                    outerCss={{
                      width: 400 * aspectRatio + 'px',
                      display: 'block',
                      float: 'left',
                      margin: '16px'
                    }}
                    sizes={sizes}
                  />
                )
              })
            }
          </div>
        </Waypoint>
        )
      })
    }
    </div>
  )
}
*/

export class Videos extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.videos.length !== nextProps.videos.length) {
      return true
    } else {
      return false
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Videos`)
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Videos`)
    }
  }

  render() {
    const {
      videos,
      returnRef,
    } = this.props
    console.log("Videos render method called!")
    return (
      <Waypoint
        horizontal={true}
        ref={this.handleRef}
        onPositionChange={this.handlePositionChange}
      >
        <div css={{display: 'inherit'}}>
        {
          videos.map((video, index) =>
            <Video
              key={index}
              url={video.url}
              title={video.title}
            />
          )
        }
        </div>
      </Waypoint>
    )
  }
}
/*
export const Videos = ({
  videos,
  returnRef,
  onPositionChange
}) => {
  console.log("Videos render method called!")
  function handlePositionChange(props) {
    if (onPositionChange) {
      onPositionChange(props, `Videos`)
    }
  }
  function handleRef(ref) {
    if (returnRef) {
      returnRef(ref, `Videos`)
    }
  }
  return (
    <Waypoint
      horizontal={true}
      returnRef={handleRef}
      onPositionChange={handlePositionChange}
    >
      <div css={{display: 'inherit'}}>
      {
        videos.map((video, index) =>
          <Video
            key={index}
            url={video.url}
            title={video.title}
          />
        )
      }
      </div>
    </Waypoint>
  )
}
*/

export class Instagram extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.instagram.length !== nextProps.instagram.length) {
      return true
    } else {
      return false
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Instagram`)
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Instagram`)
    }
  }

  render() {
    const {
      instagram,
      returnRef,
    } = this.props
    console.log("Instagram render method called!")
    return (
      <Waypoint
        horizontal={true}
        ref={this.handleRef}
        onPositionChange={this.handlePositionChange}
      >
        <div css={{display: 'inherit'}}>
        {
          instagram.map((photo, index) =>
            <div
              key={index}
              css={{
                position: 'relative',
                display: 'inline-block',
                minWidth: 'auto',
                margin: '0 5px 5px',
                width: window && window.innerWidth,
                textAlign: 'center',
                fontSize: 0,
              }}
            >
              <Img
                style={{
                  width: window && window.innerWidth,
                  height: window && window.innerWidth,
                  marginBottom: 0
                }}
                customAspect={{ height: window && window.innerWidth }}
                objectPosition={'center center'}
                objectFit={'cover'}
                sizes={{ src: photo.node.media }}
              />
            </div>
          )
        }
        </div>
      </Waypoint>
    )
  }
}

/*export const Instagram = ({
  instagram,
  returnRef,
  onPositionChange
}) => {
  console.log("Instagram render method called!")
  function handlePositionChange(props) {
    if (onPositionChange) {
      onPositionChange(props, `Instagram`)
    }
  }
  function handleRef(ref) {
    if (returnRef) {
      returnRef(ref, `Instagram`)
    }
  }
  return (
    <Waypoint
      horizontal={true}
      returnRef={handleRef}
      onPositionChange={handlePositionChange}
    >
      <div css={{display: 'inherit'}}>
      {
        instagram.map((photo, index) =>
          <div
            key={index}
            css={{
              position: 'relative',
              display: 'inline-block',
              minWidth: 'auto',
              margin: '0 5px 5px',
              width: window && window.innerWidth,
              textAlign: 'center',
              fontSize: 0,
            }}
          >
            <Img
              style={{
                width: window && window.innerWidth,
                height: window && window.innerWidth,
                marginBottom: 0
              }}
              customAspect={{ height: window && window.innerWidth }}
              objectPosition={'center center'}
              objectFit={'cover'}
              sizes={{ src: photo.node.media }}
            />
          </div>
        )
      }
      </div>
    </Waypoint>
  )
}*/

export class Biography extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.biography.length !== nextProps.biography.length) {
      return true
    } else {
      return false
    }
  }

  handlePositionChange = (props) => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(props, `Biography`)
    }
  }

  handleRef = (ref) => {
    if (this.props.returnRef) {
      this.props.returnRef(ref, `Biography`)
    }
  }

  render() {
    const {
      biography,
      returnRef,
    } = this.props
    console.log("Biography render method called!")
    return (
      <Waypoint
        horizontal={true}
        ref={this.handleRef}
        onPositionChange={this.handlePositionChange}
      >
        <div css={{display: 'inherit'}}>
          {/*
            biography.portrait && (
              <Img
                style={{
                  margin: '0 16px 0',
                  width: 320 * ( biography.portrait.childImageSharp.resolutions.width / biography.portrait.childImageSharp.resolutions.height ) + 'px',
                  height: 320
                }}
                resolutions={biography.portrait.childImageSharp.resolutions}
              />
            )
          */}
          <div
            css={{
              //columnWidth: window && window.innerWidth,
              //columnCount: 3
              columnCount: 'auto',
              columnWidth: '320px',
              columnGap: '32px',
              [`& p`]: {
                width: '320px',
                lineHeight: '24px',
                fontSize: '16px'
              }
            }}
            dangerouslySetInnerHTML={{ __html: biography.text }}
          />
        </div>
      </Waypoint>
    )
  }
}

/*
export const Biography = ({
  biography,
  returnRef,
  onPositionChange
}) => {
  console.log("Biography render method called!")
  function handlePositionChange(props) {
    if (onPositionChange) {
      onPositionChange(props, `Biography`)
    }
  }
  function handleRef(ref) {
    if (returnRef) {
      returnRef(ref, `Biography`)
    }
  }
  return (
    <Waypoint
      horizontal={true}
      returnRef={handleRef}
      onPositionChange={handlePositionChange}
      //ref={ (ref) => returnRef(ref, `Biography`) }
      //onPositionChange={(props) => onPositionChange(props, `Biography`) }
    >
      <div css={{display: 'inherit'}}>
        {
          biography.portrait && (
            <Img
              style={{
                width: window && window.innerWidth * ( biography.portrait.childImageSharp.resolutions.width / biography.portrait.childImageSharp.resolutions.height ) + 'px',
                height: window && window.innerWidth
              }}
              resolutions={biography.portrait.childImageSharp.resolutions}
            />
          )
        }
        <div
          css={{
            //columnWidth: window && window.innerWidth,
            //columnCount: 3
          }}
          dangerouslySetInnerHTML={{ __html: biography.text }}
        />
      </div>
    </Waypoint>
  )
}*/
