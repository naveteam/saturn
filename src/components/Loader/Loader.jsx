import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../'

export const Loader = ({ time, percentage, showPercentage, size, variant }) => {
  return (
    <LoaderContainer time={time} variant='icon'>
      <svg>
        <circle cx='60' cy='60' r='43' />
        <circle cx='60' cy='60' r='43' />
      </svg>
      {showPercentage && percentage && (
        <Typography color='primary' lineHeight='4' fontSize='4' fontWeight='1' as='span'>
          {percentage} %
        </Typography>
      )}
    </LoaderContainer>
  )
}

Loader.propTypes = {
  percentage: PropTypes.number,
  time: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['big', 'small']),
  variant: PropTypes.oneOf(['icon', 'major'])
}

Loader.defaultProps = {
  showPercentage: false
}

const LoaderContainer = styled.div`
  height: 96px;
  width: 96px;
  background: #333;
  position: relative;

  svg {
    width: 120px;
    height: 120px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    fill: transparent;
  }
  svg circle {
    stroke-width: 9.6px;
    stroke: #1565c0;
  }

  svg circle:nth-child(1) {
    opacity: 0.25;
  }

  svg circle:nth-child(2) {
    stroke-linecap: round;
    stroke-dasharray: 500;
    animation: animate ${props => props.time}s linear;
  }

  @keyframes animate {
    from {
      stroke-dashoffset: 500;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  span {
    max-width: 52px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export default Loader
