import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './Typography'

const Caption = ({ as, ...props }) => <Base forwardedAs={props.as} {...props} />

const sizeVariant = variant({
  default: 'md',
  key: 'caption',
  prop: 'variant',
  variants: {
    md: css`
      font-size: 1;
      line-height: 1;
    `,
    sm: css`
      font-size: 0;
      line-height: 0;
    `
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
