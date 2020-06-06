import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

import { Theme } from './Theme'

const Provider = ({ children, theme }) => {
  return <ThemeProvider theme={theme || Theme}>{children}</ThemeProvider>
}

Provider.propTypes = {
  theme: PropTypes.object
}

export { Provider }
