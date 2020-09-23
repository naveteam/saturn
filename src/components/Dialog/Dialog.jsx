import React, { useRef, useState, forwardRef } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'

import { Typography, Button } from '../'
import { Icon } from '../Iconography'

const Dialog = forwardRef(({ open, onClose, closeIcon, title, description, children }, ref) => {
  const dialogRef = useRef(null)
  if (!open) return null

  return (
    <>
      <Overlay />
      <Container open={open} ref={dialogRef}>
        <Content>
          <LeftContent>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </LeftContent>
          {closeIcon && (
            <RightContent>
              <Button onClick={onClose}>
                <Icon icon='name' color='black' />
              </Button>
            </RightContent>
          )}
        </Content>

        <ChildrenContent>{children}</ChildrenContent>

        <Buttons>
          <Button onClick={onClose}>Cancelar</Button>
          <Button>Adicionar</Button>
        </Buttons>
      </Container>
    </>
  )
})

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: black;
  opacity: 0.7;
  z-index: 1000;
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 656px;
  min-height: 136px;
  background: white;
  border-radius: 2;
  box-shadow: 0px 4px 10px rgba(33, 33, 33, 0.25);
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin: 32px 32px 0 32px;
`

const LeftContent = styled.div`
  width: 100%;
`
const RightContent = styled.div`
  right: 0;
`

const Title = styled(Typography)`
  font-weight: 1;
  font-size: 4;
  line-height: 4;
`
const Description = styled(Typography)`
  font-size: 3;
  line-height: 3;
  margin-top: 4;
`

const ChildrenContent = styled.div`
  display: flex;
  margin: 32px 32px 0 32px;

  div {
    width: 100%;
  }

  div + div {
    margin-left: 32px;
  }
`

const Buttons = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 32px;

  button + button {
    margin-left: 32px;
  }
`

export default Dialog
// ${th.color('green.400')}
