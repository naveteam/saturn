import React, { useEffect, useRef, useState, useMemo } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import PropTypes from 'prop-types'
import { Typography } from '../'

export const Loader = ({ variant, percentage, showPercentage, size, time, type, ...props }) => {
  const [circleLength, setCircleLength] = useState(0)
  const externalCircleRef = useRef()

  const typeValue = useMemo(() => type || variant, [])

  useEffect(() => {
    const length = externalCircleRef.current.getTotalLength()
    const percent = percentage / 100
    const offsetIndeterminate = length * (1 - 0.75)
    const offset = length * (1 - percent)
    setCircleLength({ length, offset, offsetIndeterminate })
  }, [percentage])

  return (
    <LoaderContainer time={time} size={size} type={typeValue} circleLength={circleLength} {...props}>
      <svg>
        <circle />
        <circle ref={externalCircleRef} />
      </svg>
      {showPercentage && percentage && size !== 'sm' && typeValue !== 'indeterminate' && (
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
    prop: 'type',
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
      lg: css`
        &,
        svg {
          height: 6rem;
          width: 6rem;
        }
        svg circle {
          cx: 3rem;
          cy: 3rem;
          r: 2.688rem;
          stroke-width: 0.6rem;
        }
      `,

      md: css`
        &,
        svg {
          height: 3rem;
          width: 3rem;
        }

        svg circle {
          cx: 1.5rem;
          cy: 1.5rem;
          r: 1rem;
          stroke-width: 0.3rem;
        }
      `,
      sm: css`
        &,
        svg {
          height: 1.25rem;
          width: 1.25rem;
          margin: 0.125rem;
        }

        svg circle {
          cx: 0.625rem;
          cy: 0.625rem;
          r: 0.5rem;
          stroke-width: 0.125rem;
        }
      `
    }
  })}
`

Loader.propTypes = {
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  time: PropTypes.number,
  type: PropTypes.oneOf(['determinate', 'indeterminate'])
}

Loader.defaultProps = {
  showPercentage: false,
  size: 'lg',
  time: 5,
  variant: 'indeterminate'
}

export default Loader
