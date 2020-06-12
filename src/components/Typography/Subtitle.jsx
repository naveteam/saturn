import React from 'react'

import { Typography } from './'

const Subtitle = props => (
  <Typography
    as='p'
    color={props.color || 'typography.subtitle'}
    fontSize='subtitle'
    lineHeight='subtitle'
    {...props}
  />
)

Subtitle.propTypes = {
  ...Typography.propTypes
}

export default Subtitle
