import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Icon } from '../Iconography'
import { Flex } from '../Grid'
import { Typography } from '../Typography'

const Avatar = ({ avatar, letter, size, status, variant, children, ...props }) => {
  const sizeProps = useMemo(() => {
    switch (size) {
      case 'tiny':
        return {
          sizeInPx: '24px',
          color: 'blue.400',
          fontSize: 0,
          statusSize: '8px',
          statusBorder: '1px'
        }
      case 'very-small':
        return {
          sizeInPx: '32px',
          color: 'deepPurple.400',
          fontSize: 3,
          statusSize: '10px',
          statusBorder: '1.2px'
        }
      case 'small':
        return {
          sizeInPx: '40px',
          color: 'purple.400',
          fontSize: 4,
          statusSize: '12px',
          statusBorder: '1.4px'
        }
      case 'medium':
        return {
          sizeInPx: '48px',
          color: 'pink.400',
          fontSize: 5,
          statusSize: '14px',
          statusBorder: '1.6px'
        }
      case 'large':
        return {
          sizeInPx: '56px',
          color: 'red.400',
          fontSize: '28px',
          statusSize: '16px',
          statusBorder: '1.8px'
        }
      case 'very-large':
        return {
          sizeInPx: '64px',
          color: 'orange.400',
          fontSize: 6,
          statusSize: '18px',
          statusBorder: '2px'
        }
      case 'huge':
        return {
          sizeInPx: '72px',
          color: 'gray.700',
          fontSize: '36px',
          statusSize: '20px',
          statusBorder: '2.2px'
        }
    }
  }, [size])

  const statusProps = useMemo(() => {
    switch (status) {
      case 'available':
        return {
          statusColor: 'green.400',
          statusIcon: 'circle',
          statusStroke: '1.2px'
        }
      case 'away':
        return {
          statusColor: 'gray.400',
          statusIcon: 'circle',
          statusStroke: '1.2px'
        }
      case 'approved':
        return {
          statusColor: 'green.400',
          statusIcon: 'check_circle',
          statusStroke: '1.2px'
        }
      case 'busy':
        return {
          statusIcon: 'busy_circle',
          statusColor: 'red.400',
          statusStroke: '1.2px'
        }
      case 'denied':
        return {
          statusIcon: 'clear_circle',
          statusColor: 'red.400',
          statusStroke: '1.2px'
        }
    }
  }, [status])

  const showStatus = (status, variant) => {
    if (status && !variant) {
      return (
        <Status
          statusBorder={sizeProps.statusBorder}
          justifyContent='center'
          alignItems='center'
          width={sizeProps.statusSize}
          height={sizeProps.statusSize}
          bg='white'
        >
          <StatusIcon
            icon={statusProps.statusIcon}
            statusStroke={statusProps.statusStroke}
            height={sizeProps.statusSize}
            width={sizeProps.statusSize}
            color={statusProps.statusColor}
          />
        </Status>
      )
    }
  }

  return avatar ? (
    <AvatarContainer
      size={sizeProps.sizeInPx}
      statusSize={sizeProps.statusSize}
      statusBorder={sizeProps.statusBorder}
      {...props}
    >
      <AvatarImage avatar={avatar} size={sizeProps.sizeInPx} variant={variant} />
      {showStatus(status, variant)}
    </AvatarContainer>
  ) : (
    <NonAvatarContainer
      status={status}
      variant={variant}
      width={sizeProps.sizeInPx}
      height={sizeProps.sizeInPx}
      justifyContent='center'
      alignItems='center'
      bg={children || letter ? sizeProps.color : 'white'}
      {...props}
    >
      {children || letter ? (
        <Typography color='orange' lineHeight={6} fontSize={sizeProps.fontSize}>
          {children || letter}
        </Typography>
      ) : (
        <Icon
          icon={variant ? 'avatar_business_center' : 'avatar_person'}
          height={sizeProps.sizeInPx}
          width={sizeProps.sizeInPx}
          color={sizeProps.color}
        />
      )}
      {showStatus(status, variant)}
    </NonAvatarContainer>
  )
}

const AvatarContainer = styled.div(
  ({ size }) => css`
    overflow: hidden;
    width: ${size};
    height: ${size};
    position: relative;
  `
)

const AvatarImage = styled.div(
  ({ theme: {space}, avatar, size, variant }) => css`
    cursor: pointer;
    width: ${size};
    height: ${size};
    border-radius: ${variant ?  `${space[4]}px` : '50%'};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${avatar});
  `
)

const NonAvatarContainer = styled(Flex)(
  ({ theme: {space}, variant }) => css`
    overflow: hidden;
    cursor: pointer;
    border-radius: ${variant ?  `${space[4]}px` : '50%'};
    position: relative;
  `
)

const Status = styled(Flex)(
  ({ statusBorder }) => css`
    border-radius: 50%;
    border: ${statusBorder} solid white;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    right: 0;
  `
)

const StatusIcon = styled(Icon)(
  ({ statusStroke }) => css`
    stroke-width: ${statusStroke};
    stroke: white;
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
  variant: PropTypes.bool,
  children: PropTypes.string
}

export default Avatar
