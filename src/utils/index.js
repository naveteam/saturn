export function outerWidth(el) {
  var width = el.offsetWidth
  var style = getComputedStyle(el)

  width += parseInt(style.marginLeft) + parseInt(style.marginRight)
  return width
}

export default outerWidth;