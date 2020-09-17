import { addParameters } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

import theme from './theme'

addParameters({
  options: {
    theme
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS
  }
})
