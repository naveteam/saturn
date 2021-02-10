import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { layout, space, typography, color } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './../Typography/Typography'
import { hasVariantColor } from '../../utils'

// A prop color está depreciada, na proxima versão será totalmente substituida pela prop colorScheme
const DefaultComponent = ({ children, to, textDecorationLine, colorScheme, color, ...props }) => (
  <StyledLink
    p={1}
    href={to}
    color={color}
    colorScheme={colorScheme}
    textDecorationLine={textDecorationLine}
    {...props}
  >
    {children}
  </StyledLink>
)

// A prop color está depreciada, na proxima versão será totalmente substituida pela prop colorScheme
const Link = ({
  component,
  propPath,
  children,
  to,
  as,
  target,
  color,
  colorScheme,
  passHref,
  textDecorationLine,
  ...props
}) => {
  const Base = component ? component : DefaultComponent
  const mountPath = { [propPath]: to }

  return (
    <BaseStyled display='flex' {...props}>
      <Label alignItems='center' forwardedAs={as}>
        <Base
          {...mountPath}
          {...passHref}
          color={color}
          colorScheme={colorScheme}
          textDecorationLine={textDecorationLine}
          target={target}
        >
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
  border-radius: 4px;
  ${space}
  ${color}

  transition: color 0.2s ease;
  ${({ colorScheme, theme }) => {
    if (colorScheme)
      return css`
        color: ${hasVariantColor(colorScheme, '300', theme) ? `${colorScheme}.300` : 'blue.300'};
      `
  }};

  &:hover {
    text-decoration-line: underline;
    color: ${({ colorScheme, theme }) => {
      if (hasVariantColor(colorScheme, '500', theme)) return theme.colors[colorScheme]['500']
      return theme.colors.blue['500']
    }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ colorScheme, theme }) => {
        if (hasVariantColor(colorScheme, '50', theme)) return theme.colors[colorScheme]['50']
        return theme.colors.blue['50']
      }};
  }
`

const Label = styled(Typography)`
  text-decoration-line: ${({ textDecorationLine }) => (textDecorationLine ? textDecorationLine : 'none')};
  border-radius: 4px;
  ${layout}
  &:hover {
    text-decoration-line: underline;
    color: ${({ colorScheme, theme }) => {
      if (hasVariantColor(colorScheme, '500', theme)) return theme.colors[colorScheme]['500']
      return theme.colors.blue['500']
    }};
  }
  &:focus {
    outline: none;

    box-shadow: 0 0 0 2px
      ${({ colorScheme, theme }) => {
        if (hasVariantColor(colorScheme, '50', theme)) return theme.colors[colorScheme]['50']
        return theme.colors.blue['50']
      }};
  }
`

Link.defaultProps = {
  component: '',
  propPath: 'href',
  target: '_self',
  to: '#',
  as: 'p',
  colorScheme: 'blue'
}

Link.propTypes = {
  component: PropTypes.oneOf(['', 'Link']),
  propPath: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  to: PropTypes.string,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label', 'a']),
  colorScheme: PropTypes.string
}

export default Link
