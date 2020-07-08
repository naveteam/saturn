import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography } from './'

const Paragraph = ({ as, ...props }) => <Base forwardedAs={props.as} {...props} />

const sizeVariant = variant({
  default: 'md',
  key: 'paragraph',
  prop: 'variant',
  variants: {
    md: css`
      font-size: 3;
      line-height: 3;
    `,
    sm: css`
      font-size: 2;
      line-height: 1;
    `
  }
})

const Base = styled(Typography)`
  ${sizeVariant}
`

Paragraph.defaultProps = {
  variant: 'md',
  as: 'p',
  fontWeight: 0
}

Paragraph.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Paragraph
