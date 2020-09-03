import React, { useEffect, useRef, useState } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import PropTypes from 'prop-types'
import { Typography } from '../'

export const Loader = ({ percentage, showPercentage, size, time, variant }) => {
  const [circleLength, setCircleLength] = useState(0)
  const externalCircleRef = useRef()

  useEffect(() => {
    const length = externalCircleRef.current.getTotalLength()
    const percent = percentage / 100
    const offsetIndeterminate = length * (1 - 0.75)
    const offset = length * (1 - percent)
    setCircleLength({ length, offset, offsetIndeterminate })
  }, [percentage])

  return (
    <LoaderContainer time={time} size={size} variant={variant} circleLength={circleLength}>
      <svg>
        <circle />
        <circle ref={externalCircleRef} />
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

  svg circle {
    fill: none;
    stroke-linecap: round;
    stroke-dashoffset: ${({ circleLength }) => circleLength.offset};
  }

  svg circle {
    stroke: ${({ theme }) => theme.colors.primary};
  }

  svg circle:nth-child(1) {
    opacity: 0.25;
  }

  svg circle:nth-child(2) {
    stroke-dasharray: ${({ circleLength }) => circleLength.length};
  }

  ${variant({
    prop: 'variant',
    variants: {
      determinate: css`
        position: relative;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        svg circle:nth-child(2) {
          transform: rotate(-90deg) translate(0, -100%);
          transform-origin: 100% 0;
        }
      `,
      indeterminate: css`
        svg {
          animation: rotate ${({ time }) => time}s infinite linear;
        }
        svg circle {
          stroke-dashoffset: ${({ circleLength }) => circleLength.offsetIndeterminate};
        }

        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
      `
    }
  })}

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
          height: 20px;
          width: 20px;
          margin: 2px;
        }

        svg circle {
          cx: 10;
          cy: 10;
          r: 8;
          stroke-width: 2;
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
