<<<<<<< HEAD
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
=======
import React, { useState } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import { Typography } from '../'

const Dialog = ({ open, onClose, closeIcon, title, description, children }) => {
  if (!open) return null

  return (
    <>
      <Overlay />
      <Container>
        <Content>
          <LeftContent>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </LeftContent>
          {closeIcon && (
            <RightContent>
              <button onClick={onClose}>teste</button>
>>>>>>> feat(dialog): component and style
            </RightContent>
          )}
        </Content>

<<<<<<< HEAD
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
=======
        <ChildrenContent>{children}</ChildrenContent>

        <Buttons>
          <button onClick={onClose}>Cancelar</button>
          <button>Adicionar</button>
        </Buttons>
>>>>>>> feat(dialog): component and style
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

<<<<<<< HEAD
const Container = styled(Flex)`
=======
const Container = styled.div`
>>>>>>> feat(dialog): component and style
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
<<<<<<< HEAD
=======
  background: red;
>>>>>>> feat(dialog): component and style
`
const RightContent = styled.div`
  right: 0;
`

<<<<<<< HEAD
=======
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

>>>>>>> feat(dialog): component and style
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
<<<<<<< HEAD

  button {
    width: 176px;
  }
=======
  background: green;
>>>>>>> feat(dialog): component and style

  button + button {
    margin-left: 32px;
  }
`

<<<<<<< HEAD
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
=======
export default Dialog
// ${th.color('green.400')}
>>>>>>> feat(dialog): component and style
