import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const Table = ({ hideExternalBorder, children, ...props }) => (
  <OverflowWrapper>
    <Container hideExternalBorder={hideExternalBorder} {...props}>
      {children}
    </Container>
  </OverflowWrapper>
)

const OverflowWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`

const Container = styled.table(
  ({ theme: { colors, space }, hideExternalBorder }) => css`
    ${hideExternalBorder
      ? css`
          border: 0;
        `
      : css`
          box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
        `}
    border-radius: ${space[2]}px;
    background-color: ${colors['white']};

    min-width: 328px;
    max-width: 100%;
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    text-align: left;
  `
)

Table.propTypes = {
  hideExternalBorder: PropTypes.bool
}

export default Table
