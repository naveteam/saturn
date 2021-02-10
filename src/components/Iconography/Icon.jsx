import React from 'react'
import styled, { variant, css } from '@xstyled/styled-components'
import { borders, color, th, space, layout } from '@xstyled/system'
import PropTypes from 'prop-types'

import * as Icons from '../../icons'

const IconComponent = ({ icon, size, ...props }) => {
  const IconSrc = Icons[`${icon[0].toUpperCase()}${icon.slice(1).replace(/([-_]\w)/g, g => g[1].toUpperCase())}`]

  return IconSrc ? <IconSrc {...props} /> : <Icons.Clear {...props} />
}

const Icon = styled(IconComponent)`
  * {
    fill: ${({ color }) => th.color(color)};
  }
  ${borders}
  ${color}
  ${space}
  ${layout}

  ${variant({
    prop: 'size',
    variants: {
      sm: css`
        width: 1rem;
        height: 1rem;
      `,
      md: css`
        width: 1.5rem;
        height: 1.5rem;
      `,
      lg: css`
        width: 2rem;
        height: 2rem;
      `
    }
  })}
`

Icon.defaultProps = {
  icon: 'clear',
  fill: 'rgb(66, 66, 66)',
  size: 'md'
}

Icon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default Icon
