import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

const TableContent = styled.tbody`
  border-top: 2px solid ${th.color('gray.300')};
  &:first-child {
    border-top: none;
  }
`

export default TableContent
