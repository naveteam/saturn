import React from 'react'
import styled from 'styled-components'
import { typography, color } from 'styled-system'
import PropTypes from 'prop-types'
import StyledSystemPropTypes from '@styled-system/prop-types'

const BaseComponent = props => {
  const { as, children, ...rest } = props
  return React.createElement(as, rest, children)
}

const Typography = props => {
  return <StyledBase {...props} />
}

const StyledBase = styled(BaseComponent)`
  ${typography}
  ${color}
`

Typography.defaultProps = {
  as: 'p',
  fontFamily: '"Open Sans", sans-serif',
  color: 'black'
}

Typography.propTypes = {
  ...StyledSystemPropTypes.typography,
  ...StyledSystemPropTypes.color,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label'])
}

export default Typography
