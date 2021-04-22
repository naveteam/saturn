import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import styled from '@xstyled/styled-components'

import { Box, Flex, Avatar, Typography, Heading, Paragraph } from '../'

const Card = ({ media, avatar, title, headerPosition, avatarPosition, subtitle, content, children, ...props }) => {
  const isDefaultHeaderPosition = useMemo(() => headerPosition === 'row', [headerPosition])

  return (
    <CardContainer flexDirection='column' justifyContent='space-between' maxWidth='280px' {...props}>
      {!!media && (
        <MediaContainer borderRadius='400'>
          <img width='100%' height='auto' src={media} />

          {avatarPosition === 'overlap' && (
            <AvatarContainer>
              <Avatar avatar={avatar} size='very-large' />
            </AvatarContainer>
          )}
        </MediaContainer>
      )}

      <Box margin='24px'>
        <Flex flexDirection={headerPosition} mb={isDefaultHeaderPosition ? 8 : 0}>
          {!!avatar && avatarPosition !== 'overlap' && (
            <Box paddingRight={!!title || !!subtitle ? 24 : 0}>
              <Avatar avatar={avatar} size='very-large' />
            </Box>
          )}

          <Box>
            {!!title && (
              <Box mt={!isDefaultHeaderPosition || avatarPosition === 'overlap' ? 16 : 0}>
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
        {children}
      </Box>
    </CardContainer>
  )
}

const CardContainer = styled(Flex)`
  width: 100%;
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  headerPosition: PropTypes.string,
  avatarPosition: PropTypes.string
}

export default Card
