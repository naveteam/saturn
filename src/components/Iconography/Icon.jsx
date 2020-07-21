import React, { useMemo, forwardRef } from 'react'
import styled from '@xstyled/styled-components'
import { color, th } from '@xstyled/system'
import PropTypes from 'prop-types'

const IconComponent = ({ icon, ...props }) => {
  const IconSrc = useMemo(() => {
    try {
      return require(`../../assets/icons/${icon}.svg`).ReactComponent
    } catch {
      return require('../../assets/icons/clear.svg').ReactComponent
    }
  }, [icon])

  return <IconSrc {...props} />
}

const Icon = styled(IconComponent)`
  * {
    fill: ${({ color }) => th.color(color)};
  }
  ${color}
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
