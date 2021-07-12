export const getThemeColor = (colorName, theme) => {
  const [color, hue] = colorName.split('.')
  const colorOnTheme = theme.colors[color]

  if (colorOnTheme) {
    const colorWithHue = theme.colors[color][`${hue}`] || theme.colors[color]['500']
    return colorWithHue
  }

  return colorName
}
