export default props => {
  if (!props) return ''
  const { mx, my, mb, mt, ml, mr, px, py, pb, pt, pr, pl, width, maxWidth } = props
  const modifiers = {
    mx,
    my,
    mb,
    mt,
    ml,
    mr,
    px,
    py,
    pb,
    pt,
    pr,
    pl,
    width,
    maxWidth
  }

  const styles = Object.entries(modifiers).filter(([_, value]) => value)
  const stylesToBeRendered = styles
    .map(([key, value]) => {
      return parseModifiers[key](value)
    })
    .join('')
  return stylesToBeRendered
}

const parseModifiers = {
  mx: value => `margin-left: ${value}; margin-right: ${value};`,
  my: value => `margin-top: ${value}; margin-bottom: ${value};`,
  mt: value => `margin-top: ${value};`,
  mb: value => `margin-bottom: ${value};`,
  ml: value => `margin-left: ${value};`,
  mr: value => `margin-right: ${value};`,
  px: value => `padding-left: ${value}; padding-right: ${value};`,
  py: value => `padding-top: ${value}; padding-bottom: ${value};`,
  pt: value => `padding-top: ${value};`,
  pb: value => `padding-bottom: ${value};`,
  pr: value => `padding-right: ${value};`,
  pl: value => `padding-left: ${value};`,
  width: value => `width: ${value};`,
  maxWidth: value => `max-width: ${value};`
}
