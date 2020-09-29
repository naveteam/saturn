import React, { useRef, useState, useEffect } from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography, Flex, Button } from '../'

const handleAcceptedFileTypes = fileTypes => {
  return typeof fileTypes === 'object' ? fileTypes.join(',') : fileTypes
}

const UploadButton = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFiles(event.target.files)

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <Button onClick={handleClick} disabled={disabled} icon='upload' caption={caption} />
    </Wrapper>
  )
}

const UploadButtonOutlined = ({ caption, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState()

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFiles(event.target.files)

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <Button onClick={handleClick} disabled={disabled} variant='outlined' icon='upload' caption={caption} />
    </Wrapper>
  )
}

const UploadDragAndDrop = ({ caption, description, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState()
  const [fileHover, setFileHover] = useState(false)

  const handleClick = () => hiddenFileInput.current.click()

  const handleChange = event => setUploadedFiles(event.target.files)

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <StyledButton
        onDragEnter={() => setFileHover(true)}
        onDragLeave={() => setFileHover(false)}
        onDragOver={e => {
          e.preventDefault()
        }}
        onDrop={e => {
          e.preventDefault()
          setFileHover(false)
          console.log(e.dataTransfer.files)
          setUploadedFiles(e.dataTransfer.files)
        }}
        py={5}
        onClick={handleClick}
        disabled={disabled}
        icon='upload'
        direction='column'
        variant='outlined'
        caption={caption}
        description={description}
      />
    </Wrapper>
  )
}

const UploadImage = ({ caption, acceptedFileTypes, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleClick = () => hiddenFileInput.current.click()
  const handleChange = event => {
    setUploadedImage(event.target.files)
    setImagePreview(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      {imagePreview ? (
        <StyledImage src={imagePreview} p={3} />
      ) : (
        <ImageUpload
          py={5}
          onClick={handleClick}
          disabled={disabled}
          icon='upload'
          direction='column'
          variant='outlined'
          caption={caption}
        />
      )}
    </Wrapper>
  )
}

const Upload = ({ caption, description, variant, acceptedFileTypes, multipleFiles, disabled, ...props }) => {
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
        description={description}
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

const StyledImage = styled.img`
  width: 282px;
  height: 282px;
  border: 2px #1565c0 dashed;
  border-radius: 4px;
  padding: 8px;
`

const StyledButton = styled(Button)`
  border: 2px #1565c0 dashed;
`
const ImageUpload = styled(Button)`
  border: 2px #1565c0 dashed;
  max-width: 282px;
  height: 282px;
`

const HiddenInput = styled.input`
  display: none;
`

const Wrapper = styled(Flex)`
  align-items: center;
  flex-direction: column;
  max-width: 384px;
  margin-bottom: 10px;
`

Upload.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
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
