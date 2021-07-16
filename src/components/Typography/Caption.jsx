import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import PropTypes from 'prop-types'

import Typography from './Typography'

const Caption = ({ as, ...props }) => <Base forwardedAs={props.as} {...props} />

const sizeVariant = variant({
  default: 'md',
  key: 'caption',
  prop: 'variant',
  variants: {
    md: {
      fontSize: 1,
      lineHeight: 1
    },
    sm: {
      fontSize: 0,
      lineHeight: 0
    }
  }
})

const Base = styled(Typography)`
  ${sizeVariant}
`

Caption.defaultProps = {
  variant: 'md',
  as: 'p',
  fontWeight: 0
}

Caption.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Caption
