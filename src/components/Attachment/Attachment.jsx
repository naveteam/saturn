import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from '@xstyled/styled-components'
import { space, layout, variant, th } from '@xstyled/system'

import { Typography } from '../'
import { Icon } from '../Iconography'
import { Flex } from '../Grid'

const Attachment = ({ name, link, onDownload, onView, onDelete, file, backgroundColor, error, variant, ...props }) => {
  const [showIconsOnHover, setShowIconsOnHover] = useState(false)

  const handleErrorColor = () => (error && variant === 'upload' ? 'error' : 'primary')

  return (
    <Wrapper
      backgroundColor={backgroundColor}
      onMouseEnter={() => setShowIconsOnHover(true)}
      onMouseLeave={() => setShowIconsOnHover(false)}
    >
      <Flex mr={24}>
        <AttachmentIcon color={handleErrorColor()} width={16} height={24} icon='attachment' />
        {file ? (
          <Flex>
            <Link color={handleErrorColor()} forwardedAs='a' pl='8px' {...(link && { href: link, target: '_blank' })}>
              {file?.name}{' '}
            </Link>
            {file?.size && (
              <Typography pl='8px' color='black'>
                ({file?.size})
              </Typography>
            )}
          </Flex>
        ) : (
          <Link color={handleErrorColor()} forwardedAs='a' pl='8px' {...(link && { href: link, target: '_blank' })}>
            {name}
          </Link>
        )}
      </Flex>

      {variant === 'download' ? (
        <Flex>
          <StyledIcon icon='download' onClick={onDownload} />
          <StyledIcon icon='visibility-outline' onClick={onView} />
          <StyledIcon icon='delete-outline' onClick={onDelete} />
        </Flex>
      ) : (
        showIconsOnHover && (
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
        )
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  justify-content: space-between;
  padding-right: 4px;
  padding-left: 4px;
  ${layout}
  ${space}
`

const StyledIcon = styled(Icon)`
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
  name: 'anexo1.png',
  error: false,
  onDownload: () => alert('download'),
  onView: () => alert('view'),
  onDelete: () => alert('delete'),
  variant: 'upload',
  backgroundColor: 'none'
}

export default Attachment
