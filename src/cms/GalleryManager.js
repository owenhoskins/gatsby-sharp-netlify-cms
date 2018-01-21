import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

// This is the preview component
export function GalleryPreview({ field, value, getAsset }) {
  console.log('GalleryPreview: ', field, value, getAsset(value))
  const assets = value && value.length && value.map(item => {
    console.log('GalleryPreview assets map: ', item, getAsset(item))
    return item
  })

  console.log("GalleryPreview assets: ", assets)

  return <div></div>
}

GalleryPreview.propTypes = {
  getAsset: PropTypes.func.isRequired,
  value: PropTypes.node
};