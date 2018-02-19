import PropTypes from 'prop-types';
import React from 'react';

import { css } from 'glamor'

const footer = css({
  boxSizing: 'border-box',
  color: '#000',
  cursor: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  position: 'absolute',
  right: '1rem',
  bottom: '1rem'
});

const footerCount = css({
  color: '#000',
  fontSize: '#000',
  paddingLeft: '1em', // add a small gutter for the caption
});

const footerCaption = css({
  flex: '1 1 0'
})

function Footer ({
  caption,
  countCurrent,
  countSeparator,
  countTotal,
  showCount,
  ...props,
}) {
  if (!caption && !showCount) return null;


  const imageCount = showCount ? (
    <div className={`${footerCount}`}>
      {countCurrent}
      {countSeparator}
      {countTotal}
    </div>)
    : <span />;

  return (
    <div className={`${footer}`} {...props}>
      {caption ? (
        <figcaption className={`${footerCaption}`}>
          {caption}
        </figcaption>
      ) : <span />}
      {imageCount}
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  countCurrent: PropTypes.number,
  countSeparator: PropTypes.string,
  countTotal: PropTypes.number,
  showCount: PropTypes.bool,
};

export default Footer;
