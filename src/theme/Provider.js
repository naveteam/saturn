import React from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'
import PropTypes from 'prop-types'

import { Theme } from './Theme'

const ThemeProvider = ({ children, theme }) => {
  return <StyledProvider theme={theme || Theme}>{children}</StyledProvider>
}

ThemeProvider.propTypes = {
  theme: PropTypes.object
}

export { ThemeProvider }
