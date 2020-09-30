import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Icon, Typography } from '../'
import Flex from '../Grid'

const Avatar = ({ avatar, letter, size, status, variant, ...props }) => {
  let sizeInPx = '48px'
  let color = 'pink.400'
  let fontSize = 5
  let statusBorder = '1.8px'
  let statusColor = 'green.400'
  let statusSize = '14px'
  let statusIcon = 'circle'

  switch (status) {
    case 'away':
      statusColor = 'gray.400'
      break
    case 'approved':
      statusIcon = 'check_circle'
      break
    case 'busy':
      statusIcon = 'busy_circle'
      statusColor = 'red.400'
      break
    case 'denied':
      statusIcon = 'clear_circle'
      statusColor = 'red.400'
      break
  }

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

  const showStatus = (status, variant) => {
    if (status && !variant) {
      return (
        <Status statusSize={statusSize} statusBorder={statusBorder}>
          <Icon icon={statusIcon} height={statusSize} width={statusSize} color={statusColor} />
        </Status>
      )
    }
  }

  return avatar ? (
    <AvatarContainer size={sizeInPx} statusSize={statusSize} statusBorder={statusBorder} {...props}>
      <AvatarImage avatar={avatar} size={sizeInPx} variant={variant} />
      {showStatus(status, variant)}
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
      {showStatus(status, variant)}
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

const AvatarImage = styled.div(
  ({ avatar, size, variant }) => css`
    cursor: pointer;
    width: ${size};
    height: ${size};
    border-radius: ${variant ? 2 : '50%'};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${avatar});
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
  ({ statusSize, statusBorder }) => css`
    justify-content: center;
    align-items: center;
    width: ${statusSize};
    height: ${statusSize};
    border-radius: 50%;
    border: ${statusBorder} solid white;
    box-sizing: border-box;
    background-color: white;
    position: absolute;
    bottom: 0;
    right: 0;
  `
)

Avatar.defaultProps = {
  size: 'medium',
  variant: false
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  letter: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'very-small', 'small', 'medium', 'large', 'very-large', 'huge']),
  status: PropTypes.oneOf(['available', 'away', 'approved', 'busy', 'denied']),
  variant: PropTypes.bool
}

export default Avatar
