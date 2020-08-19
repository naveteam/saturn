import React from 'react'
import styled from '@xstyled/styled-components'
import { variant, space, typography } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './../Typography/Typography'

const Link = ({ component, propPath, children, to, as, target, color, ...props }) => {
  const DefaultComponent = ({ children, to, as, propPath, color, ...props }) => {
    console.log(to)
    return (
      <a href={to} target={target} variant={variant} {...props}>
        {children}
      </a>
    )
  }

  const Base = component ? component : DefaultComponent
  const mountPath = { [propPath]: to }

  return (
    <Base {...mountPath} passHref {...props} to={to} target={target}>
      {component ? (
        <a target={target}>
          <Label color={color} as={as}>
            {children}
          </Label>
        </a>
      ) : (
        <Label color={color} as={as}>
          {children}
        </Label>
      )}
    </Base>
  )
}

const Label = styled(Typography)`
  font-family: 'Open Sans', sans-serif;
  color: #424242;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  ${space}
  ${typography}
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
  propPath: 'O atributo específica em qual atributo está a URL da página no qual deve ser redirecionado',
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  to: 'O atributo href específica o URL da página para onde será redirecionado.',
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label', 'a']),
  color:
    'O atributo recebe cores em hexadecimais: "#424242"; ou com a seguinte escrita: "[cor (em inglês)].[tonalidade]"'
}

export default Link
