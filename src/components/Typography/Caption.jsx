import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Caption = ({ variant, ...props }) => (
  <Typography
    as='p'
    fontWeight={props.fontWeight || 'caption'}
    color={props.color || 'typography.caption'}
    fontSize={props.fontSize || `caption.${variant}`}
    lineHeight={props.lineHeight || `caption.${variant}`}
    {...props}
  />
)

Caption.defaultProps = {
  variant: 'md'
}

Caption.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Caption
