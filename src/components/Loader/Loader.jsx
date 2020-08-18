import React, { useEffect, useState } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import PropTypes from 'prop-types'
import { Typography } from '../'

export const Loader = ({ percentage, showPercentage, size, time, variant }) => {
  const [circleLength, setCircleLength] = useState(0)

  useEffect(() => {
    const length = document.getElementById('externalCircle').getTotalLength()
    const purcent = percentage / 100
    const offsetIndeterminate = length * (1 - 0.25)
    const offset = length * (1 - purcent)
    setCircleLength({ length, offset, offsetIndeterminate })
  }, [])

  return (
    <LoaderContainer time={time} size={size} variant={variant} circleLength={circleLength}>
      <svg>
        <circle />
        <circle id='externalCircle' />
      </svg>
      {showPercentage && percentage && size !== 'icon' && variant !== 'indeterminate' && (
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

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  svg circle {
    fill: none;
    stroke-linecap: round;
    stroke-dashoffset: ${({ circleLength }) => circleLength.offset};
  }

  svg circle:nth-child(1) {
    stroke: #c5d9f0;
  }

  svg circle:nth-child(2) {
    stroke: #1565c0;
    stroke-dasharray: ${({ circleLength }) => circleLength.length};
    transform: rotate(-90deg) translate(0, -100%);
    transform-origin: 100% 0;
  }

  ${variant({
    prop: 'size',
    variants: {
      major: css`
        &,
        svg {
          height: 96px;
          width: 96px;
        }
        svg circle {
          cx: 48;
          cy: 48;
          r: 43;
          stroke-width: 9.6;
        }
      `,
      icon: css`
        &,
        svg {
          height: 24px;
          width: 24px;
        }
        svg circle {
          cx: 12;
          cy: 12;
          r: 10;
          stroke-width: 4;
        }
      `
    }
  })}

  ${variant({
    prop: 'variant',
    variants: {
      determinate: css`
        svg circle:nth-child(1) {
          stroke: #c5d9f0;
        }
        svg circle:nth-child(2) {
          stroke: #1565c0;
        }
      `,
      indeterminate: css`
        svg {
          animation: rotate ${({ time }) => time}s infinite linear;
        }
        svg circle {
          stroke-dashoffset: ${({ circleLength }) => circleLength.offsetIndeterminate};
        }

        svg circle:nth-child(1) {
          stroke: #1565c0;
        }

        svg circle:nth-child(2) {
          stroke: #c5d9f0;
        }

        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
      `
    }
  })}
`

Loader.propTypes = {
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['icon', 'major']),
  time: PropTypes.number,
  variant: PropTypes.oneOf(['determinate', 'indeterminate'])
}

Loader.defaultProps = {
  showPercentage: false,
  size: 'major',
  time: 5,
  variant: 'indeterminate'
}

export default Loader
