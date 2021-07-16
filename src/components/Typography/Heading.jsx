import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import PropTypes from 'prop-types'

import Typography from './Typography'

const Heading = props => <Base forwardedAs={props.variant} {...props} />

const tagVariant = variant({
  default: 'h1',
  key: 'heading',
  prop: 'variant',
  variants: {
    h1: {
      fontSize: [7, 7, 8],
      lineHeight: [7, 7, 8]
    },
    h2: {
      fontSize: 6,
      lineHeight: 6
    },
    h3: {
      fontSize: 5,
      lineHeight: 5
    },
    h4: {
      fontSize: 4,
      lineHeight: 4
    }
  }
})

const Base = styled(Typography)`
  ${tagVariant}
`

Heading.defaultProps = {
  variant: 'h1',
  fontWeight: 1
}

Heading.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4'])
}

export default Heading
