import React from 'react'
import styled, { css } from '@xstyled/styled-components'

const Avatar = ({ avatar, letter, size, variant, status, ...props }) => {
  let sizeInPx = '48px'
  let color = 'pink.400'

  switch (size) {
    case 'tiny':
      sizeInPx = '24px'
      color = 'blue.400'
      break
    case 'very-small':
      sizeInPx = '32px'
      color = 'deepPurple.400'
      break
    case 'small':
      sizeInPx = '40px'
      color = 'purple.400'
      break
    case 'large':
      sizeInPx = '56px'
      color = 'red.400'
      break
    case 'very-large':
      sizeInPx = '64px'
      color = 'orange.400'
      break
    case 'huge':
      sizeInPx = '72px'
      color = 'gray.700'
      break
  }

  return <AvatarContainer avatar={avatar} color={color} size={sizeInPx} variant={variant} status={status} />
}

const AvatarContainer = styled.div(
  ({ size, color, variant }) => css`
    border-radius: ${variant ? '4px' : '50%'};
    width: ${size};
    height: ${size};
    background-color: ${color};
  `
)

export default Avatar
