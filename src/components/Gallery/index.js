import React from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import Measure from 'react-measure'
import { window } from 'global'

const ESC_KEY = 27


export default class PhotoGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      width: -1
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  handleKeyDown = (evt) => {
    if (evt.keyCode === ESC_KEY) {
      if (this.state.lightboxIsOpen) {
        this.closeLightbox()
      }
    }
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.document.addEventListener('keydown', this.handleKeyDown)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.document.removeEventListener('keydown', this.handleKeyDown)
    }
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    const { photos, renderImage } = this.props
    const { width } = this.state
    return (
      <div>
        <Measure bounds onResize={
          (contentRect) => this.setState({ width: contentRect.bounds.width })
        }>
          {
            ({ measureRef }) =>
              <div ref={measureRef}>
                {width > 1 &&
                <Gallery
                  columns={
                    width < 500 ? 1 : width < 760 ? 2 : width < 1024 ? 3 : 4
                  }
                  ImageComponent={renderImage}
                  photos={photos} onClick={this.openLightbox}
                />
                }
              </div>
          }
        </Measure>
        <Lightbox images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }
}