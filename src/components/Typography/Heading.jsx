import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant, breakpoints } from '@xstyled/system'
import PropTypes from 'prop-types'

import Typography from './Typography'

const Heading = props => <Base forwardedAs={props.variant} {...props} />

const tagVariant = variant({
  default: 'h1',
  key: 'heading',
  prop: 'variant',
  variants: {
    h1: breakpoints({
      xs: css`
        font-size: 7;
        line-height: 7;
      `,
      md: css`
        font-size: 8;
        line-height: 8;
      `
    }),
    h2: css`
      font-size: 6;
      line-height: 6;
    `,
    h3: css`
      font-size: 5;
      line-height: 5;
    `,
    h4: css`
      font-size: 4;
      line-height: 4;
    `
  }
})

const Base = styled(Typography)`
  ${tagVariant}
`

Heading.defaultProps = {
  variant: 'h1',
  fontWeight: 1
}

Heading.propTypes = {
  ...Typography.propTypes,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4'])
}

export default Heading
