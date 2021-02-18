const hasVariantColor = (colorName, colorHue, theme) =>
  theme.colors?.[colorName] && theme.colors?.[colorName][String(colorHue)]

export { hasVariantColor }
