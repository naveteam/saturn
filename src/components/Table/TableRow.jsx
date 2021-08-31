import styled, { css } from 'styled-components'

const TableRow = styled.tr(
  ({ theme: { colors } }) => css`
    padding: 16px;
    min-height: 48px;
    max-height: 48px;
    border-bottom: 1px solid ${colors.gray['300']};
    align-items: center;
    justify-content: center;
    color: ${colors.gray['800']};
  `
)

export default TableRow
