import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'
import PropTypes from 'prop-types'

import Typography from './Typography'

const Paragraph = ({ as, ...props }) => <Base forwardedAs={props.as} {...props} />

const sizeVariant = variant({
  default: 'md',
  key: 'paragraph',
  prop: 'variant',
  variants: {
    md: {
      fontSize: 3,
      lineHeight: 3
    },
    sm: {
      fontSize: 2,
      lineHeight: 1
    }
  }
})

const Base = styled(Typography)`
  ${sizeVariant}
`

Paragraph.defaultProps = {
  variant: 'md',
  as: 'p',
  fontWeight: 0
}

Paragraph.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Paragraph
