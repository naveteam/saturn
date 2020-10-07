import React, { useRef, useState, useEffect } from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../Typography'
import { Flex } from '../Grid'
import { Button } from '../Button'
import { Icon } from '../Iconography'
import { Attachment } from '../Attachment'

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
      {uploadedFiles && Array.from(uploadedFiles).map((file, index) => <Attachment key={index} file={file} />)}
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
      {uploadedFiles && Array.from(uploadedFiles).map((file, index) => <Attachment key={index} file={file} />)}
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
      {uploadedFiles && Array.from(uploadedFiles).map((file, index) => <Attachment key={index} file={file} />)}
    </Wrapper>
  )
}

const UploadImage = ({ caption, acceptedFileTypes, disabled, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(false)

  const handleClickImageUpload = () => hiddenFileInput.current.click()

  const handleChange = event => {
    try {
      setUploadedImage(event.target.files[0])
      setImagePreview(URL.createObjectURL(event.target.files[0]))
    } catch (err) {
      console.log(err)
      setError(true)
    } finally {
      event.target.value = null
    }
  }

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      {imagePreview || error ? (
        <ImageContainer error={error} p={3}>
          <ImageOverlay>
            {!error && (
              <Icon
                icon='visibility-outline'
                color='white'
                mr={2}
                onClick={() => window.open(imagePreview, '_blank')}
              />
            )}
            <Icon
              icon='delete-outline'
              color='white'
              ml={2}
              onClick={() => {
                setImagePreview(null)
                setUploadedImage(null)
                setError(false)
              }}
            />
          </ImageOverlay>
          {error ? (
            <ImageErrorContainer flexDirection='column'>
              <Icon icon='broken-image' color='error' />
              <Typography color='error' fontWeight={1} fontSize={2} mt={3}>
                Upload Error
              </Typography>
            </ImageErrorContainer>
          ) : (
            <StyledImage src={imagePreview} />
          )}
        </ImageContainer>
      ) : (
        <ImageUpload
          py={5}
          error={error}
          onClick={!error && handleClickImageUpload}
          disabled={disabled}
          icon={'upload'}
          direction='column'
          variant='outlined'
          caption={caption}
          color={'primary'}
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
        disabled={disabled}
        {...props}
      />
    )
}

const ImageErrorContainer = styled(Flex)`
  margin: auto;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.error};
`

const ImageOverlay = styled(Flex)`
  margin: auto;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.gray[900]};
  opacity: 0;
  border-radius: 4px;
  width: 262px;
  height: 262px;
  position: absolute;
  transition: 0.2s ease;
`

const ImageContainer = styled(Flex)`
  width: 282px;
  height: 282px;
  border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors.primary)} dashed;
  border-radius: 4px;
  margin: auto;
  :hover {
    border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors.primary_hover)} dashed;
    ${ImageOverlay} {
      opacity: 0.8;
      ${Icon} {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  :active {
    border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors.primary_active)} dashed;
  }
`

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 4px;
`

const StyledButton = styled(Button)`
  border: 2px ${props => props.theme.colors.primary} dashed;
`
const ImageUpload = styled(Button)`
  border: ${props =>
    props.error ? `2px ${props.theme.colors.error} dashed` : `2px ${props.theme.colors.primary} dashed`};
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
