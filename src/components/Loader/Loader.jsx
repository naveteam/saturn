import PropTypes from 'prop-types'
import React from 'react'
import styled, { borders, layout } from '@xstyled/styled-components'

import { Typography } from '../'

const getSize = size => (size === 'big' ? 76.8 : 16)

const getBorderWidth = size => (size === 'big' ? 19.2 : 8)

export const Loader = ({ percentage, showPercentage, size, variant }) => {
  return (
    <StyledLoaderSpinner>
      <Spinner size={getSize(size)} borderWidth={getBorderWidth(size)} height={getSize(size)} width={getSize(size)} />
      {showPercentage ? (
        <Typography fontSize={4} lineHeight={4} fontWeight={1} color='primary' style={{ position: 'fixed' }}>
          40%
        </Typography>
      ) : (
        ''
      )}
    </StyledLoaderSpinner>
  )
}

Loader.propTypes = {
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['big', 'small']),
  variant: PropTypes.oneOf(['icon', 'major'])
}

Loader.defaultProps = {
  showPercentage: false,
  size: 'big'
}

const StyledLoaderSpinner = styled.div`
  /* position: fixed; */
  /* z-index: 10; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* top: 0; */
  /* left: 0; */

  /* &:before {
    background: #666;
    position: absolute;
    z-index: 9;
    opacity: 0.8;
    content: '';
    height: 100%;
    width: 100%;
  } */
`

const Spinner = styled.div`
  z-index: 11;
  border-style: solid;
  border-color: blue.400;
  /* height: 76.8px;
  width: 76.8px; */
  border-right-color: rgb(192, 212, 235);
  border-radius: 50%;
  animation: spin 5s linear infinite;
  /* position: absolute; */
  opacity: 1;

  ${layout}
  ${borders}

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export default Loader
