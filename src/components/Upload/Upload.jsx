import React, { useRef, useState, forwardRef } from 'react'
import styled from '@xstyled/styled-components'
import PropTypes from 'prop-types'

import { Typography } from '../Typography'
import { Flex } from '../Grid'
import { Button } from '../Button'
import { Icon } from '../Iconography'
import { Attachment } from '../Attachment'

const handleAcceptedFileTypes = fileTypes => (typeof fileTypes === 'object' ? fileTypes.join(',') : fileTypes)

const UploadButton = forwardRef(({ name, variant, caption, acceptedFileTypes, multipleFiles, disabled, fileHandler, ...props }, ref) => {
  const hiddenFileInput = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState()

  const handleChange = event => {
    setUploadedFiles(event.target.files)
    fileHandler && fileHandler(event)
  }

  return (
    <Wrapper {...props}>
      <Button
        disabled={disabled}
        variant={variant === 'button' || variant === 'button-primary' ? 'filled' : 'outlined'}
        icon='upload'
        caption={caption}
        as={!disabled && 'label'}
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <HiddenInput
          type='file'
          ref={ref}
          name={name}
          onChange={handleChange}
          multiple={multipleFiles}
          accept={handleAcceptedFileTypes(acceptedFileTypes)}
          {...props}
        />
      </Button>
      {uploadedFiles &&
        Object.values(uploadedFiles).map((file, index) => (
          <Attachment
            key={index}
            file={file}
            onView={() => window.open(URL.createObjectURL(file))}
            onDelete={() => {
              setUploadedFiles(Object.values(uploadedFiles).filter(element => element.name !== file.name))
              hiddenFileInput.current.value = null
            }}
          />
        ))}
    </Wrapper>
  )
})

const UploadDragAndDrop = forwardRef(({
  caption,
  name,
  description,
  acceptedFileTypes,
  multipleFiles,
  disabled,
  fileHandler,
  ...props
}, ref) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState(false)

  const handleChange = event => {
    try {
      setUploadedFiles(event.target.files)
      fileHandler && fileHandler(event)
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <Wrapper {...props}>
      <HiddenInput
        type='file'
        ref={ref}
        name={name}
        onChange={handleChange}
        multiple={multipleFiles}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      <StyledButton
        uploadedFiles={uploadedFiles}
        onDragOver={e => {
          e.preventDefault()
        }}
        onDrop={e => {
          e.preventDefault()
          setUploadedFiles(e.dataTransfer.files)
        }}
        py={5}
        disabled={disabled}
        icon='upload'
        direction='column'
        variant='outlined'
        caption={caption}
        description={description}
      />
      {uploadedFiles &&
        Object.values(uploadedFiles).map((file, index) => (
          <Attachment
            key={index}
            file={file}
            error={error}
            onView={() => window.open(URL.createObjectURL(file))}
            onDelete={() => {
              setUploadedFiles(Object.values(uploadedFiles).filter(element => element.name !== file.name))
              hiddenFileInput.current.value = null
            }}
          />
        ))}
    </Wrapper>
  )
})

const UploadImage = forwardRef(({ name, caption, acceptedFileTypes, disabled, fileHandler, ...props }, ref) => {
  const hiddenFileInput = useRef(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(false)

  const handleChange = event => {
    try {
      setUploadedImage(event.target.files[0])
      setImagePreview(URL.createObjectURL(event.target.files[0]))
      fileHandler && fileHandler(event)
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
        ref={ref}
        name={name}
        onChange={handleChange}
        accept={handleAcceptedFileTypes(acceptedFileTypes)}
      />
      {imagePreview || error ? (
        <ImageContainer imagePreview={imagePreview} error={error} p={3}>
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
          disabled={disabled}
          icon='upload'
          direction='column'
          variant='outlined'
          caption={caption}
          color={'primary'}
        />
      )}
    </Wrapper>
  )
})

const Upload = forwardRef(({
  name,
  caption,
  description,
  variant,
  acceptedFileTypes,
  multipleFiles,
  disabled,
  fileHandler,
  ...props
}, ref) => {
  if (
    variant === 'button' ||
    variant === 'button-primary' ||
    variant === 'button-outlined' ||
    variant === 'button-secondary'
  )
    return (
      <UploadButton
        variant={variant}
        caption={caption}
        name={name}
        acceptedFileTypes={acceptedFileTypes}
        multipleFiles={multipleFiles}
        disabled={disabled}
        ref={ref}
        fileHandler={fileHandler}
        {...props}
      />
    )
  if (variant === 'drag-drop')
    return (
      <UploadDragAndDrop
        caption={caption}
        name={name}
        description={description}
        acceptedFileTypes={acceptedFileTypes}
        multipleFiles={multipleFiles}
        disabled={disabled}
        fileHandler={fileHandler}
        ref={ref}
        {...props}
      />
    )
  if (variant === 'image')
    return (
      <UploadImage
        caption={caption}
        name={name}
        acceptedFileTypes={acceptedFileTypes || 'image/*'}
        disabled={disabled}
        fileHandler={fileHandler}
        ref={ref}
        {...props}
      />
    )
})

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
  border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors.primary)} solid;
  border-radius: 4px;
  margin: auto;
  :hover {
    border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors.primary_hover)} solid;
    ${ImageOverlay} {
      opacity: 0.8;
      ${Icon} {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  :active {
    border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors.primary_active)} solid;
  }
`

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 4px;
`

const StyledButton = styled(Button)`
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-style: ${props => (props.uploadedFiles.length === 0 ? 'dashed' : 'solid')};
`

const ImageUpload = styled(Button)`
  border: ${props =>
    props.error ? `1px ${props.theme.colors.error} dashed` : `1px ${props.theme.colors.primary} dashed`};
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
  disabled: PropTypes.bool,
  fileHandler: PropTypes.func,
  name: PropTypes.string.isRequired
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
