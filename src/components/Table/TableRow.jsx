import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

const TableRow = styled.tr`
  padding: 16px;
  min-height: 48px;
  max-height: 48px;
  border-bottom: 1px solid ${th.color('gray.300')};
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  border-bottom: 1px solid ${th.color('gray.300')};
`

export default TableRow
