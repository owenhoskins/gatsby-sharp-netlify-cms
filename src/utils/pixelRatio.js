import canUseDom from './canUseDom'

const pixelRatio = () => {

  if (canUseDom) {
    if (window.devicePixelRatio >= 2) {
      /* retina display */
      return 2
    } else if (window.devicePixelRatio > 1) {
      /* highDPI display */
      return 1
    } else {
      return 1
    }
  }

}

export default pixelRatio