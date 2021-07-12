import React from 'react'

import styled from 'styled-components'
import { variant, space, color, layout, border, position } from 'styled-system'

import PropTypes from 'prop-types'
import systemPropTypes from '@styled-system/prop-types'

import { getThemeColor } from '../../utils'
import * as Icons from '../../icons'

const IconComponent = ({ icon, ...rest }) => {
  const IconSrc = Icons[`${icon[0].toUpperCase()}${icon.slice(1).replace(/([-_]\w)/g, g => g[1].toUpperCase())}`]

  return IconSrc ? <IconSrc {...rest} /> : <Icons.HelpOutline {...rest} />
}

const Icon = styled(IconComponent)`
  * {
    fill: ${({ color, theme }) => getThemeColor(color, theme)};
  }

  ${variant({
    prop: 'variantSize',
    variants: {
      xsm: {
        width: '0.9rem',
        height: '0.9rem'
      },
      sm: {
        width: '1rem',
        height: '1rem'
      },
      md: {
        width: '1.5rem',
        height: '1.5rem'
      },
      lg: {
        width: '2rem',
        height: '2rem'
      }
    }
  })}

  ${space}
  ${color}
  ${layout}
  ${border}
  ${position}
`

Icon.defaultProps = {
  icon: 'clear',
  color: 'gray.800',
  variantSize: 'md'
}

Icon.propTypes = {
  icon: PropTypes.string,
  variantSize: PropTypes.oneOf(['xsm', 'sm', 'md', 'lg']),
  ...systemPropTypes.space,
  ...systemPropTypes.color,
  ...systemPropTypes.layout,
  ...systemPropTypes.border,
  ...systemPropTypes.position
}

export default Icon
