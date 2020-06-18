import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { color, layout, space, border } from 'styled-system'
import { Typography } from '../'

const Tag = ({ children, variant, fontWeight, color, ...props }) => {
  return (
    <Base display='inline-block' p={2} m={2} borderRadius={2} {...props}>
      <Typography fontSize={`tag.${variant}`} fontWeight={fontWeight} color={color}>
        {children}
      </Typography>
    </Base>
  )
}

const Base = styled.div`
  ${color}
  ${layout}
  ${space}
  ${border}
  cursor: pointer;
`

Tag.defaultProps = {
  variant: 'md',
  fontWeight: 'tag',
  backgroundColor: 'blue.main',
  color: 'white'
}

Tag.propTypes = {
  variant: PropTypes.oneOf(['sm', 'md'])
}

export default Tag
