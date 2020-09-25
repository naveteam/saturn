import React from 'react'
import styled from '@xstyled/styled-components'
import { layout, variant, space, typography, color, system } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './../Typography/Typography'

const DefaultComponent = ({ children, to, textDecorationLine, color, ...props }) => (
  <StyledLink href={to} color={color} textDecorationLine={textDecorationLine} {...props}>
    {children}
  </StyledLink>
)

const Link = ({ component, propPath, children, to, as, target, color, passHref, textDecorationLine, ...props }) => {
  const Base = component ? component : DefaultComponent
  const mountPath = { [propPath]: to }

  return (
    <BaseStyled display='flex' {...props}>
      <Label alignItems='center' forwardedAs={as}>
        <Base {...mountPath} {...passHref} color={color} textDecorationLine={textDecorationLine} target={target}>
          {component ? (
            <a color={color} target={target}>
              {children}
            </a>
          ) : (
            children
          )}
        </Base>
      </Label>
    </BaseStyled>
  )
}

const BaseStyled = styled.div`
  ${typography}
  ${layout}
  ${space}
  ${color}
`

const StyledLink = styled.a`
  text-decoration-line: ${({ textDecorationLine }) => (textDecorationLine ? textDecorationLine : 'none')};
  ${color}
  &:hover {
    text-decoration-line: underline;
    color: blue.500;
  }
  &:active {
    font-weight: bold;
  }
`

const Label = styled(Typography)`
  text-decoration-line: ${({ textDecorationLine }) => (textDecorationLine ? textDecorationLine : 'none')};
  ${typography}
  ${variant}
  ${space}
  ${color}
  ${layout}
  ${system({
    textDecoration: true,
    fontWeight: {
      property: 'fontWeight',
      scale: 'fontWeights'
    }
  })}
  &:hover {
    text-decoration-line: underline;
    color: blue.500;
  }
  &:active {
    font-weight: bold;
  }
`

Link.defaultProps = {
  component: '',
  propPath: 'href',
  target: '_self',
  to: '#',
  as: 'p',
  color: 'blue.300'
}

Link.propTypes = {
  component: PropTypes.oneOf(['', 'Link']),
  propPath: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  to: PropTypes.string,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label', 'a']),
  color: PropTypes.string
}

export default Link
