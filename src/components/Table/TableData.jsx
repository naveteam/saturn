import React from 'react'
import styled from '@xstyled/styled-components'

import { Typography } from '../'

const TableData = ({ children }) => (
  <Container>
    <DataText>{children}</DataText>
  </Container>
)

const Container = styled.td`
  padding: 12px 16px;
  height: 48px;
`

const DataText = styled(Typography)`
  display: flex;
  flex-direction: row;
  line-height: 3;
`

export default TableData
