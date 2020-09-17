import React, { useEffect } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import { Typography, Button } from '../'
import { Icon } from '../Iconography'

import { ToastContainer, toast as alert } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AlertPreview = ({ type, position, title, text, closeIcon }) => {
  const body = (
    <div>
      <span>
        <Icon icon={`semantic_${type}`} color='white' height='20' />
        <Title>{title}</Title>
      </span>
      <Description>{text}</Description>
    </div>
  )

  const options = {
    position: position === 'top' ? 'top-center' : 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: closeIcon ? true : false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  }

  const notify = () => {
    switch (type) {
      case 'success':
        alert.success(body, options)
        break
      case 'warning':
        alert.warning(body, options)
        break
      case 'error':
        alert.error(body, options)
        break
      default:
        alert.info(body, options)
    }
  }

  return (
    <div>
      <Button width='350px' onClick={notify} style={{ margin: '5px' }}>
        Clique para ver o alerta: {type}
      </Button>
      <Container closeIcon={closeIcon} />
    </div>
  )
}

const closeVariant = variant({
  prop: 'closeIcon',
  variants: {
    true: css`
      display: flex;
    `,
    false: css`
      display: none;
    `
  }
})

const Container = styled(ToastContainer)`
  .Toastify__toast-container {
    width: 384px;
  }

  .Toastify__toast {
    border-radius: 2;
    padding: 4;
    width: 384px;
    div {
      margin-top: 0;
      span {
        display: flex;
        align-items: center;
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }

  .Toastify__toast--info {
    right: 4em;
    background: ${th.color('blue.400')};
  }
  .Toastify__toast--success {
    right: 4em;
    background: ${th.color('green.400')};
  }
  .Toastify__toast--error {
    right: 4em;
    background: ${th.color('red.400')};
  }
  .Toastify__toast--warning {
    right: 4em;
    background: ${th.color('amber.400')};
  }

  .Toastify__close-button {
    ${closeVariant}
  }
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

export default AlertPreview
