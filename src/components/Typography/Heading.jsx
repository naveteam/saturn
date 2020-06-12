import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Heading = ({ variant, ...props }) => {
  // Issue aberta sobre o suporte de "array responsivo" nas alias: https://github.com/styled-system/styled-system/issues/1393
  const fontProps = useMemo(() => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: props.fontSize || [`heading.${variant}.mobile`, `heading.${variant}.desktop`],
          lineHeight: props.lineHeight || [`heading.${variant}.mobile`, `heading.${variant}.desktop`]
        }
      default:
        return {
          fontSize: props.fontSize || `heading.${variant}`,
          lineHeight: props.lineHeight || `heading.${variant}`
        }
    }
  }, [])

  return <Typography color={props.color || 'typography.heading'} as={variant} {...fontProps} {...props} />
}

Heading.defaultProps = {
  variant: 'h1'
}

Heading.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4'])
}

export default Heading
