const getTransitionStyles = (timeout, transform) => {
  return {
    entering: {
      opacity: 0,
      //transform: transform ? `translateX(40px)` : 'none',
      filter: `blur(50px)`
    },
    entered: {
      transition: `opacity ${timeout}ms ease-in-out, transform ${timeout}ms ease-out, filter ${timeout * 2}ms ease-out`,
      //transform: transform ? `translateX(0)` : 'none',
      opacity: 1,
      filter: `blur(0)`
    },
    exiting: {
      transition: `opacity ${timeout}ms ease-in-out, transform ${timeout}ms ease-out, filter ${timeout * 2}ms ease-out`,
      opacity: 0,
      filter: `blur(50px)`,
      //transform: transform ? `translateX(-40px)` : 'none',
    },
  }
}

const getTransitionStyle = ({ timeout, transform, status }) =>
  getTransitionStyles(timeout, transform)[status]

export default getTransitionStyle
