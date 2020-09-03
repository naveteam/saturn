import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import TableHeader from './TableHeader'
import TableRow from './TableRow'
import TableBody from './TableBody'
import TableData from './TableData'

import { Typography } from '../'

const Table = () => (
  <Container>
    <TableHeader>Title</TableHeader>
    <TableHeader>Title</TableHeader>
    <TableHeader>Title</TableHeader>
    {}
    <TableBody>
      <TableRow>
        <TableData>Content</TableData>
        <TableData>Content</TableData>
        <TableData>Content</TableData>
      </TableRow>

      <TableRow>
        <TableData>Content</TableData>
        <TableData>Content</TableData>
        <TableData>Content</TableData>
      </TableRow>
    </TableBody>
  </Container>
)

const Container = styled.table`
  border-radius: 4px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);

  min-width: 328px;
  max-width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  tr:hover {
    background: #f5f5f5;
  }

  tr:last-child {
    border: none;
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
