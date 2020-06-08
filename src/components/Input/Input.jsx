import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { space, layout, flexbox } from 'styled-system'
import PropTypes from 'prop-types'

import { Typography } from '../'

const Input = forwardRef(({ name, label, message, placeholder, value, onChange }, ref) => {
  return (
    <Container display='flex' flexDirection='column' alignItems='stretch' justifyContent='center'>
      <Label htmlFor={name} mb='3'>
        {label}
      </Label>
      <InputBase ref={ref} name={name} placeholder={placeholder} value={value} onChange={onChange} p='3' />
      <Info mt='2'>{message}</Info>
    </Container>
  )
})

const Container = styled.div`
  ${layout}
  ${flexbox}
`

const Label = styled(Typography)`
  ${space}
`

const InputBase = styled.input`
  ${space}
`

const Info = styled(Typography)`
  ${space}
`

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

export default Input
