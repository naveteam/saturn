import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AttachmentComponent, Button, Flex, Icon, Typography } from './../../components'

const handleAcceptedFileTypes = fileTypes => (typeof fileTypes === 'object' ? fileTypes.join(',') : fileTypes)

const createFileList = files => {
  const dt = new DataTransfer()

  files.forEach(file => dt.items.add(file))

  return dt.files
}

const UploadComponent = forwardRef(
  (
    {
      name,
      variant,
      caption,
      description,
      color,
      acceptedFileTypes,
      multipleFiles,
      disabled,
      fileHandler,
      resetValue,
      ...props
    },
    ref
  ) => {
    const inputRef = ref ?? useRef()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const acceptedTypes = useMemo(() => handleAcceptedFileTypes(acceptedFileTypes), [acceptedFileTypes])

    const isImageVariant = useMemo(() => variant === 'image', [variant])
    const buttonVariant = useMemo(() => {
      if (variant === 'button-primary' || variant === 'button') return 'filled'
      return 'outlined'
    }, [variant])

    const [error, setError] = useState(false)
    const imagePreview = useMemo(() => {
      if (!isImageVariant || uploadedFiles.length <= 0) return null
      return URL.createObjectURL(uploadedFiles?.[0])
    }, [uploadedFiles])

    useEffect(() => {
      if (!resetValue) return

      if (inputRef?.current) inputRef.current.files = createFileList(resetValue)
      setUploadedFiles(resetValue)
    }, [resetValue])

    const handleChange = (event, isDrop) => {
      event.preventDefault()
      try {
        const submittedFiles = Array.from(isDrop ? event.dataTransfer.files : event.target.files)

        if (!multipleFiles || isImageVariant) {
          if (inputRef?.current)
            inputRef.current.files = createFileList(isImageVariant ? [submittedFiles[0]] : submittedFiles)
          setUploadedFiles(isImageVariant ? [submittedFiles[0]] : submittedFiles)
          fileHandler && fileHandler(isImageVariant ? [submittedFiles[0]] : submittedFiles)
          return
        }

        const newFileList = [...uploadedFiles]
        let existsANewFile = false
        submittedFiles.forEach(submittedFile => {
          const isANewFile =
            uploadedFiles.findIndex(
              uploadedFile => submittedFile.name === uploadedFile.name && submittedFile.size === uploadedFile.size
            ) <= -1

          if (!isANewFile) return

          newFileList.push(submittedFile)
          existsANewFile = true
        })

        if (inputRef?.current) inputRef.current.files = createFileList(newFileList)
        if (!existsANewFile) return

        setUploadedFiles(newFileList)
        fileHandler && fileHandler(newFileList)
      } catch (err) {
        console.log(err)
        setError(true)
      }
    }

    const handleDelete = index => {
      const newFileList = isImageVariant ? [] : uploadedFiles.filter((_, indexUploaded) => index !== indexUploaded)
      if (inputRef?.current) inputRef.current.files = createFileList(newFileList)
      setUploadedFiles(newFileList)
      fileHandler && fileHandler(newFileList)
    }

    const renderButton = variant => {
      if (
        variant === 'button' ||
        variant === 'button-primary' ||
        variant === 'button-secondary' ||
        variant === 'button-outlined'
      )
        return (
          <Button
            variant={buttonVariant}
            disabled={disabled}
            caption={caption}
            icon='upload'
            color={color}
            padding={0}
            onClick={() => inputRef.current.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleChange(e, true)}
          />
        )

      if (variant === 'drag-drop')
        return (
          <DragAndDropButton
            direction='column'
            variant='outlined'
            disabled={disabled}
            caption={caption}
            description={description}
            icon='upload'
            color={color}
            py={5}
            onClick={() => inputRef.current.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleChange(e, true)}
            uploadedFiles={uploadedFiles}
          />
        )

      if (isImageVariant && !imagePreview && !error) {
        return (
          <ImageButton
            direction='column'
            variant='outlined'
            disabled={disabled}
            caption={caption}
            icon='upload'
            color={color}
            error={error}
            onClick={() => inputRef.current.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleChange(e, true)}
          />
        )
      }
    }

    return (
      <Wrapper isImageVariant={isImageVariant} {...props}>
        <HiddenInput
          type='file'
          name={name}
          accept={isImageVariant ? 'image/*' : acceptedTypes}
          multiple={isImageVariant ? false : multipleFiles}
          onChange={e => handleChange(e, false)}
          ref={inputRef}
        />

        {renderButton(variant)}

        {isImageVariant
          ? (imagePreview || error) && (
              <ImageContainer imagePreview={imagePreview} error={error} color={color} p={3}>
                <ImageOverlay>
                  {!error && (
                    <Icon
                      icon='visibility-outline'
                      color='white'
                      mr={2}
                      onClick={() => window.open(imagePreview, '_blank')}
                    />
                  )}
                  <Icon icon='delete-outline' color='white' ml={2} onClick={() => handleDelete()} />
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
            )
          : uploadedFiles?.map((file, index) => (
              <AttachmentComponent
                variant='upload'
                key={index}
                file={file}
                onView={() => window.open(URL.createObjectURL(file))}
                onDelete={() => handleDelete(index)}
              />
            ))}
      </Wrapper>
    )
  }
)

const Wrapper = styled(Flex)`
  width: 100%;
  max-width: ${props => (props.isImageVariant ? '282px' : '384px')};
  flex-direction: column;
  align-items: center;
`

const HiddenInput = styled.input`
  display: none;
`

const DragAndDropButton = styled(Button)`
  border-color: ${props => props.color ?? props.theme.colors.primary};
  border-width: 1px;
  border-style: ${props => (props.uploadedFiles.length <= 0 ? 'dashed' : 'solid')};
`

const ImageButton = styled(Button)`
  border: 1px
    ${props => (props.error ? props.theme.colors.error : props.theme.colors[props.color] ?? props.theme.colors.primary)}
    dashed;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    ${ImageOverlay} {
      opacity: 0.8;
      ${Icon} {
        opacity: 1;
        cursor: pointer;
      }
    }
  }

  &::before {
    content: '';
    height: 0;
    float: left;
    padding-bottom: 100%;
  }
`

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
  border: 2px ${props => (props.error ? props.theme.colors.error : props.theme.colors[props.color])} solid;
  border-radius: 4px;
  margin: auto;
  :hover {
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

UploadComponent.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['button', 'button-primary', 'button-secondary', 'button-outlined', 'drag-drop', 'image']),
  caption: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  acceptedFileTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf([PropTypes.string])]),
  multipleFiles: PropTypes.bool,
  disabled: PropTypes.bool,
  fileHandler: PropTypes.func,
  resetValue: PropTypes.array
}

UploadComponent.defaultProps = {
  variant: 'button',
  caption: 'Upload',
  multipleFiles: false,
  disabled: false
}

export default UploadComponent
