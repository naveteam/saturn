import React from 'react'

import { Typography } from './'

const Subtitle = ({ color, fontWeight, as, ...props }) => (
  <Typography as={as} fontWeight={fontWeight} color={color} fontSize='subtitle' lineHeight='subtitle' {...props} />
)

Subtitle.propTypes = {
  as: 'p',
  fontWeight: 'subtitle',
  color: 'typography.subtitle',
  ...Typography.propTypes
}

export default Subtitle
