import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'

const Table = ({ type, children }) => <Container type={type}>{children}</Container>

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
  border-radius: 4px;
  background: ${({ theme }) => theme.white};

  min-width: 328px;
  max-width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  td:first-of-type,
  th:first-of-type {
    p label {
      margin-right: 11px;
    }
    p span {
      margin-right: 8px;
    }
  }

  tr:hover {
    background: #f5f5f5;
  }

  td:last-child {
    p {
      text-align: center;
      border-radius: 2;
      padding: 4px;
      background: #1565c0;
      color: #fff;
    }
  }
`

export default Table
