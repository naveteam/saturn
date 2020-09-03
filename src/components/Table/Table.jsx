import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Box, Typography } from '../'

const Table = () => (
  <Container>
    <TableHeader>
      <TableTitle>Title</TableTitle>
    </TableHeader>
    <TableHeader>
      <TableTitle>Title</TableTitle>
    </TableHeader>
    <TableHeader>
      <TableTitle>Title</TableTitle>
    </TableHeader>
    <TableHeader>
      <TableTitle>Title</TableTitle>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableData>
          <TableDataText>Column 1</TableDataText>
        </TableData>
        <TableData>
          <TableDataText>Column 2</TableDataText>
        </TableData>
        <TableData>
          <TableDataText>Column 3</TableDataText>
        </TableData>
        <TableData>
          <TableDataText>Column 4</TableDataText>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <TableDataText>Column 1</TableDataText>
        </TableData>
        <TableData>
          <TableDataText>Column 2</TableDataText>
        </TableData>
        <TableData>
          <TableDataText>Column 3</TableDataText>
        </TableData>
        <TableData>
          <TableDataText>Column 4</TableDataText>
        </TableData>
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
    P {
      border-radius: 4px;
      padding: 4px;
      background: #1565c0;
      color: #fff;
    }
  }
`

const TableHeader = styled.th`
  padding: 12px 16px;
`

const TableRow = styled.tr`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`

const TableBody = styled.tbody`
  border-top: 2px solid #9e9e9e;
`

const TableData = styled.td`
  padding: 12px 16px;
  height: 48px;
`

const TableTitle = styled(Typography)`
  font-weight: 1;
  font-size: 16px;
  line-height: 24px;
`

const TableDataText = styled(Typography)`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`

export default Table
