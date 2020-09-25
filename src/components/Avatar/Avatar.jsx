import React from 'react'
import styled, { css } from '@xstyled/styled-components'

import { Typography } from '../'
import Flex from '../Grid'

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

  return (
    <AvatarContainer
      avatar={avatar}
      letter={letter}
      size={sizeInPx}
      variant={variant}
      status={status}
      color={color}
      {...props}
    >
      {!avatar && letter && (
        <Typography color='white' lineHeight={6}>
          {letter}
        </Typography>
      )}
    </AvatarContainer>
  )
}

const AvatarContainer = styled(Flex)(
  ({ size, color, variant }) => css`
    justify-content: center;
    align-items: center;
    border-radius: ${variant ? '4px' : '50%'};
    width: ${size};
    height: ${size};
    background-color: ${color};
  `
)

export default Avatar
