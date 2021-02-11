import React, { Fragment, useMemo } from 'react'
import { ThemeProvider as StyledProvider } from '@xstyled/styled-components'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import { Theme } from './Theme'

import { merge } from '../utils'

const ThemeProvider = ({ children, theme = {} }) => {
  const mergedTheme = useMemo(() => merge(Theme, theme), [theme])

  return (
    <Fragment>
      <Helmet>
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <StyledProvider theme={mergedTheme}>{children}</StyledProvider>
    </Fragment>
  )
}

ThemeProvider.propTypes = {
  theme: PropTypes.object
}

export { ThemeProvider }
