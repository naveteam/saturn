import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../'

const TableHeader = ({ children }) => (
  <Container>
    <TableTitle>{children}</TableTitle>
  </Container>
)

const Container = styled.th`
  padding: 12px 16px;
`

const TableTitle = styled(Typography)`
  font-weight: 1;
  font-size: 16px;
  line-height: 24px;
`

export default TableHeader
