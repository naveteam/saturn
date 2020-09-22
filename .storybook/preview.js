import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import theme from './theme'

export const parameters = {
  options: {
    theme
  },
  
  viewport: {
    viewports: MINIMAL_VIEWPORTS
  }
}
