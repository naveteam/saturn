const hasVariantColor = (colorName, colorHue, theme) =>
  colorName && theme.colors[colorName] && theme.colors[colorName][String(colorHue)]

export { hasVariantColor }
