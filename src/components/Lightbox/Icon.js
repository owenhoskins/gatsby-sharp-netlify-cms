import PropTypes from 'prop-types';
import React from 'react';
import ArrowLeft from '../Icons/ArrowLeft';
import ArrowRight from '../Icons/ArrowRight';
import Close from '../Icons/Close';

const icons = { ArrowLeft, ArrowRight, Close };

const Icon = ({ fill, type, ...props }) => {
  const icon = icons[type];

  return (
    <span
      dangerouslySetInnerHTML={{ __html: icon(fill) }}
      {...props}
    />
  );
};

Icon.propTypes = {
  fill: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(icons)),
};
Icon.defaultProps = {
  fill: 'white',
};

export default Icon;
