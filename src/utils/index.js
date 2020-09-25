export function outerWidth(el) {
  var width = el.offsetWidth
  var style = getComputedStyle(el)

  width += parseInt(style.marginLeft) + parseInt(style.marginRight)
  return width
}

export function debounce(func){
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,100,event);
  };
}

export default outerWidth;