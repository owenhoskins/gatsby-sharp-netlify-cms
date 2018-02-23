import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'glamor'
import Icon from './Icon';

const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  zIndex: 2000
})
const closeStyle = css({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  position: 'relative',
  top: 0,
  verticalAlign: 'bottom',

  // increase hit area
  padding: '0.5rem',
  marginRight: '-0.5rem',
  height: '2rem',
  width: '2rem',
})

function Header ({
  customControls,
  onClose,
  showCloseButton,
  closeButtonTitle,
  ...props,
}) {

  return (
    <div className={`${headerStyle}`} {...props}>
      {customControls ? customControls : <span />}
      {!!showCloseButton && (
        <button
          title={closeButtonTitle}
          className={`${closeStyle}`}
          onClick={onClose}
        >
          <Icon fill={'#5B507B'} type="Close" />
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  customControls: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
};
Header.contextTypes = {
};


export default Header;
