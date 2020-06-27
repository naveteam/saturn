import pallette from './pallette'

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}

const fontSizes = [10, 12, 14, 16, 20, 24, 32, 40, 48]

const fontWeights = [400, 600]

const lineHeights = [14, 16, 18, 24, 32, 40, 48, 64, 72]

const space = [0, 2, 4, 8, 16, 24, 32, 64]

const radii = [0, 2, 4, 8]

const colors = { ...pallette }

colors.primary = colors.blue['400']
colors.primary_hover = colors.blue['600']
colors.primary_active = colors.blue['800']

colors.secondary = colors.cyan['400']
colors.secondary_hover = colors.cyan['600']
colors.secondary_active = colors.cyan['800']

colors.disabled = colors.gray['500']

const Theme = { colors, space, radii, breakpoints, fontSizes, fontWeights, lineHeights }

export { Theme }
