import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Heading = ({ variant, ...props }) => {
  const fontSize = useMemo(() => {
    switch (variant) {
      case 'h1':
        return [7, 8]
      case 'h2':
        return 6
      case 'h3':
        return 5
      case 'h4':
        return 4
      default:
        return [7, 8]
    }
  }, [variant])

  return <Typography as={variant} fontSize={props.fontSize || fontSize} {...props} />
}

Heading.defaultProps = {
  variant: 'h1'
}

Heading.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4'])
}

export default Heading
