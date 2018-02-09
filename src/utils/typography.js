import Typography from "typography"


export const basekick = (options) => {

  const settings = {
    baseFontSize: 16,
    gridRowHeight: 8,
    typeSizeModifier: 2,
    descenderHeightScale: 0.2,
    ...options
  }

  const calculateLineHeightAsScale = (lineHeight) => {
    return (lineHeight / (settings.typeSizeModifier * settings.baseFontSize))
  }

  const calculateTypeOffset = (lineHeightScale) => {
    return ((lineHeightScale - 1) / 2) + settings.descenderHeightScale
  }

  const lineHeightScale = calculateLineHeightAsScale(settings.lineHeightOverride || (settings.typeRowSpan * settings.gridRowHeight))
  const typeOffset = calculateTypeOffset(lineHeightScale)

  return {
    fontSize: (settings.typeSizeModifier * settings.baseFontSize) + 'px',
    lineHeight: lineHeightScale + 'em',
    transform: 'translateY(' + typeOffset + 'em)'
  }

}

export const options = {
  baseFontSize: `16px`,
  baseLineHeight: `32px`,
  scaleRatio: 2,
  headerColor: `#575483`,
  bodyColor: `#575483`,
  blockMarginBottom: 0.75,
  headerFontFamily: [`neuzeit`, `sans-serif`],
  bodyFontFamily: [`neuzeit`, `sans-serif`],
  overrideStyles: () => {
    return {
      html: {
        overflowY: `scroll`,
      },
      h1: {

      },
      a: {
        color: `#575483`,
        textDecoration: 'none'
      },
    }
  },
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
