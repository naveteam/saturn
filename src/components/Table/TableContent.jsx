import React from 'react'

import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

const Content = styled.tbody`
  border-top: 2px solid ${th.color('gray.300')};
  &:first-child {
    border-top: none;
  }
`

const TableContent = ({overflowRef, ...props}) => {

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, { overflowRef });
  })

  return (
    <Content {...props}>
      {children}
    </Content>
  )
}

export default TableContent
