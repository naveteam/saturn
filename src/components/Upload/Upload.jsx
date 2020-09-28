import React, { useRef, useState } from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography, Flex, Button, Icon } from '../'

const handleAcceptedFileTypes = fileTypes => {
  return typeof fileTypes === 'object' ? fileTypes.join(',') : fileTypes
}

const UploadButton = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFile, setUploadedFile] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFile(event.target.files[0])

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <Button onClick={handleClick} disabled={disabled} icon='upload'>
        {caption}
      </Button>
      <Typography>
        {uploadedFile?.name} {uploadedFile?.size}
      </Typography>
    </Wrapper>
  )
}

const UploadButtonOutlined = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFile, setUploadedFile] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFile(event.target.files[0])

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <Button onClick={handleClick} disabled={disabled} variant='outlined' icon='upload'>
        {caption}
      </Button>
      <Typography>
        {uploadedFile?.name} {uploadedFile?.size}
      </Typography>
    </Wrapper>
  )
}

const UploadDragAndDrop = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFile, setUploadedFile] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFile(event.target.files[0])

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <Button py={5} onClick={handleClick} disabled={disabled} icon='upload' direction='column' variant='outlined'>
        {caption}
      </Button>
      <Typography>
        {uploadedFile?.name} {uploadedFile?.size}
      </Typography>
    </Wrapper>
  )
}

const UploadImage = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFile, setUploadedFile] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFile(event.target.files[0])

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <Button py={5} onClick={handleClick} disabled={disabled} icon='upload' direction='column' variant='outlined'>
        {caption}
      </Button>
      <Typography>
        {uploadedFile?.name} {uploadedFile?.size}
      </Typography>
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
        acceptedFileTypes={acceptedFileTypes || 'image/*'}
        multipleFiles={multipleFiles}
        disabled={disabled}
        {...props}
      />
    )
}

const HiddenInput = styled.input`
  display: none;
`

const Wrapper = styled(Flex)`
  flex-direction: column;
  max-width: 384px;
  margin-bottom: 10px;
`

Upload.propTypes = {
  caption: PropTypes.string,
  variant: PropTypes.oneOf(['button', 'button-primary', 'button-outlined', 'button-secondary', 'drag-drop', 'image']),
  acceptedFileTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf([PropTypes.string])]),
  multipleFiles: PropTypes.bool,
  disabled: PropTypes.bool
}

Upload.defaultProps = {
  caption: 'Upload',
  variant: 'button',
  multipleFiles: false,
  disabled: false
}

UploadImage.defaultProps = {
  acceptedFileTypes: 'image/*'
}

export default Upload
