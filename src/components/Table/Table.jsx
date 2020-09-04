import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'

import TableHeader from './TableHeader'
import TableRow from './TableRow'
import TableBody from './TableBody'
import TableData from './TableData'
import Avatar from './Avatar'

import Checkbox from '../Checkbox'

const Table = ({ type }) => (
  <Container type={type}>
    <TableHeader>Title</TableHeader>
    <TableHeader>Title</TableHeader>
    <TableHeader>Title</TableHeader>
    <TableBody>
      <TableRow>
        <TableData>
          <Checkbox />
          <Avatar>G</Avatar>
          Content
        </TableData>
        <TableData>Content</TableData>
        <TableData>Content</TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <Checkbox />
          <Avatar>G</Avatar>
          Content
        </TableData>
        <TableData>Content</TableData>
        <TableData>Content</TableData>
      </TableRow>
    </TableBody>
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
  border-radius: 4px;
  background: ${({ theme }) => theme.white};

  min-width: 328px;
  max-width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  td:first-of-type {
    background: red;
  }

  tr:hover {
    background: #f5f5f5;
  }

  td:last-child {
    p {
      text-align: center;
      border-radius: 4px;
      padding: 4px;
      background: #1565c0;
      color: #fff;
    }
  }
`

export default Table
