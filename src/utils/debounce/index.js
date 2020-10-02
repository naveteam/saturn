export const debounce = (func, delay = 200) => {
  let timer
  return event => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func, delay, event)
  }
}

export default debounce
