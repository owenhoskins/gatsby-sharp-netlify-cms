/*module.exports = {
  mobile: `(min-width: 400px)`,
  Mobile: `@media (min-width: 400px)`,
  phablet: `(min-width: 550px)`,
  Phablet: `@media (min-width: 550px)`,
  tablet: `(min-width: 750px)`,
  Tablet: `@media (min-width: 750px)`,
  desktop: `(min-width: 1000px)`,
  Desktop: `@media (min-width: 1000px)`,
  hd: `(min-width: 1200px)`,
  Hd: `@media (min-width: 1200px)`,
}
*/

// em = 16px
export const LARGER_DISPLAY_WIDTH = '100em' // 1600px
export const LARGE_DISPLAY_WIDTH = '77.5em' // 1240px
export const DEFAULT_WIDTH = '67.5em' // 1080px
export const TABLET_WIDTH = '48em' // 768px
export const MOBILE_WIDTH = '30em' // 480px

export const LARGER_DISPLAY_MQ =
  `@media only screen and (max-width:${LARGER_DISPLAY_WIDTH})`
export const LARGE_DISPLAY_MQ =
  `@media only screen and (max-width:${LARGE_DISPLAY_WIDTH})`
export const DEFAULT_MQ = `@media only screen and (max-width:${DEFAULT_WIDTH})`
export const TABLET_MQ = `@media only screen and (max-width:${TABLET_WIDTH})`
export const MOBILE_MQ = `@media only screen and (max-width:${MOBILE_WIDTH})`

export const MIN_LARGER_DISPLAY_MQ = `@media (min-width:${LARGER_DISPLAY_WIDTH})`
export const MIN_LARGE_DISPLAY_MQ = `@media (min-width:${LARGE_DISPLAY_WIDTH})`
export const MIN_DEFAULT_MQ = `@media (min-width:${DEFAULT_WIDTH})`
export const MIN_TABLET_MQ = `@media (min-width:${TABLET_WIDTH})`
export const MIN_MOBILE_MQ = `@media (min-width:${MOBILE_WIDTH})`


