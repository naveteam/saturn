import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { css, down, typography } from '@xstyled/styled-components'

import { Typography } from '../'
import { Icon } from '../Iconography'
import { Flex } from '../Grid'

const Attachment = ({ name, link, onDownload, onView, file, backgroundColor, error, ...props }) => {
  return (
    <Flex px='4px' backgroundColor={backgroundColor}>
      <Flex justifyContent='flex-start'>
        <StyledIcon width={16} height={24} pr='8px' icon='attachment' />
        <Typography>{name}</Typography>
      </Flex>
      <Flex justifyContent='flex-end' ml={24}>
        <Icon width={16} height={24} pr='8px' icon='visibility-outline' />
        <Icon width={16} height={24} icon='delete-outline' />
      </Flex>
    </Flex>
  )
}

const StyledIcon = styled(Icon)`
  transform: rotate(-45deg);
`

Attachment.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  onDownload: PropTypes.func,
  onView: PropTypes.func,
  file: PropTypes.string,
  backgroundColor: PropTypes.string,
  error: PropTypes.string
}

export default Attachment
