import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import styled from '@xstyled/styled-components'

import { Box, Flex, Avatar, Typography, Heading, Paragraph, Button } from '../'

const Card = ({
  media,
  avatar,
  title,
  headerPosition,
  avatarPosition,
  subtitle,
  content,
  children,
  hasCallToAction
}) => {
  const isDefaultHeaderPosition = useMemo(() => headerPosition === 'row', [headerPosition])

  return (
    <CardContainer flexDirection='column' justifyContent='space-between'>
      {!!media && (
        <MediaContainer borderRadius='400'>
          <img width='100%' height='auto' src={media}></img>
          <AvatarContainer>
            <Avatar>{avatar}</Avatar>
          </AvatarContainer>
        </MediaContainer>
      )}

      <Box margin='24px'>
        <Flex flexDirection={headerPosition} mb={isDefaultHeaderPosition ? 8 : 0}>
          {!!avatar && (
            <Box paddingRight={!!title || !!subtitle ? 24 : 0}>
              <Avatar avatar={avatar} size='very-large'></Avatar>
            </Box>
          )}

          <Box>
            {!!title && (
              <Box mt={!isDefaultHeaderPosition ? 16 : 0}>
                <Heading variant='h4'>{title}</Heading>
              </Box>
            )}

            {!!subtitle && (
              <Paragraph variant='sm' fontWeight='400' color='#757575'>
                {subtitle}
              </Paragraph>
            )}
          </Box>
        </Flex>

        <Flex mt={!!title && !!subtitle && !!media && !!avatar ? 24 : 8}>
          {!!content && <Typography>{content}</Typography>}
        </Flex>

        {hasCallToAction && (
          <Flex justifyContent='space-between' align-items='left'>
            <Button variant='filled' caption='Primary' width='50%' mr='16px' mt='24px'></Button>
            <Button variant='outlined' caption='Secondary' width='50%' ml='16px' mt='24px'></Button>
          </Flex>
        )}

        {children}
      </Box>
    </CardContainer>
  )
}

const CardContainer = styled(Flex)`
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
`

const MediaContainer = styled(Flex)`
  position: relative;

  img {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
`

const AvatarContainer = styled(Flex)`
  position: absolute;
  left: 24px;
  top: calc(100% - 32px);
`

Card.defaultProps = {
  headerPosition: 'row',
  avatarPosition: 'default'
}

Card.propTypes = {
  media: PropTypes.string,
  avatar: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  children: PropTypes.string,
  hasCallToAction: PropTypes.bool
}

export default Card
