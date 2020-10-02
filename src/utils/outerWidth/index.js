export const outerWidth = el => {
  const style = getComputedStyle(el)
  const width = el.offsetWidth + (parseInt(style.marginLeft) + parseInt(style.marginRight))
  return width
}

export default outerWidth
