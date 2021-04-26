import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import styled, { css } from '@xstyled/styled-components'

import { Flex, Caption, Icon } from '../'

const ProgressBar = ({ barSize, type, successColor, loadingColor, errorColor, progress, error }) => {
  const actualProgress = useMemo(() => {
    if (progress > 100) {
      return 100
    }
    if (progress < 0) {
      return 0
    }
    return progress
  }, [progress])

  const barColor = useMemo(() => {
    if (actualProgress === 100) {
      return successColor
    }

    if (error === true) {
      return errorColor
    }

    return loadingColor
  }, [error, actualProgress])

  return (
    <Flex alignItems='center'>
      <BackgroundBar barSize={barSize}>
        <InsideBar progress={actualProgress} backgroundColor={barColor} />
      </BackgroundBar>

      {type === 'withPercent' && (
        <Caption fontSize={barSize === 'small' ? '10px' : '12px'} marginLeft='5px' color='#757575'>
          {actualProgress}%
        </Caption>
      )}

      {type === 'withIcon' && (
        <Flex>
          {error ? (
            <Icon icon='error' fill={errorColor} size={barSize === 'small' ? 'sm' : 'md'} />
          ) : (
            actualProgress === 100 && (
              <Icon icon='check_circle' fill={successColor} size={barSize === 'small' ? 'sm' : 'md'} />
            )
          )}
        </Flex>
      )}
    </Flex>
  )
}

const BackgroundBar = styled(Flex)(
  ({ barSize }) =>
    css`
      width: 282px;
      height: ${barSize === 'small' ? '4px' : '8px'};
      background: #eeeeee;
      border-radius: 4px;
      margin-right: 5px;
    `
)

const InsideBar = styled(Flex)(
  ({ progress }) =>
    css`
      width: ${progress}%;
      height: auto;
      border-radius: 4px;
      transition: all ease-in-out 1s;
    `
)

ProgressBar.defaultProps = {
  barSize: 'regular',
  type: 'normal',
  successColor: '#43A047',
  loadingColor: '#1565C0',
  errorColor: '#D50000',
  progress: 0,
  error: false
}

ProgressBar.propTypes = {
  barSize: PropTypes.string,
  type: PropTypes.string,
  successColor: PropTypes.string,
  loadingColor: PropTypes.string,
  errorColor: PropTypes.string,
  progress: PropTypes.number,
  error: PropTypes.bool
}

export default ProgressBar
