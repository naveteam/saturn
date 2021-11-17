import pallette from './pallette'

const breakpoints = [0, 600, 960, 1280, 1920]
breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]

const fontSizes = [10, 12, 14, 16, 20, 24, 32, 40, 48]

const fontWeights = [400, 600]

const lineHeights = ['14px', '16px', '18px', '24px', '32px', '40px', '48px', '64px', '72px']

const space = [0, 2, 4, 8, 16, 24, 32, 64]

const radii = [0, 2, 4, 8]

const colors = { ...pallette }

colors.primary = colors.blue['400']
colors.primary_hover = colors.blue['600']
colors.primary_active = colors.blue['800']

colors.secondary = colors.cyan['400']
colors.secondary_hover = colors.cyan['600']
colors.secondary_active = colors.cyan['800']

colors.success = colors.green['400']
colors.error = colors.red['400']
colors.warning = colors.amber['400']
colors.info = colors.blue['400']

colors.disabled = colors.gray['500']

const Theme = { colors, space, radii, breakpoints, fontSizes, fontWeights, lineHeights }

export { Theme }
