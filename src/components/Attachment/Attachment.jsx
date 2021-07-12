import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { space, layout } from 'styled-system'

import { Typography } from '../Typography'
import { Icon } from '../Iconography'
import { Flex } from '../Grid'
import { Link } from '../Link'

const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return ''
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

const Attachment = ({ name, link, onDownload, onView, onDelete, file, backgroundColor, error, variant, ...props }) => {
  const handleName = () => {
    if (name) {
      if (name.length > 7) return name.slice(0, 7).concat('...')
      return name
    }

    if (file) {
      if (file.name.length > 11) {
        const extension = file.name.substring(file.name.lastIndexOf('.'))
        const slicedName = file.name.substring(0, file.name.lastIndexOf('.'))
        const maxNameLength = 11 - extension.length
        const maxSlicedNameLength = maxNameLength - 3
        if (slicedName.length > maxSlicedNameLength) {
          return slicedName.slice(0, maxSlicedNameLength).concat(`..${extension}`)
        }
        return slicedName.concat(`..${extension}`)
      }
      return file.name
    }

    if (link) {
      const linkFileName = link.substring(link.lastIndexOf('/') + 1)
      const extension = linkFileName.substring(linkFileName.lastIndexOf('.'))
      const slicedLinkName = linkFileName.slice(0, linkFileName.lastIndexOf('.'))
      if (linkFileName.length > 11) {
        const maxLinkNameLength = 11 - extension.length
        const maxSlicedLinkLength = maxLinkNameLength - 3
        if (slicedLinkName.length > maxSlicedLinkLength) {
          return slicedLinkName.slice(0, maxSlicedLinkLength).concat(`..${extension}`)
        }
        return slicedLinkName.concat(`..${extension}`)
      }
      return linkFileName
    }
  }

  const handleErrorColor = () => (error && variant === 'upload' ? 'error' : 'blue.300')

  if (variant === 'upload')
    return (
      <Wrapper backgroundColor={backgroundColor} error={error} variant={variant} {...props}>
        {(link || file) && (
          <Container>
            <Flex mr={5} alignItems='center'>
              <AttachmentIcon color={handleErrorColor()} width={24} height={24} icon='attachment' />
              <Flex flexWrap='wrap'>
                {error ? (
                  <Typography color='error' pl={3} fontSize={2}>
                    {handleName()}
                  </Typography>
                ) : link ? (
                  <Link fontSize={2} pl={3} {...(link && { to: link, target: '_blank' })}>
                    {handleName()}
                  </Link>
                ) : (
                  <Link fontSize={2} pl={3} onClick={onView}>
                    {handleName()}
                  </Link>
                )}
                {file?.size && !error && (
                  <Typography color='gray.800' pl={3} fontSize={2}>
                    ({bytesToSize(file?.size)})
                  </Typography>
                )}
              </Flex>
            </Flex>

            <Flex>
              {!error && onView && <StyledIcon icon='visibility-outline' onClick={onView} />}
              {onDelete && <StyledIcon icon='delete-outline' onClick={onDelete} color={handleErrorColor()} />}
            </Flex>
          </Container>
        )}
      </Wrapper>
    )

  if (variant === 'download')
    return (
      <Wrapper backgroundColor={backgroundColor} variant={variant} {...props}>
        {(link || file) && (
          <Container>
            <Flex mr={5} alignItems='center'>
              <AttachmentIcon color={handleErrorColor()} width={24} height={24} icon='attachment' />
              <Flex>
                <Link
                  fontSize={2}
                  pl={3}
                  {...(link && !file && { to: link, target: '_blank' })}
                  {...(file && { onClick: onView })}
                >
                  {handleName()}
                </Link>
                {file?.size && (
                  <Typography color='gray.800' pl={3} fontSize={2}>
                    ({bytesToSize(file?.size)})
                  </Typography>
                )}
              </Flex>
            </Flex>

            <Flex>
              {onDownload && <StyledIcon icon='download' onClick={onDownload} />}
              {onView && <StyledIcon icon='visibility-outline' onClick={onView} />}
              {onDelete && <StyledIcon icon='delete-outline' onClick={onDelete} />}
            </Flex>
          </Container>
        )}
      </Wrapper>
    )
}

const Container = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

const StyledIcon = styled(Icon)(
  ({ theme: { colors } }) => `
  display: none;
  fill: ${colors.blue[300]};
  width: 24px;
  height: 24px;
  padding-right: 8px;

  &:last-child {
    padding-right: 0px;
  }

  :hover {
    cursor: pointer;
  }
`
)

const Wrapper = styled(Flex)`
  ${StyledIcon} {
    display: ${props => (props.variant === 'download' || props.error) && 'block'};
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

const AttachmentIcon = styled(Icon)(
  ({ theme: { colors } }) => `
  transform: rotate(-45deg);
  fill: ${colors.blue[300]};
`
)

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
  variant: 'upload',
  backgroundColor: 'none'
}

export default Attachment
