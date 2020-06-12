import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Paragraph = ({ variant, ...props }) => (
  <Typography
    as='p'
    fontWeight={props.fontWeight || 'paragraph'}
    color={props.color || 'typography.paragraph'}
    fontSize={props.fontSize || `paragraph.${variant}`}
    lineHeight={props.lineHeight || `paragraph.${variant}`}
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
