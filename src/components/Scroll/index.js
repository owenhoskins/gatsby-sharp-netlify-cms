import React from 'react'
import PropTypes from 'prop-types'
import EventListener, { withOptions } from 'react-event-listener'

class Scroll extends React.Component {

  static propTypes = {
  }

  static childContextTypes = {
    direction: PropTypes.string,
    scrolled: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      direction: "",
      scrolled: false
    }

  }

  getChildContext() {
    return {
      direction: this.state.direction,
      scrolled: this.state.scrolled
    }
  }

  getScrollDirection = () => {
    let currentY = window.pageYOffset || document.documentElement.scrollTop;
    if (currentY > this.lastY) {
      this.lastY = currentY;
    } else {
      this.lastY = currentY;
    }

    if (this.lastY > 100) {
      this.setState({scrolled: true})
    }

  }

  handleScroll = () => {

    // what direction are we going?

    // console.log(this.lastY, window.scrollY || window.pageYOffset)

    if (this.lastY > (window.scrollY || window.pageYOffset)) {
      //this.setState({ direction: 'up' })
    } else {
      //this.setState({ direction: 'down' })
    }

    //this.setState({scrollY: window.scrollY || window.pageYOffset})

    this.getScrollDirection()
    // this.lastY = (window.scrollY || window.pageYOffset);

  }

  render () {
    const {
      children
    } = this.props

    return (
      <div
      >
        <EventListener
          target={ 'window' }
          onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}
        />
        { children }
      </div>
    )
  }

}

export default Scroll


export { default as ScrollHorizontal } from './ScrollHorizontal'
export { default as ScrollLeft } from './ScrollLeft'
export { default as ScrollTop } from './ScrollTop'
