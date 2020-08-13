import React from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

export const Loader = ({ time, showPercentage, size, variant }) => {
  return (
    <LoaderContainer time={time} variant='icon'>
      <svg>
        <circle cx='60' cy='60' r='43' />
        <circle cx='60' cy='60' r='43' />
      </svg>
      <span>0 %</span>
    </LoaderContainer>
  )
}

Loader.propTypes = {
  time: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['big', 'small']),
  variant: PropTypes.oneOf(['icon', 'major'])
}

Loader.defaultProps = {
  showPercentage: false,
  time: 5
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

  svg circle:nth-child(1) {
    stroke: #1565c0;
    opacity: 0.25;
    stroke-width: 10px;
  }

  svg circle:nth-child(2) {
    stroke: #1565c0;
    stroke-width: 10px;
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
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    color: #1565c0;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
`

export default Loader
