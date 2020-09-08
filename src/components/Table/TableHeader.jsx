import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../'

const TableHeader = ({ children }) => (
  <Container>
    <HeaderText>{children}</HeaderText>
  </Container>
)

const Container = styled.th`
  padding: 12px 16px;
`

const HeaderText = styled(Typography)`
  font-weight: 1;
  font-size: 3;
  line-height: 3;
`

export default TableHeader
