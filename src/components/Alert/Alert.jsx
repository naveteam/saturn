import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant, compose, color, layout, space, border } from '@xstyled/system'
import { Typography } from '../'
import { Icon } from '../Iconography'

const Alert = () => (
  <Base>
    <Header>
      <LeftHeader>
        <Icon icon='info' color='white' height='24'/>
        <Title>Title Alert</Title>
      </LeftHeader>

      <Icon icon='close' color='white' height='24'/>
    </Header>

    <Description>
      Text of the alert goes here
    </Description>
  </Base>
)


const Base = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2;
  background: #1565C0;
  padding: 4;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled(Typography)`
  font-weight: 1;
  font-size: 3;
  line-height: 3;
  color: white;
  margin-left: 3;
`
const Description = styled(Typography)`
  margin-top: 3;
  font-size: 3;
  line-height: 3;
  color: white;
`


export default Alert
