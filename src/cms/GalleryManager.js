import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Gallery from 'react-photo-gallery'

/*
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { partial } from 'lodash';
import c from 'classnames';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
//import { Icon, ListItemTopBar } from 'UI';
//import ObjectControl from 'EditorWidgets/Object/ObjectControl';
*/


// This is the editing component
export class GalleryControl extends Component {
  render() {
    return <div></div>;
  }
}

export class GalleryPreview extends Component {

  static propTypes = {
    value: PropTypes.node,
  }

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loaded: []
    }
  }

  componentDidMount() {
    this.loadImages()
  }

  componentDidUpdate() {
    this.loadImages()
  }

  loadImages = () => {
    const { value, getAsset } = this.props
    const self = this
    value.forEach(function(val, index) {
      const src = val.getIn(['image'])
      // console.log('valueMap: ', val);
      // console.log('imageMap src: ', src)
      const asset = getAsset(src)
      // console.log('getAsset: ', asset, asset && asset.path)

      if (asset) {

        var found = self.state.loaded.find(element => {
          return element === asset.path;
        });

        // console.log('found? ', found)

        if (!found) {
          // https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
          var image = new Image();
          image.src = asset.path;

          image.onload = function(event) {
            const img = event.currentTarget

            // https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index
            // arr.splice(index, 0, item);

            // https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs

            self.setState(prevState => ({
              images: [
                ...prevState.images,
                {
                  src: img.src,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  order: index
                }
              ],
              loaded: [
                ...prevState.loaded,
                asset.path
              ]
            }))


          }
        }
      }
    })
  }

  get photos() {
    if (this.state.loaded.length > 0) {
      console.log('get photos loaded: ', this.state.images)
      const ordered = this.state.images.concat().sort(function(a, b){
        return a.order > b.order;
      });
      return ordered
    } else {
      return []
    }
  }

  render() {
    console.log('this.photos: ', this.photos)
    return <Gallery photos={this.photos} />
  }
}