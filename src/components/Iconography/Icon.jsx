import React, { useMemo, forwardRef } from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

const Icon = forwardRef((props, ref) => <Base ref={ref} {...props} />)

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

const Base = styled(IconComponent)``

Icon.defaultProps = {
  icon: 'clear',
  width: 24,
  height: 24
}

Icon.propTypes = {
  icon: PropTypes.string
}

export default Icon
