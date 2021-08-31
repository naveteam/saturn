import { background, typography, layout, space, compose, color } from 'styled-system'
import styled from 'styled-components'

const composeSystem = compose(background, typography, layout, space, color)

const TableData = styled.td`
  word-break: normal;
  font-size: 0.875rem;
  line-height: 1.43;
  padding: 12px;
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  font-family: 'Open Sans', sans-serif;
  ${composeSystem}
`

export default TableData
