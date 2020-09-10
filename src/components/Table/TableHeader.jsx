import React from 'react'
import styled from '@xstyled/styled-components'

import { Typography } from '../'

const TableHeader = ({ children }) => (
  <Container>
    <Typography fontWeight={1} fontSize={3} lineHeight={3}>
      {children}
    </Typography>
  </Container>
)

const Container = styled.th`
  padding: 12px 16px;
`

export default TableHeader
