import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant, compose, color, layout, space, border } from '@xstyled/system'
import { Typography } from '../'
import { Icon } from '../Iconography'

const AlertContainer = ({ type, position, title, text, closeIcon }) => (
  <Base type={type} position={position}>
    <Header>
      <LeftHeader>
        <Icon icon={type} color='white' height='20' />
        <Title>{title}</Title>
      </LeftHeader>

      {closeIcon && (
        <CloseButton onClick={() => {}}>
          <Icon icon='close' color='white' height='24' />
        </CloseButton>
      )}
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

const positionVariant = variant({
  prop: 'position',
  variants: {
    right: css`
      animation: appearFromRight 0.7s;
    `,
    top: css`
      animation: appearFromTop 0.7s;
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
  ${positionVariant}

  @keyframes appearFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes appearFromTop {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
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

const CloseButton = styled.button`
  background: none;
  border: 0;
`

const Description = styled(Typography)`
  margin-top: 3;
  font-size: 3;
  line-height: 3;
  color: white;
`

export default AlertContainer
