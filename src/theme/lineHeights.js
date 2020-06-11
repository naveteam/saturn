const lineHeights = ['14px', '16px', '18px', '24px', '32px', '40px', '48px', '64px', '72px']

lineHeights.paragraph = {
  sm: lineHeights[1],
  md: lineHeights[3]
}

// Issue aberta sobre o suporte de "array responsivo" nas alias: https://github.com/styled-system/styled-system/issues/1393
lineHeights.heading = {
  h1: {
    mobile: lineHeights[7],
    desktop: lineHeights[8]
  },
  h2: lineHeights[6],
  h3: lineHeights[5],
  h4: lineHeights[4]
}

lineHeights.subtitle = lineHeights[3]

export default lineHeights
