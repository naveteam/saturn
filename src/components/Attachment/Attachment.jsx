import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from '@xstyled/styled-components'
import { space, layout } from '@xstyled/system'

import { Typography } from '../'
import { Icon } from '../Iconography'
import { Flex } from '../Grid'

const Attachment = ({ name, link, onDownload, onView, onDelete, file, backgroundColor, error, variant, ...props }) => {
  const handleName = () => {
    if (name) return name
    if (file) return file?.name
    if (link) return link.substring(link.lastIndexOf('/') + 1)
  }

  const handleErrorColor = () => (error && variant === 'upload' ? 'error' : 'primary')

  const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return ''
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
  }

  return (
    <Wrapper backgroundColor={backgroundColor} error={error} variant={variant} {...props}>
      {(link || name || file) && (
        <Container>
          <Flex mr={5}>
            <AttachmentIcon color={handleErrorColor()} width={16} height={24} icon='attachment' />
            <Flex>
              <Link color={handleErrorColor()} forwardedAs='a' pl={3} {...(link && { href: link, target: '_blank' })}>
                {handleName()}{' '}
              </Link>
              {file?.size && (
                <Typography pl={3} color='gray.800'>
                  ({bytesToSize(file?.size)})
                </Typography>
              )}
            </Flex>
          </Flex>

          {variant === 'download' ? (
            <Flex>
              <StyledIcon icon='download' onClick={onDownload} />
              <StyledIcon icon='visibility-outline' onClick={onView} />
              <StyledIcon icon='delete-outline' onClick={onDelete} />
            </Flex>
          ) : (
            <Flex>
              {error && variant === 'upload' ? (
                <StyledIcon icon='delete-outline' onClick={onDelete} color={handleErrorColor()} />
              ) : (
                <Flex>
                  <StyledIcon icon='visibility-outline' onClick={onView} />
                  <StyledIcon icon='delete-outline' onClick={onDelete} color={handleErrorColor()} />
                </Flex>
              )}
            </Flex>
          )}
        </Container>
      )}
    </Wrapper>
  )
}

const Container = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

const StyledIcon = styled(Icon)`
  display: none;
  fill: primary;
  width: 16px;
  height: 24px;
  padding-right: 8px;

  &:last-child {
    padding-right: 0px;
  }

  :hover {
    cursor: pointer;
  }
`

const Wrapper = styled(Flex)`
  ${StyledIcon} {
    display: ${props => props.variant === 'download' && 'block'};
  }
  :hover {
    ${StyledIcon} {
      display: block;
    }
  }
  width: 100%;
  border-radius: 4px;
  justify-content: space-between;
  padding-right: 4px;
  padding-left: 4px;
  ${layout}
  ${space}
`

const Link = styled(Typography)`
  cursor: pointer;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

const AttachmentIcon = styled(Icon)`
  transform: rotate(-45deg);
  fill: primary;
`

Attachment.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  onDownload: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  file: PropTypes.object,
  backgroundColor: PropTypes.string,
  error: PropTypes.bool,
  variant: PropTypes.oneOf(['upload', 'download'])
}

Attachment.defaultProps = {
  error: false,
  onDownload: () => alert('download'),
  onView: () => alert('view'),
  onDelete: () => alert('delete'),
  variant: 'upload',
  backgroundColor: 'none'
}

export default Attachment
