import React, { Fragment } from 'react'
import styled, { css } from '@xstyled/styled-components'

import { Icon, Typography } from '../'
import Flex from '../Grid'

const Avatar = ({ avatar, letter, size, variant, status, ...props }) => {
  let sizeInPx = '48px'
  let color = 'pink.400'
  let fontSize = 5
  let statusSize = '14px'
  let statusBorder = '1.8px'
  let statusColor = 'green.400'

  if (status === 'unavailable') statusColor = 'gray.400'

  switch (size) {
    case 'tiny':
      sizeInPx = '24px'
      color = 'blue.400'
      fontSize = 0
      statusSize = '8px'
      statusBorder = '1.2px'
      break
    case 'very-small':
      sizeInPx = '32px'
      color = 'deepPurple.400'
      fontSize = 3
      statusSize = '10px'
      statusBorder = '1.4px'
      break
    case 'small':
      sizeInPx = '40px'
      color = 'purple.400'
      fontSize = 4
      statusSize = '12px'
      statusBorder = '1.6px'
      break
    case 'large':
      sizeInPx = '56px'
      color = 'red.400'
      fontSize = '28px'
      statusSize = '16px'
      statusBorder = '2px'
      break
    case 'very-large':
      sizeInPx = '64px'
      color = 'orange.400'
      fontSize = 6
      statusSize = '18px'
      statusBorder = '2.2px'
      break
    case 'huge':
      sizeInPx = '72px'
      color = 'gray.700'
      fontSize = '36px'
      statusSize = '20px'
      statusBorder = '2.4px'
      break
  }

  return avatar ? (
    <AvatarContainer size={sizeInPx} statusSize={statusSize} statusBorder={statusBorder}>
      <AvatarImage
        src={avatar}
        size={sizeInPx}
        variant={variant}
        status={status}
        statusSize={statusSize}
        statusBorder={statusBorder}
      />
      {status && <Status statusSize={statusSize} statusBorder={statusBorder} statusColor={statusColor} />}
    </AvatarContainer>
  ) : (
    <NonAvatarContainer letter={letter} size={sizeInPx} variant={variant} status={status} color={color} {...props}>
      {letter ? (
        <Typography color='white' lineHeight={6} fontSize={fontSize}>
          {letter}
        </Typography>
      ) : (
        <Icon icon={variant ? 'business_center' : 'avatar_person'} height={72} width={72} color={color} />
      )}
      {status && !variant && <Status statusSize={statusSize} statusBorder={statusBorder} statusColor={statusColor} />}
    </NonAvatarContainer>
  )
}

const AvatarContainer = styled.div(
  ({ size }) => css`
    width: ${size};
    height: ${size};
    position: relative;
  `
)

const AvatarImage = styled.img(
  ({ size, variant }) => css`
    cursor: pointer;
    width: ${size};
    height: ${size};
    border-radius: ${variant ? 2 : '50%'};
  `
)

const NonAvatarContainer = styled(Flex)(
  ({ color, size, variant, letter }) => css`
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: ${size};
    height: ${size};
    background-color: ${letter ? color : 'white'};
    border-radius: ${variant ? 2 : '50%'};
    position: relative;
  `
)

const Status = styled.div(
  ({ statusColor, statusSize, statusBorder }) => css`
    width: ${statusSize};
    height: ${statusSize};
    border-radius: 50%;
    border: ${statusBorder} solid white;
    box-sizing: border-box;
    background-color: ${statusColor};
    position: absolute;
    bottom: 0;
    right: 0;
  `
)

export default Avatar
