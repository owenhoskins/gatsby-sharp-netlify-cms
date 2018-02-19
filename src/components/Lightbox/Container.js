import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor'

const containerStyles = css({
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  boxSizing: 'border-box',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  left: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: '-1',
})

function Container ({ ...props }) {

  return (
    <div
      id="lightboxBackdrop"
      className={`${containerStyles}`}
      css={{
        opacity: props.isOpen ? 1 : 0.3,
        transition: '2s opacity ease-in-out, 2s filter ease-in-out, 2s transform ease-in-out',
        filter: props.isOpen ? 'blur(0)' : 'blur(50px)',
        transform: props.isOpen ? 'scale(1)' : 'scale(1.1)',
        pointerEvents: props.isOpen ? 'auto' : 'none'
      }}
      {...props}
    />
  );
}

export default Container;
