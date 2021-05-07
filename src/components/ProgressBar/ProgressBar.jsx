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

    if (error) {
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
        <Caption variant={barSize === 'small' ? 'sm' : 'md'} marginLeft='5px' color='gray.600'>
          {actualProgress}%
        </Caption>
      )}

      {type === 'withIcon' && (
        <Flex>
          {error ? (
            <Icon icon='error' color={errorColor} size={barSize === 'small' ? 'xsm' : 'sm'} ml='5px' />
          ) : (
            actualProgress === 100 && (
              <Icon icon='check_circle' color={successColor} size={barSize === 'small' ? 'xsm' : 'sm'} ml='5px' />
            )
          )}
        </Flex>
      )}
    </Flex>
  )
}

const BackgroundBar = styled(Flex)(
  ({ barSize, theme }) =>
    css`
      width: 282px;
      height: ${barSize === 'small' ? '4px' : '8px'};
      background: ${theme.colors.gray['200']};
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
  successColor: 'green.400',
  loadingColor: 'blue.400',
  errorColor: 'red.400',
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
