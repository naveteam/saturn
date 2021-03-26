import React from 'react'
import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'
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

const Container = styled.table`
  ${({ hideExternalBorder }) => {
    if (hideExternalBorder) {
      return 'border: 0;'
    }
    return 'box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);'
  }}
  border-radius: 4;
  background: ${th.color('white')};

  min-width: 328px;
  max-width: 100%;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;
`

Table.propTypes = {
  hideExternalBorder: PropTypes.bool
}

export default Table
