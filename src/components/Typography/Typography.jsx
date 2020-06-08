import React from 'react'
import styled from 'styled-components'
import { typography, color } from 'styled-system'
import PropTypes from 'prop-types'

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
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label']),
  fontFamily: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  letterSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  textAlign: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default Typography
