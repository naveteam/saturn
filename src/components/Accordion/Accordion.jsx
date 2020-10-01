import PropTypes from 'prop-types'
import React, { cloneElement, Children, useState } from 'react'
import styled, { backgrounds, space } from '@xstyled/styled-components'

import { Icon, Typography } from '../'

const Accordion = ({ children, disabled = false, expanded: propsExpanded = false }) => {
  const [expanded, setExpanded] = useState(propsExpanded)

  const propChildren = Children.map(children, current => {
    return cloneElement(current, {
      disabled,
      expanded: expanded ? 1 : 0,
      setExpanded
    })
  })

  return <div>{propChildren}</div>
}

Accordion.propTypes = {
  children: PropTypes.array,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool
}

Accordion.defaultValues = {
  disabled: false
}

const AccordionHeader = ({ disabled, expanded, expandIcon = 'expand_more', setExpanded, title }) => {
  return (
    <StyledHeader disabled={disabled} onClick={() => (!disabled ? setExpanded(current => !current) : '')}>
      <Typography as='span' fontWeight={1} color='gray.800' fontSize={3} lineHeight={3}>
        {title}
      </Typography>
      <StyledIcon expanded={expanded} icon={expandIcon} color='gray.800' />
    </StyledHeader>
  )
}

AccordionHeader.propTypes = {
  disabled: PropTypes.bool,
  expanded: PropTypes.number,
  expandIcon: PropTypes.string,
  setExpanded: PropTypes.func,
  title: PropTypes.string.isRequired
}

const AccordionDetail = ({ children, expanded }) => <AccordionContent expanded={expanded}>{children}</AccordionContent>

const StyledIcon = styled(Icon)`
  transition: all 0.3s;
  transform: ${props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`

const AccordionsWrapper = styled.div`
  width: 100%;
  position: relative;

  & > div:nth-child(1) > ${StyledHeader}:first-child {
    border-radius: 4px 4px 0 0;
  }

  & > div:last-of-type > ${StyledHeader}:first-child {
    border-radius: 0 0 4px 4px;
  }

  & > div > ${StyledHeader}:first-child ${AccordionContent} {
    box-shadow: 0px 3px 4px
      ${({ border }) => (border === 'shadow' || border === undefined ? ' rgba(33, 33, 33, 0.2)' : 'none')};
  }

  & > div:first-child > ${StyledHeader}:first-child {
    ${({ border }) =>
      border === 'line'
        ? {
            borderTop: '1px',
            borderStyle: 'solid'
          }
        : {}}
  }

  & > div > ${StyledHeader}:first-child {
    ${({ border }) =>
      border === 'line'
        ? {
            borderWidth: '0px 1px 1px',
            borderStyle: 'solid'
          }
        : {}}
  }

  & > div:not(:last-of-type) {
    border-color: gray.300 !important;
    ${({ divider }) => (divider ? { borderBottom: '1px solid' } : '')}
  }
`

const StyledHeader = styled.div`
  padding: 4;
  background: white;
  height: 56px;
  width: inherit;
  display: block;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  box-sizing: border-box;
  border-color: gray.300 !important;

  ${space}
`

const AccordionContent = styled.div`
  opacity: 0;
  width: inherit;
  transition: all 0.3s linear;
  box-sizing: border-box;
  overflow: hidden;
  background-color: gray.100;

  z-index: ${props => (props.expanded ? 0 : -1)};
  visibility: ${props => (props.expanded ? 'visible' : 'hidden')};
  padding: ${props => (props.expanded ? '16px' : '0px 16px')};
  height: ${props => (props.expanded ? '100%' : '0')};
  opacity: ${props => (props.expanded ? 1 : 0)};
  ${space}
  ${backgrounds}
`

export { AccordionDetail, AccordionHeader, AccordionsWrapper }
export default Accordion
