import React from 'react'
import styled from 'styled-components'
import { space, typography, color } from 'styled-system'
import PropTypes from 'prop-types'

const BaseComponent = ({ as, children, ...props }) => React.createElement(as, props, children)

const Typography = props => <StyledBase {...props} />

const StyledBase = styled(BaseComponent)`
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  ${space};
  ${typography};
  ${color};
`

Typography.defaultProps = {
  as: 'p'
}

Typography.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label', 'a'])
}

export default Typography
