import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { Typography } from './'

const Heading = ({ variant, fontSize, lineHeight, ...props }) => {
  // Issue aberta sobre o suporte de "array responsivo" nas alias: https://github.com/styled-system/styled-system/issues/1393
  const fontProps = useMemo(() => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: fontSize || [`heading.${variant}.mobile`, `heading.${variant}.desktop`],
          lineHeight: lineHeight || [`heading.${variant}.mobile`, `heading.${variant}.desktop`]
        }
      default:
        return {
          fontSize: fontSize || `heading.${variant}`,
          lineHeight: lineHeight || `heading.${variant}`
        }
    }
  }, [variant])

  return <Typography {...fontProps} as={variant} {...props} />
}

Heading.defaultProps = {
  variant: 'h1',
  fontWeight: 'heading',
  color: 'typography.heading'
}

Heading.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4'])
}

export default Heading
