import React from 'react'

import { Typography } from './'

const Subtitle = ({ color, fontWeight, as, ...props }) => (
  <Typography
    as={as || 'p'}
    fontWeight={fontWeight || 'subtitle'}
    color={color || 'typography.subtitle'}
    fontSize='subtitle'
    lineHeight='subtitle'
    {...props}
  />
)

Subtitle.propTypes = {
  ...Typography.propTypes
}

export default Subtitle
