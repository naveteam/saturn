import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Paragraph = ({ variant, fontWeight, color, fontSize, lineHeight, ...props }) => (
  <Typography
    as='p'
    fontWeight={fontWeight || 'paragraph'}
    color={color || 'typography.paragraph'}
    fontSize={fontSize || `paragraph.${variant}`}
    lineHeight={lineHeight || `paragraph.${variant}`}
    {...props}
  />
)

Paragraph.defaultProps = {
  variant: 'md'
}

Paragraph.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Paragraph
