import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from '@xstyled/styled-components'

import { Box, Flex, Avatar, Typography, Button } from '../'

const Card = ({ media, avatar, headerText, complementaryText, contentText }) => {
  return (
    <CardContainer>
      <MediaContainer>Teste (área da mídia){media}</MediaContainer>
      <Flex margin='16px'>
        <Box>
          <Avatar size='medium'>{avatar}</Avatar>
        </Box>
        <Box>
          <Typography>Header Text{headerText}</Typography>
          <Typography>Complementary Text{complementaryText}</Typography>
        </Box>
      </Flex>

      <Box>
        <Typography>Content text.{contentText}</Typography>
      </Box>
      <Flex>
        <Button variant='filled'>Primary</Button>
        <Button variant='outlined'>Secondary</Button>
      </Flex>
    </CardContainer>
  )
}

const CardContainer = styled(Box)(
  css`
    position: absolute;
    width: 280px;
    height: 480px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
  `
)

const MediaContainer = styled(Flex)(
  css`
    font-family: Open Sans;
  `
)

export default Card
