import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import PropTypes from 'prop-types'

const Table = ({ type, children, ...props }) => (
  <OverflowWrapper>
    <Container type={type} {...props}>
      {children}
    </Container>
  </OverflowWrapper>
)

const typeVariant = variant({
  prop: 'type',
  default: 'regular',
  variants: {
    regular: css`
      box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
    `,
    quiet: css`
      border: 0;
    `
  }
})

const OverflowWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`

const Container = styled.table`
  ${typeVariant}
  border-radius: 4;
  background: ${th.color('white')};

  min-width: 328px;
  max-width: 100%;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;
`

Table.defaultProps = {
  type: 'regular'
}

Table.propTypes = {
  type: PropTypes.oneOf(['regular', 'quiet'])
}

export default Table
