import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import PropTypes from 'prop-types'

const Table = ({ type, children, ...props }) => (
  <Container type={type} {...props}>
    {children}
  </Container>
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

const Container = styled.table`
  ${typeVariant}
  border-radius: 4;
  background: ${th.color('white')};

  min-width: 328px;
  max-width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  td:first-of-type,
  th:first-of-type {
    display: flex;
    label {
      margin-right: 12px;
    }
    span {
      margin-right: 8px;
    }
  }

  td {
    align-items: center;
    p {
      color: ${th.color('gray.800')};
    }
  }
`

Table.defaultProps = {
  type: 'regular'
}

Table.propTypes = {
  type: PropTypes.oneOf(['regular', 'quiet'])
}

export default Table
