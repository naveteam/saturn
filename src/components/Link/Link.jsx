import React from 'react'
import styled from '@xstyled/styled-components'
import { layout, variant, space, typography, color } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './../Typography/Typography'

const Link = ({ component, propPath, children, to, as, target, color, ...props }) => {
  const DefaultComponent = ({ children, to, as, propPath, color, ...props }) => {
    return (
      <a href={to} target={target} variant={variant} {...props}>
        {children}
      </a>
    )
  }

  const Base = component ? component : DefaultComponent
  const mountPath = { [propPath]: to }

  return (
    <BaseStyled {...props} display='flex'>
      <Base {...mountPath} passHref to={to} target={target}>
        <Label fontFamily='Open Sans' m={0} p={0} alignItems='center' color={color} as={as}>
          {component ? (
            <a color={color} target={target}>
              {children}
            </a>
          ) : (
            <>{children}</>
          )}
        </Label>
      </Base>
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
  propPath: 'O atributo específica em qual atributo está a URL da página no qual deve ser redirecionado',
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  to: 'O atributo href específica o URL da página para onde será redirecionado.',
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span', 'label', 'a']),
  color:
    'O atributo recebe cores em hexadecimais: "#424242"; ou com a seguinte escrita: "[cor (em inglês)].[tonalidade]"'
}

export default Link
