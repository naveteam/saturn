import React from 'react'
import styled from 'styled-components'
import { space, typography, color } from 'styled-system'
import PropTypes from 'prop-types'
import StyledSystemPropTypes from '@styled-system/prop-types'

const BaseComponent = props => {
  const { as, children, ...rest } = props
  return React.createElement(as, rest, children)
}

const Typography = ({ color, ...props }) => {
  return <StyledBase color={color} {...props} />
}

const StyledBase = styled(BaseComponent)`
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  ${space}
  ${typography}
  ${color}
`

Typography.defaultProps = {
  as: 'p',
  color: 'typography.default'
}

Typography.propTypes = {
  ...StyledSystemPropTypes.space,
  ...StyledSystemPropTypes.typography,
  ...StyledSystemPropTypes.color,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label'])
}

export default Typography
