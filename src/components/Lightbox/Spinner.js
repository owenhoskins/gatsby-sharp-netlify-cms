import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor'

const spinnerStyles = css({
    display: 'inline-block',
    position: 'relative',
    width: '2rem',
    height: '2rem',
})

const rippleKeyframes = css.keyframes({
  '0%': {
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    opacity: 1,
  },
  '100%': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  },
})

const rippleStyles =  css({
  position: 'absolute',
  border: `4px solid #fff`,
  opacity: 1,
  borderRadius: '50%',
  animationName: `${rippleKeyframes}`,
  animationDuration: '1s',
  animationTimingFunction: 'cubic-bezier(0, 0.2, 0.8, 1)',
  animationIterationCount: 'infinite',
});

const Spinner = props => {

  return (
    <div className={`${spinnerStyles}`}>
      <div className={`${rippleStyles}`} />
    </div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Spinner;
