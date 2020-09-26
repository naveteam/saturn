import React from 'react'
import styled, { css } from '@xstyled/styled-components'

import { Typography } from '../'
import Flex from '../Grid'

const Avatar = ({ avatar, letter, size, variant, status, ...props }) => {
  let sizeInPx = '48px'
  let color = 'pink.400'
  let fontSize = '24px'

  switch (size) {
    case 'tiny':
      sizeInPx = '24px'
      color = 'blue.400'
      fontSize = '10px'
      break
    case 'very-small':
      sizeInPx = '32px'
      color = 'deepPurple.400'
      fontSize = '16px'
      break
    case 'small':
      sizeInPx = '40px'
      color = 'purple.400'
      fontSize = '20px'
      break
    case 'large':
      sizeInPx = '56px'
      color = 'red.400'
      fontSize = '28px'
      break
    case 'very-large':
      sizeInPx = '64px'
      color = 'orange.400'
      fontSize = '32px'
      break
    case 'huge':
      sizeInPx = '72px'
      color = 'gray.700'
      fontSize = '36px'
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
        <Typography color='white' lineHeight={6} fontSize={fontSize}>
          {letter}
        </Typography>
      )}
    </AvatarContainer>
  )
}

const AvatarContainer = styled(Flex)(
  ({ size, color, variant }) => css`
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: ${variant ? '4px' : '50%'};
    width: ${size};
    height: ${size};
    background-color: ${color};
  `
)

export default Avatar
