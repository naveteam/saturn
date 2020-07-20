import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const Icon = ({ icon }) => {
  const IconBase = useMemo(() => {
    try {
      return require(`../../assets/icons/${icon}.svg`).ReactComponent
    } catch {
      return require('../../assets/icons/clear.svg').ReactComponent
    }
  }, [icon])

  return <IconBase />
}

Icon.defaultProps = {
  icon: 'clear'
}

Icon.propTypes = {
  icon: PropTypes.string
}

export default Icon
