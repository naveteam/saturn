import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Caption = ({ variant, as, fontWeight, color, fontSize, lineHeight, ...props }) => (
  <Typography
    as={as || 'p'}
    fontWeight={fontWeight || 'caption'}
    color={color || 'typography.caption'}
    fontSize={fontSize || `caption.${variant}`}
    lineHeight={lineHeight || `caption.${variant}`}
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
