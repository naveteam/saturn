import React, { useRef, useState } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { space, layout, variant, th, color } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography, Flex, Button, Icon } from '../'

const UploadButton = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFile, setUploadedFile] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFile(event.target.files[0])

  return (
    <Wrapper {...props}>
      <input type='file' ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
      <Button onClick={handleClick} disabled={disabled}>
        <Flex alignItems='center' justifyContent='center'>
          <Icon icon='upload' color='white' mr={3} /> Upload Button
        </Flex>
      </Button>
      <Typography>
        {uploadedFile?.name} {uploadedFile?.size}
      </Typography>
    </Wrapper>
  )
}

const UploadButtonOutlined = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  return (
    <Wrapper {...props}>
      <Button>
        <Flex alignItems='center' justifyContent='center'>
          <Icon icon='upload' color='white' mr={3} /> Upload Button
        </Flex>
      </Button>
    </Wrapper>
  )
}

const UploadDragAndDrop = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  return (
    <Wrapper {...props}>
      <Button>
        <Flex alignItems='center' justifyContent='center'>
          <Icon icon='upload' color='white' mr={3} /> Upload Drag &amp; Drop
        </Flex>
      </Button>
    </Wrapper>
  )
}

const UploadImage = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  return (
    <Wrapper {...props}>
      <Button>
        <Flex alignItems='center' justifyContent='center'>
          <Icon icon='upload' color='white' mr={3} /> Upload Image
        </Flex>
      </Button>
    </Wrapper>
  )
}

const Upload = ({ caption, variant, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  if (variant === 'button' || variant === 'button-primary')
    return (
      <UploadButton
        caption={caption}
        acceptedFileTypes={acceptedFileTypes}
        multipleFiles={multipleFiles}
        disabled={disabled}
        {...props}
      />
    )
  if (variant === 'button-outlined' || variant === 'button-secondary')
    return (
      <UploadButtonOutlined
        caption={caption}
        acceptedFileTypes={acceptedFileTypes}
        multipleFiles={multipleFiles}
        disabled={disabled}
        {...props}
      />
    )
  if (variant === 'drag-drop')
    return (
      <UploadDragAndDrop
        caption={caption}
        acceptedFileTypes={acceptedFileTypes}
        multipleFiles={multipleFiles}
        disabled={disabled}
        {...props}
      />
    )
  if (variant === 'image')
    return (
      <UploadImage
        caption={caption}
        acceptedFileTypes={acceptedFileTypes}
        multipleFiles={multipleFiles}
        disabled={disabled}
        {...props}
      />
    )
}

const Wrapper = styled(Flex)`
  max-width: 384px;
  margin-bottom: 10px;
`

Upload.PropTypes = {
  caption: PropTypes.string,
  variant: PropTypes.oneOf(['button', 'button-primary', 'button-outlined', 'button-secondary', 'drag-drop', 'image']),
  acceptedFileTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf([PropTypes.string])]),
  multipleFiles: PropTypes.bool,
  disabled: PropTypes.bool
}

Upload.defaultProps = {
  caption: 'Upload',
  variant: 'button',
  acceptedFileTypes: 'all',
  multipleFiles: false,
  disabled: false
}

export default Upload
