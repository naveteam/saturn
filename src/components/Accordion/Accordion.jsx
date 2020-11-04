import PropTypes from 'prop-types'
import React, { cloneElement, Children, useState } from 'react'
import styled, { backgrounds, css, layout, space } from '@xstyled/styled-components'

import { Flex, Icon, Typography, Subtitle } from '../'

const Accordion = ({ children, expanded: propsExpanded }) => {
  const [expanded, setExpanded] = useState(propsExpanded)

  const propChildren = Children.map(children, current => {
    return cloneElement(current, {
      expanded: expanded ? 1 : 0,
      setExpanded
    })
  })

  return <div>{propChildren}</div>
}

Accordion.propTypes = {
  children: PropTypes.array,
  expanded: PropTypes.bool
}

Accordion.defaultProps = {
  expanded: false
}

const AccordionHeader = ({ expanded, expandIcon, setExpanded, title, subtitle, ...props }) => {
  return (
    <StyledHeader
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      expanded={expanded}
      onClick={() => setExpanded(current => !current)}
      {...props}
    >
      <Flex>
        <Typography as='span' fontWeight={1} color='gray.800' fontSize={3} lineHeight={3}>
          {title}
        </Typography>
        {subtitle && (
          <Subtitle ml={5} color='gray.500'>
            {subtitle}
          </Subtitle>
        )}
      </Flex>
      <StyledIcon expanded={expanded} icon={expandIcon} color='gray.800' />
    </StyledHeader>
  )
}

AccordionHeader.propTypes = {
  backgroundColor: PropTypes.string,
  expanded: PropTypes.number,
  expandIcon: PropTypes.string,
  setExpanded: PropTypes.func,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

AccordionHeader.defaultProps = {
  backgroundColor: 'white',
  expandIcon: 'expand_more'
}

const AccordionDetail = ({ children, expanded, ...props }) => (
  <AccordionContent expanded={expanded} {...props}>
    {children}
  </AccordionContent>
)

AccordionDetail.propTypes = {
  expanded: PropTypes.number,
  backgroundColor: PropTypes.string
}

AccordionDetail.defaultProps = {
  backgroundColor: 'gray.100',
  padding: '16px'
}

const AccordionsWrapper = styled.div(
  ({ border }) => css`
    width: 100%;

    & > div {
      border-radius: 4px;
    }

    & > div:first-child > div:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    & > div:last-child > div:first-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom-width: 1px;
    }

    & > div {
      box-shadow: 0px 3px 4px ${border === 'shadow' ? ' rgba(33, 33, 33, 0.2)' : 'none'};
    }

    & > div:first-child > div:first-child {
      ${border === 'line'
        ? {
            borderTop: '1px',
            borderStyle: 'solid'
          }
        : {}}
    }

    & > div > div:first-child {
      ${border === 'line'
        ? {
            borderWidth: '0px 1px 0px',
            borderStyle: 'solid'
          }
        : {}}
    }

    & > div > div:nth-child(2) {
      ${border === 'line'
        ? {
            borderWidth: '0px 1px 1px',
            borderStyle: 'solid'
          }
        : {}}
    }

    & > div:last-child > div:nth-child(2) {
      visibility: hidden;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    & > div:not(:last-child) {
      border-color: gray.300 !important;
      ${border !== 'line' ? { borderBottom: '1px solid' } : {}}
    }

    ${layout}
    ${space}
  `
)

AccordionsWrapper.defaultProps = {
  border: 'shadow'
}

const StyledIcon = styled(Icon)(
  ({ expanded }) => css`
    transition: all 0.3s;
    transform: ${expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  `
)

const StyledHeader = styled(Flex)(
  ({ expanded }) => css`
    padding: 4;
    height: 56px;
    width: inherit;
    cursor: pointer;
    box-sizing: border-box;
    border-color: gray.300 !important;

    ${
      expanded
        ? {
            borderBottomLeftRadius: '0px !important',
            borderBottomRightRadius: '0px !important',
            borderBottomWidth: '0px !important'
          }
        : ''
    }

    ${backgrounds}
    ${layout}
  `
)

const AccordionContent = styled.div(
  ({ expanded }) => css`
    width: inherit;
    transition: all 0.3s linear;
    box-sizing: border-box;
    overflow: hidden;
    color: gray.800;
    border-color: gray.300;

    ${expanded ? [space, { height: '100%', visibility: 'visible !important' }] : { height: 0, padding: '0px 16px' }}

    ${backgrounds}
  `
)

export { AccordionDetail, AccordionHeader, AccordionsWrapper }
export default Accordion
