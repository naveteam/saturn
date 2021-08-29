import styled, { css } from 'styled-components'

const TableContent = styled.tbody(
  ({ theme: { colors } }) => css`
    border-top: 2px solid ${colors.gray['300']};
    position: relative;
    &:first-child {
      border-top: none;
    }
  `
)

export default TableContent
