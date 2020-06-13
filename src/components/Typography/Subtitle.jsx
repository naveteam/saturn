import React from 'react'

import { Typography } from './'

const Subtitle = props => <Typography fontSize='subtitle' lineHeight='subtitle' {...props} />

Subtitle.defaultProps = {
  as: 'p',
  fontWeight: 'subtitle',
  color: 'typography.subtitle'
}

Subtitle.propTypes = {
  ...Typography.propTypes
}

export default Subtitle
