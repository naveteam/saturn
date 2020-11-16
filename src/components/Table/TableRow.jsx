import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

const TableRow = styled.tr`
  padding: 16px;
  min-height: 48px;
  max-height: 48px;
  border-bottom: 1px solid ${th.color('gray.300')};
  align-items: center;
  justify-content: center;
  color: ${th.color('gray.800')};
`

export default TableRow
