import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import modifiers from 'src/helpers/modifiers'

const Component = props => {
  const { as, children, ...rest } = props
  return React.createElement(as, rest, children)
}

const StyledTypography = styled(Component)`
  ${props => {
    const { theme, color, fontSize, fontFamily } = props
    return `
      ${modifiers(props)}
      font-family: ${fontFamily || 'Roboto'};
      color: ${color || theme.colors.darkGrey};
      ${fontSize ? `font-size: ${fontSize};` : ''}
    `
  }};
`

const Typography = props => <StyledTypography {...props} />

Typography.defaultProps = {
  as: 'p'
}

Typography.propTypes = {
  as: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontFamily: PropTypes.string
}

export default Typography
