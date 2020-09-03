import React from 'react'
import styled from '@xstyled/styled-components'

const TableBody = ({ children }) => <Container>{children}</Container>

const Container = styled.tbody`
  border-top: 2px solid #9e9e9e;
`

export default TableBody
