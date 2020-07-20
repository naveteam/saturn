import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const Icon = ({ icon }) => {
  const src = useMemo(() => {
    try {
      return require(`../../assets/icons/${icon}.svg`)
    } catch {
      return require('../../assets/icons/clear.svg')
    }
  }, [icon])

  return <img src={src} />
}

Icon.defaultProps = {
  icon: 'clear'
}

Icon.propTypes = {
  icon: PropTypes.string
}

export default Icon
