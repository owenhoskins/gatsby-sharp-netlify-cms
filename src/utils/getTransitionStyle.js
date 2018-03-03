const getTransitionStyles = timeout => {
  return {
    entering: {
      opacity: 0,
      filter: `blur(50px)`
    },
    entered: {
      transition: `opacity ${timeout}ms ease-in-out, filter 5000ms ease-in-out`,
      opacity: 1,
      filter: `blur(0)`
    },
    exiting: {
      transition: `opacity ${timeout}ms ease-in-out, filter 5000ms ease-in-out`,
      opacity: 0,
      filter: `blur(50px)`
    },
  }
}

const getTransitionStyle = ({ timeout, status }) =>
  getTransitionStyles(timeout)[status]

export default getTransitionStyle
