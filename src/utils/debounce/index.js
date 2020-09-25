export function debounce(func) {
  var timer
  return function (event) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, 100, event)
  }
}

export default debounce
