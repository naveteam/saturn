import PropTypes from 'prop-types'
import React from 'react'
import styled from '@xstyled/styled-components'

import { Box, Flex, Avatar, Typography, Button } from '../'

const Card = ({ media, avatar, headerText, complementaryText, contentText }) => {
  return (
    <CardContainer flexDirection='column' justifyContent='space-between'>
      <MediaContainer>
        <img
          src='https://images.pexels.com/photos/772429/pexels-photo-772429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          width='280'
        ></img>
      </MediaContainer>
      <Box margin='24px'>
        <Flex margin='16px'>
          <Box>
            <Avatar size='small'>{avatar}</Avatar>
          </Box>
          <Box margin='2px'>
            <Flex>
              <Typography font-weight='600'>{headerText}</Typography>
            </Flex>
            <Flex>
              <Typography>{complementaryText}</Typography>
            </Flex>
          </Box>
        </Flex>
        <Box mt='30px' mb='30px'>
          <Typography>Content text.{contentText}</Typography>
        </Box>
        <Flex justifyContent='space-between'>
          <Button variant='filled' caption='Primary' width='104px'></Button>
          <Button variant='outlined' caption='Secondary' width='104px'></Button>
        </Flex>
      </Box>
    </CardContainer>
  )
}

const CardContainer = styled(Flex)`
  width: 280px;
  height: 480px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
`

const MediaContainer = styled(Flex)`
  max-width: 280px;
`

Card.propTypes = {
  media: PropTypes.string,
  avatar: PropTypes.string,
  headerText: PropTypes.string,
  complementaryText: PropTypes.string,
  contentText: PropTypes.string
}

export default Card
