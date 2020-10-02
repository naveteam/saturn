import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

const TableRow = styled.tr`
  padding: 16px;
  max-height: 48px;
  border-bottom: 1px solid ${th.color('gray.300')};
  align-items: center;
  justify-content: center;
`

export default TableRow
