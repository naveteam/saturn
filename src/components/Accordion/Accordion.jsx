import PropTypes from 'prop-types'
import React, { cloneElement, Children, useState } from 'react'
import styled, { css, layout, space } from '@xstyled/styled-components'

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

const AccordionHeader = ({ expanded, expandIcon, setExpanded, title, subtitle, headerColor, headerHeight }) => {
  return (
    <StyledHeader
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      bg={headerColor}
      headerHeight={headerHeight}
      expanded={expanded}
      onClick={() => setExpanded(current => !current)}
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
  expanded: PropTypes.number,
  expandIcon: PropTypes.string,
  setExpanded: PropTypes.func,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headerColor: PropTypes.string,
  headerHeight: PropTypes.string
}

AccordionHeader.defaultProps = {
  expandIcon: 'expand_more',
  headerColor: 'white',
  headerHeight: '56px'
}

const AccordionDetail = ({ children, expanded, detailColor }) => (
  <AccordionContent expanded={expanded} detailColor={detailColor}>
    {children}
  </AccordionContent>
)

AccordionDetail.propTypes = {
  expanded: PropTypes.number,
  detailColor: PropTypes.string
}

AccordionDetail.defaultProps = {
  detailColor: 'gray.100'
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
  ({ headerHeight, expanded }) => css`
    padding: 4;
    height: ${headerHeight};
    width: inherit;
    cursor: pointer;
    box-sizing: border-box;
    border-color: gray.300 !important;

    ${expanded
      ? {
          borderBottomLeftRadius: '0px !important',
          borderBottomRightRadius: '0px !important',
          borderBottomWidth: '0px !important'
        }
      : ''}
  `
)

const AccordionContent = styled.div(
  ({ expanded, detailColor }) => css`
    width: inherit;
    transition: all 0.3s linear;
    box-sizing: border-box;
    overflow: hidden;
    background-color: ${detailColor};
    color: gray.800;
    border-color: gray.300;

    ${expanded
      ? { height: '100%', padding: '16px', visibility: 'visible !important' }
      : { height: 0, padding: '0px 16px' }};
  `
)

export { AccordionDetail, AccordionHeader, AccordionsWrapper }
export default Accordion
