import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { variant } from 'styled-system'
import PropTypes from 'prop-types'
import { Typography } from '../'

export const Loader = ({ variant, percentage, showPercentage, size, time, type, ...props }) => {
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
    <LoaderContainer time={time} size={size} type={type} circleLength={circleLength} {...props}>
      <svg>
        <circle />
        <circle ref={externalCircleRef} />
      </svg>
      {showPercentage && percentage && size === 'major' && type !== 'indeterminate' && (
        <Typography color='primary' lineHeight='4' fontSize='4' fontWeight='1' as='span'>
          {percentage} %
        </Typography>
      )}
    </LoaderContainer>
  )
}

const rotateAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const sizeVariant = variant({
  prop: 'size',
  variants: {
    major: {
      height: '96px',
      width: '96px',
      svg: {
        height: '96px',
        width: '96px',
        circle: {
          cx: 48,
          cy: 48,
          r: 43,
          strokeWidth: 9.6
        }
      }
    },
    icon: {
      height: '20px',
      width: '20px',
      margin: '2px',
      svg: {
        height: '20px',
        width: '20px',
        margin: '2px',
        circle: {
          cx: 10,
          cy: 10,
          r: 8,
          strokeWidth: 2
        }
      }
    },
    smallIcon: {
      height: '16px',
      width: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      svg: {
        height: '16px',
        width: '16px',
        circle: {
          cx: 8,
          cy: 8,
          r: 7,
          strokeWidth: 1.6
        }
      }
    }
  }
})

const typeVariant = ({ time, circleLength }) =>
  variant({
    prop: 'type',
    variants: {
      determinate: {
        position: 'relative',
        span: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        'svg circle:nth-child(2)': {
          transform: 'rotate(-90deg) translate(0, -100%)',
          transformOrigin: '100% 0'
        }
      },
      indeterminate: {
        svg: {
          circle: {
            strokeDashoffset: circleLength.offsetIndeterminate
          }
        }
      }
    }
  })

const LoaderContainer = styled.div`
  display: inline-block;

  svg {
    /* ToDo: Mover animation para variant na v6 do styled-components */
    ${({ type, time }) =>
      type === 'indeterminate' &&
      css`
        animation: ${rotateAnimation} ${time}s infinite linear;
      `}

    circle {
      fill: none;
      stroke-linecap: round;
      stroke-dashoffset: ${({ circleLength }) => circleLength.offset};
      stroke: ${({ theme }) => theme.colors.primary};

      &:nth-child(1) {
        opacity: 0.25;
      }

      &:nth-child(2) {
        stroke-dasharray: ${({ circleLength }) => circleLength.length};
      }
    }
  }

  ${sizeVariant}
  ${typeVariant}
`

Loader.propTypes = {
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['smallIcon', 'icon', 'major']),
  time: PropTypes.number,
  type: PropTypes.oneOf(['determinate', 'indeterminate'])
}

Loader.defaultProps = {
  showPercentage: false,
  size: 'major',
  time: 5,
  type: 'indeterminate'
}

export default Loader
