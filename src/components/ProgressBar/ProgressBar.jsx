import React, { useState } from 'react'
import styled, { css } from '@xstyled/styled-components'

import { Flex, Caption } from '../'

const ProgressBar = ({ variant, style, barColor, progress }) => {
  return (
    <Flex alignItems='center'>
      <BackgroundBar>
        <InsideBar progress={progress} backgroundColor={barColor}></InsideBar>
      </BackgroundBar>
      <Caption fontSize='12px' marginLeft='5px' color='#757575'>
        {progress}%
      </Caption>
    </Flex>
  )
}

const BackgroundBar = styled(Flex)`
  width: 282px;
  height: 8px;
  background: #eeeeee;
  border-radius: 4px;
  margin-right: 5px;
`
const InsideBar = styled(Flex)(
  ({ progress }) =>
    css`
      width: ${progress}%;
      height: 8px;
      border-radius: 4px;
      transition: all ease-in-out 1s;
    `
)

export default ProgressBar
