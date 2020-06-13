import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Caption = ({ variant, as, fontWeight, color, fontSize, lineHeight, ...props }) => (
  <Typography
    as={as}
    fontWeight={fontWeight}
    color={color}
    fontSize={fontSize || `caption.${variant}`}
    lineHeight={lineHeight || `caption.${variant}`}
    {...props}
  />
)

Caption.defaultProps = {
  variant: 'md',
  as: 'p',
  fontWeight: 'caption',
  color: 'typography.caption'
}

Caption.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Caption
