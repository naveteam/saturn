import React from 'react'

import { Typography } from './'

const Subtitle = props => <Typography as='p' fontSize={3} {...props} />

Subtitle.propTypes = {
  ...Typography.propTypes
}

export default Subtitle
