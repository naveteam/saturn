import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant, compose, color, layout, space, border } from '@xstyled/system'
import { Typography } from '../'
import { Icon } from '../Iconography'

const Alert = ({ type, title, text, closeIcon }) => (
  <Base type={type}>
    <Header>
      <LeftHeader>
        <Icon icon={type} color='white' height='20' />
        <Title>{title}</Title>
      </LeftHeader>

      {closeIcon && <Icon icon='close' color='white' height='24' />}
    </Header>

    {text && <Description>{text}</Description>}
  </Base>
)

const typeVariant = variant({
  prop: 'type',
  default: 'info',
  variants: {
    info: css`
      background: ${th.color('blue.400')};
    `,
    success: css`
      background: ${th.color('green.400')};
    `,
    error: css`
      background: ${th.color('red.400')};
    `,
    warning: css`
      background: ${th.color('amber.400')};
    `
  }
})

const Base = styled.div`
  ${typeVariant}
  display: flex;
  width: 384px;
  flex-direction: column;
  border-radius: 2;
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
