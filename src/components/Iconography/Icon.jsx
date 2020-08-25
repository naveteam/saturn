import React from 'react'
import styled from '@xstyled/styled-components'
import { color, th, space } from '@xstyled/system'
import PropTypes from 'prop-types'

import * as Icons from '../../icons'

const IconComponent = ({ icon, ...props }) => {
  const IconSrc = Icons[`${icon[0].toUpperCase()}${icon.slice(1).replace(/([-_]\w)/g, g => g[1].toUpperCase())}`]

  return IconSrc ? <IconSrc {...props} /> : <Icons.Clear {...props} />
}

const Icon = styled(IconComponent)`
  * {
    fill: ${({ color }) => th.color(color)};
  }
  ${color}
  ${space}
`

Icon.defaultProps = {
  icon: 'clear',
  width: 24,
  height: 24,
  fill: 'rgb(66, 66, 66)'
}

Icon.propTypes = {
  icon: PropTypes.string
}

export default Icon
