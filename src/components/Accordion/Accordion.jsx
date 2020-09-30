import PropTypes from 'prop-types'
import React, { cloneElement, Children, useState } from 'react'
import styled, { backgrounds, css, space, variant } from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import { Icon, Typography } from '../'

const Accordion = ({ children, disabled, expanded: propsExpanded }) => {
  const [expanded, setExpanded] = useState(propsExpanded)

  const propChildren = Children.map(children, current => {
    return cloneElement(current, {
      expanded
    })
  })

  return <div onClick={() => (!disabled ? setExpanded(current => !current) : '')}>{propChildren}</div>
}

Accordion.propTypes = {
  children: PropTypes.array,
  disabled: PropTypes.bool
}

Accordion.defaultValues = {
  disabled: true,
  propsExpanded: false
}

const AccordionHeader = ({ border, expanded, expandIcon = 'expand_more', title }) => (
  <StyledHeader padding={4} border={border}>
    <Typography as='span' fontWeight={1} color='gray.800' fontSize={3} lineHeight={3}>
      {title}
    </Typography>
    <StyledIcon expanded={expanded} icon={expandIcon} color='gray.800' />
  </StyledHeader>
)

AccordionHeader.propTypes = {
  border: PropTypes.string,
  expandIcon: PropTypes.string,
  title: PropTypes.string.isRequired
}

const AccordionDetail = ({ children, expanded }) => (
  <AccordionContent expanded={expanded} backgroundColor='gray.100'>
    {children}
  </AccordionContent>
)

const StyledIcon = styled(Icon)`
  transition: all 0.3s;
  transform: ${props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`

const AccordionsWrapper = styled.div`
  & > div:nth-child(1) > ${StyledHeader}:first-child {
    border-radius: 4px 4px 0 0;
  }

  & > div:last-of-type > ${StyledHeader}:first-child {
    border-radius: 0 0 4px 4px;
  }

  & > div:not(:last-of-type) {
    border-color: gray.300 !important;
    ${({ divider }) => (divider ? { borderBottom: '1px solid' } : '')}
  }
`

const StyledHeader = styled.div`
  background: white;
  height: 56px;
  width: 100%;
  display: block;
  cursor: pointer;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  box-sizing: border-box;

  ${variant({
    default: 'shadow',
    prop: 'border',
    variants: {
      shadow: css`
        box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
      `,
      line: css`
        border: 1px solid;
        border-color: gray.300;
      `
    }
  })}

  ${space}
`

const AccordionContent = styled.div`
  opacity: 0;
  width: 100%;
  transition: all 0.3s;
  box-sizing: border-box;

  padding: ${props => (props.expanded ? '16px' : '0px 16px')};
  height: ${props => (props.expanded ? '100%' : '0')};
  opacity: ${props => (props.expanded ? 1 : 0)};
  ${space}
  ${backgrounds}
`

export { AccordionDetail, AccordionHeader, AccordionsWrapper }
export default Accordion
