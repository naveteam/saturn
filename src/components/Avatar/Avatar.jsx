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
  let statusContainer = '12.2px'
  let statusIcon = 'avatar'

  switch (status) {
    case 'checked':
      statusIcon = 'check_circle'
      break
  }

  switch (size) {
    case 'tiny':
      sizeInPx = '24px'
      color = 'blue.400'
      fontSize = 0
      statusContainer = '8px'
      statusSize = '6.8px'
      statusBorder = '1.2px'
      break
    case 'very-small':
      sizeInPx = '32px'
      color = 'deepPurple.400'
      fontSize = 3
      statusContainer = '10px'
      statusSize = '8.6px'
      statusBorder = '1.4px'
      break
    case 'small':
      sizeInPx = '40px'
      color = 'purple.400'
      fontSize = 4
      statusContainer = '12px'
      statusSize = '10.4px'
      statusBorder = '1.6px'
      break
    case 'large':
      sizeInPx = '56px'
      color = 'red.400'
      fontSize = '28px'
      statusContainer = '16px'
      statusSize = '14px'
      statusBorder = '2px'
      break
    case 'very-large':
      sizeInPx = '64px'
      color = 'orange.400'
      fontSize = 6
      statusContainer = '18px'
      statusSize = '15.8px'
      statusBorder = '2.2px'
      break
    case 'huge':
      sizeInPx = '72px'
      color = 'gray.700'
      fontSize = '36px'
      statusContainer = '20px'
      statusSize = '17.6px'
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
      {status && !variant && (
        <Status statusContainer={statusContainer} statusBorder={statusBorder}>
          <Icon icon={statusIcon} height={statusSize} width={statusSize} color={statusColor} />
        </Status>
      )}
    </AvatarContainer>
  ) : (
    <NonAvatarContainer letter={letter} size={sizeInPx} variant={variant} status={status} color={color} {...props}>
      {letter ? (
        <Typography color='white' lineHeight={6} fontSize={fontSize}>
          {letter}
        </Typography>
      ) : (
        <Icon
          icon={variant ? 'avatar_business_center' : 'avatar_person'}
          height={sizeInPx}
          width={sizeInPx}
          color={color}
        />
      )}
      {status && !variant && (
        <Status statusContainer={statusContainer} statusBorder={statusBorder}>
          <Icon icon={statusIcon} height={statusSize} width={statusSize} color={statusColor} />
        </Status>
      )}
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

const Status = styled(Flex)(
  ({ statusContainer, statusBorder }) => css`
    justify-content: center;
    align-items: center;
    width: ${statusContainer};
    height: ${statusContainer};
    border-radius: 50%;
    border: ${statusBorder} solid white;
    box-sizing: border-box;
    background-color: white;
    position: absolute;
    bottom: 0;
    right: 0;
  `
)

export default Avatar
