import React from 'react'

import Typography from './Typography'

const Subtitle = props => <Typography {...props} />

Subtitle.defaultProps = {
  as: 'p',
  fontWeight: 1,
  fontSize: 3,
  lineHeight: 3
}

Subtitle.propTypes = {
  ...Typography.propTypes
}

export default Subtitle
