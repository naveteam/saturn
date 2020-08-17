import React, { useEffect, useState } from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'
import { Typography } from '../'

export const Loader = ({ percentage, showPercentage, size, variant }) => {
  const [circleLength, setCircleLength] = useState(0)

  useEffect(() => {
    const length = document.getElementById('externalCircle').getTotalLength()
    const purcent = percentage / 100
    const offset = length * (1 - purcent)
    setCircleLength({ length, offset })
  }, [percentage])

  return (
    <LoaderContainer circleLength={circleLength}>
      <svg>
        <circle cx='48' cy='48' r='43' />
        <circle id='externalCircle' cx='48' cy='48' r='43' />
      </svg>
      {showPercentage && percentage && (
        <Typography color='primary' lineHeight='4' fontSize='4' fontWeight='1' as='span'>
          {percentage} %
        </Typography>
      )}
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  height: 96px;
  width: 96px;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  svg {
    height: 96px;
    width: 96px;
  }
  svg circle {
    fill: #fff;
    stroke: #1565c0;
    /* stroke-linecap: round; */
    stroke-width: 9.6;
    stroke-dashoffset: ${props => props.circleLength.offset};
  }

  svg circle:nth-child(1) {
    width: 96px;
    height: 96px;
    opacity: 0.25;
  }

  svg circle:nth-child(2) {
    stroke-dasharray: ${props => props.circleLength.length};
    transform: rotate(-90deg) translate(0, -100%);
    transform-origin: 100% 0;
  }
`

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

export default Loader
