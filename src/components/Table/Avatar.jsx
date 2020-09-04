import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../'

const Avatar = ({ children }) => (
  <Container>
    <DataText>{children}</DataText>
  </Container>
)

const Container = styled.span`
  display: flex;
  align-items: center;
  background: #1565c0;
  width: 24px;
  height: 24px;
  border-radius: 50;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const DataText = styled(Typography)`
  font-weight: normal;
  font-size: 10px;
  color: #fff;
  padding: 4px;
`

export default Avatar
