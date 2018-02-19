import PropTypes from 'prop-types';
import React from 'react';

import Icon from './Icon';

import { css } from 'glamor'

const arrow = css({
  background: 'none',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  outline: 'none',
  padding: '1rem', // increase hit area
  position: 'absolute',
  top: '50%',
  // disable user select
  WebkitTouchCallout: 'none',
  userSelect: 'none',
  height: '4rem',
  marginTop: 'calc(4rem / -2)',
  width: '4rem',
});

// direction
const right = css({
  right: '2rem'
});
const left = css({
  left: '2rem'
});

function Arrow ({
  direction,
  icon,
  onClick,
  size,
  ...props,
}) {
  return (
    <button
      type="button"
      className={
       `${arrow} ${direction === 'right' ? right : left}`
      }
      onClick={onClick}
      onTouchEnd={onClick}
      {...props}
    >
      <Icon fill={'#5B507B'} type={icon} />
    </button>
  );
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
Arrow.defaultProps = {
  size: 'medium',
};


export default Arrow;
