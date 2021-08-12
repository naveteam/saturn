import React, { useRef, useCallback } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useClickOutside, useHotKey } from '@naveteam/prometheus'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Typography, Button, Flex } from '../'
import { Icon } from '../Iconography'

const Dialog = ({
  open,
  onClose,
  portalRef = document.body,
  width,
  withoutOverlay,
  withCloseIcon,
  title,
  description,
  cancelButton,
  actionButton,
  colorButton,
  children
}) => {
  const dialogRef = useRef(null)

  const closeModal = useCallback(() => {
    onClose && onClose(false)
  }, [onClose])

  useClickOutside(() => closeModal(), dialogRef)

  useHotKey(() => closeModal(), 'Escape')

  return (
    open &&
    ReactDOM.createPortal(
      <>
        {!withoutOverlay && <Overlay />}
        <Container ref={dialogRef} width={width}>
          <Content>
            <LeftContent>
              <Typography color='gray.800' fontWeight={1} fontSize={4} lineHeight={4}>
                {title}
              </Typography>
              <Typography color='gray.800' fontSize={3} mt={4}>
                {description}
              </Typography>
            </LeftContent>
            {withCloseIcon && (
              <RightContent>
                <Button color='white' onClick={closeModal}>
                  <Icon color='gray.800' icon='name' />
                </Button>
              </RightContent>
            )}
          </Content>
          {children && <ChildrenContent>{children}</ChildrenContent>}
          {!withCloseIcon && (
            <Buttons>
              <Button
                onClick={cancelButton?.OnClick ? () => cancelButton.onClick : closeModal}
                color={colorButton}
                variant='outlined'
                caption={cancelButton?.label ? cancelButton.label : 'Cancelar'}
              />
              <Button
                caption={actionButton?.label ? actionButton.label : 'Adicionar'}
                color={colorButton}
                onClick={() => actionButton?.onClick}
              />
            </Buttons>
          )}
        </Container>
      </>,
      portalRef
    )
  )
}

const overflowSmooth = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 0.7;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: black;
  z-index: 1000;
  animation: ${overflowSmooth} 0.2s ease forwards;
`
const Container = styled(Flex)(
  ({ width }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    flex-direction: column;
    width: ${width};
    min-height: 124px;
    background: white;
    border-radius: 2;
    box-shadow: 0px 4px 10px rgba(33, 33, 33, 0.25);
  `
)

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px 24px 0 24px;
`
const LeftContent = styled.div`
  width: 100%;
`
const RightContent = styled.div`
  right: 0;
  margin: -8px -8px 0 0;
`
const ChildrenContent = styled.div`
  display: flex;
  margin: 32px 24px 0 24px;
  div {
    width: 100%;
  }
`
const Buttons = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 32px 24px 24px 24px;
  button {
    width: 176px;
  }
  button + button {
    margin-left: 24px;
  }
`
Dialog.defaultProps = {
  open: false,
  width: '656px',
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
  actionButton: PropTypes.object,
  colorButton: PropTypes.string,
  portalRef: PropTypes.object
}
export default Dialog
