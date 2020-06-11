const fontSizes = [10, 12, 14, 16, 20, 24, 32, 40, 48]

fontSizes.paragraph = {
  sm: fontSizes[2],
  md: fontSizes[3]
}

// Issue aberta sobre o suporte de "array responsivo" nas alias: https://github.com/styled-system/styled-system/issues/1393
fontSizes.heading = {
  h1: {
    mobile: fontSizes[7],
    desktop: fontSizes[8]
  },
  h2: fontSizes[6],
  h3: fontSizes[5],
  h4: fontSizes[4]
}

fontSizes.subtitle = fontSizes[3]

fontSizes.caption = {
  sm: fontSizes[0],
  md: fontSizes[1]
}

export default fontSizes
