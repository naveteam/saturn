import React, { useEffect, useState } from 'react'
import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

const TableRow = props => {
  const {actions, children, overflowRef} = props
  const [leftOffset, setLeftOffset] = useState(0)

  useEffect(() => {
    if (!overflowRef.current) return
    setLeftOffset(overflowRef.current.offsetWidth)
  }, [overflowRef.current])

  return (
    <Row>
      {children}
      {actions && (
        <FloatActions left={leftOffset}>
          {actions()}
        </FloatActions>
      )}
    </Row>
  )
}

const FloatActions = styled.div(props => `
  position: fixed;
  left: ${props.left}px;
  top: 0;
  bottom: 0;
  background-color: ${th.color('gray.200')};
  display: flex;
  justify-content: center;
  align-items: center;
`)

const Row = styled.tr`
  padding: 16px;
  min-height: 48px;
  max-height: 48px;
  border-bottom: 1px solid ${th.color('gray.300')};
  align-items: center;
  justify-content: center;
  transform: scale(1); // hack for position relative on tr's
`

export default TableRow
