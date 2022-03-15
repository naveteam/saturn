import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space, layout } from 'styled-system'

import { Flex, Icon, Link, Loader, Typography } from './../../components'

const bytesToSize = bytes => {
  if (bytes === 0) return

  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)

  return `${i === 0 ? bytes : (bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

const AttachmentComponent = ({
  name,
  link,
  onDownload,
  onView,
  onDelete,
  file,
  backgroundColor,
  error,
  variant,
  isLoading,
  ...props
}) => {
  const fileName = useMemo(() => {
    if (name) return name.length > 7 ? name.slice(0, 7).concat('...') : name

    if (file) {
      if (file.name.length > 10) {
        const [slicedName, extension] = file.name.split('.', 2)
        const maxSlicedNameLength = 10 - extension.length - 3

        if (maxSlicedNameLength > 0) return slicedName.slice(0, maxSlicedNameLength).concat(`...${extension}`)

        return `${slicedName.slice(0, 7)}...`
      }

      return file.name
    }

    if (link) {
      const linkFileName = link.substring(link.lastIndexOf('/') + 1)

      if (linkFileName.length > 10) {
        const [slicedName, extension] = linkFileName.split('.', 2)
        const maxSlicedNameLength = 10 - extension.length - 3

        if (maxSlicedNameLength > 0) return slicedName.slice(0, maxSlicedNameLength).concat(`...${extension}`)

        return `${slicedName.slice(0, 7)}...`
      }

      return linkFileName
    }
  }, [name, file, link])

  const iconsColor = useMemo(() => (error && variant === 'upload' ? 'error' : 'blue.300'), [error, variant])
  const renderIcons = useMemo(() => {
    if (variant === 'upload' && isLoading) {
      return <Loader size='smallIcon' />
    } else if (variant === 'upload') {
      return (
        <Fragment>
          {!error && onView && <StyledIcon icon='visibility-outline' onClick={onView} color={iconsColor} />}
          {onDelete && <StyledIcon icon='delete-outline' onClick={onDelete} color={iconsColor} />}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          {onDownload && <StyledIcon icon='download' onClick={onDownload} color={iconsColor} />}
          {onView && <StyledIcon icon='visibility-outline' onClick={onView} color={iconsColor} />}
          {onDelete && <StyledIcon icon='delete-outline' onClick={onDelete} color={iconsColor} />}
        </Fragment>
      )
    }
  }, [])

  return (
    <Wrapper backgroundColor={backgroundColor} variant={variant} {...props}>
      {(link || file) && (
        <Flex width={1} justifyContent='space-between' alignItems='center'>
          <Flex alignItems='center' mr={4}>
            <AttachmentIcon icon='attachment' color={iconsColor} />
            <Flex flexWrap='wrap'>
              {variant === 'upload' && (error || isLoading) ? (
                <Typography fontSize={14} lineHeight='24px' color={iconsColor}>
                  {fileName}
                </Typography>
              ) : (
                <Link
                  fontSize={14}
                  lineHeight='24px'
                  {...(link && !file && { to: link, target: '_blank' })}
                  {...(file && { onClick: onView })}
                >
                  {fileName}
                </Link>
              )}

              {file?.size > 0 && (variant === 'download' || !error) && (
                <Typography fontSize={14} lineHeight='24px' ml={8} color='gray.800'>
                  ({bytesToSize(file?.size)})
                </Typography>
              )}
            </Flex>
          </Flex>

          <Flex alignItems='center'>{renderIcons}</Flex>
        </Flex>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  padding: 0 4px;
  border-radius: 4px;

  ${layout}
  ${space}
`

const AttachmentIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  transform: rotate(-45deg);
  margin-right: 8px;
`

const StyledIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  padding-right: 8px;

  &:last-child {
    padding-right: 0px;
  }
`

AttachmentComponent.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  onDownload: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  file: PropTypes.object,
  backgroundColor: PropTypes.string,
  error: PropTypes.bool,
  variant: PropTypes.oneOf(['upload', 'download']),
  isLoading: PropTypes.bool
}

AttachmentComponent.defaultProps = {
  backgroundColor: 'none',
  error: false,
  variant: 'upload',
  isLoading: false
}

export default AttachmentComponent
