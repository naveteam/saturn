import React from 'react'
import styled from '@xstyled/styled-components'
import { layout, variant, space, typography, color } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './../Typography/Typography'

const DefaultComponent = ({ children, to, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
)

const Link = ({ component, propPath, children, to, as, target, color, passHref, ...props }) => {
  const Base = component ? component : DefaultComponent
  const mountPath = { [propPath]: to }

  return (
    <BaseStyled display='flex' {...props}>
      <Label alignItems='center' color={color} forwardedAs={as}>
        <Base {...mountPath} {...passHref} target={target}>
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

const Label = styled(Typography)`
  text-decoration-line: underline;
  ${typography}
  ${variant}
  ${space}
  ${color}
  ${layout}
`

Link.defaultProps = {
  component: '',
  propPath: 'href',
  target: '_self',
  to: '#',
  as: 'p',
  color: 'gray.800'
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
