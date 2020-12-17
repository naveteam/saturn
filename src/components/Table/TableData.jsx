import { backgrounds, system } from '@xstyled/system'
import styled from '@xstyled/styled-components'

const TableData = styled.td`
  word-break: normal;
  font-size: 0.875rem;
  line-height: 1.43;
  padding: 12px;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  font-family: 'Open Sans', sans-serif;
  ${backgrounds}
  ${system}
`

export default TableData
