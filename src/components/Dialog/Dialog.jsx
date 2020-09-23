import React, { useRef, useCallback } from 'react'
import styled from '@xstyled/styled-components'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'
import PropTypes from 'prop-types'

import { Typography, Button, Flex } from '../'
import { Icon } from '../Iconography'

const Dialog = ({
  open,
  onClose,
  withBackground,
  withCloseIcon,
  title,
  description,
  cancelButton,
  actionButton,
  children
}) => {
  const dialogRef = useRef(null)
  const setClose = useCallback(
    closed => {
      onClose && onClose(closed)
    },
    [onClose]
  )

  useClickOutside(() => setClose(false), dialogRef)
  useHotKey(() => setClose(false), 'Escape')

  if (!open) return null
  return (
    <>
      <Overlay />
      <Container ref={dialogRef}>
        <Content>
          <LeftContent>
            <Typography fontWeight={1} fontSize={4} lineHeight={4}>{title}</Typography>
            <Typography fontSize={3} lineHeight={3} mt={4}>{description}</Typography>
          </LeftContent>
          {withCloseIcon && (
            <RightContent>
              <Button color='white' onClick={() => setClose(false)}>
                <Icon icon='name' color='black' />
              </Button>
import styled, { css, variant } from '@xstyled/styled-components'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'
import PropTypes from 'prop-types'

import { Typography, Button } from '../'
import { Icon } from '../Iconography'

const Dialog = ({
  open,
  onClose,
  withBackground,
  withCloseIcon,
  title,
  description,
  cancelButton,
  actionButton,
  children,
  ...props
}) => {
  const dialogRef = useRef(null)
  const setClose = useCallback(
    closed => {
      onClose && onClose(closed)

      console.log(closed)
    },
    [onClose]
  )

  useClickOutside(() => setClose(false), dialogRef)
  useHotKey(() => setClose(false), 'Escape')

  if (!open) return null

  return (
    <>
      {!withBackground && <Overlay />}
      <Container ref={dialogRef}>
        <Content>
          <LeftContent>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </LeftContent>
          {withCloseIcon && (
            <RightContent>
              <button onClick={onClose}>teste</button>
              <Button onClick={onClose}>

              <Button color='white' onClick={() => setClose(false)}>

                <Icon icon='name' color='black' />
              </Button>

            </RightContent>
          )}
        </Content>

        {children && <ChildrenContent>{children}</ChildrenContent>}

        {!withCloseIcon && (
          <Buttons>
            <Button onClick={() => (cancelButton?.OnClick ? cancelButton.onClick : setClose(false))} variant='outlined'>
              {cancelButton?.label ? cancelButton.label : 'Cancelar'}
            </Button>

            <Button onClick={() => actionButton?.onClick}>
              {actionButton?.label ? actionButton.label : 'Adicionar'}
            </Button>
          </Buttons>
        )}
      </Container>
    </>
  )
}

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

const Container = styled(Flex)`
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

  button {
    width: 176px;
  }

  button + button {
    margin-left: 32px;
  }
`

Dialog.defaultProps = {
  open: false,
  withBackground: true,
  withCloseIcon: false,
  cancelButton: { label: 'Cancelar' },
  actionButton: { label: 'Adicionar' }
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.bool,
  withBackground: PropTypes.bool,
  withCloseIcon: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  cancelButton: PropTypes.object,
  actionButton: PropTypes.object
}

export default Dialog
