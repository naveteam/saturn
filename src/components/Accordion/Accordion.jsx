import PropTypes from 'prop-types'
import React, { cloneElement, Children, useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { background, layout, space } from 'styled-system'

import { Flex, Icon, Typography, Subtitle } from '../'

const Accordion = ({ children, isOpen: isOpenProp }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)

  const propChildren = Children.map(children, current => {
    return cloneElement(current, {
      isOpen: isOpen ? 1 : 0,
      setIsOpen
    })
  })

  return <div>{propChildren}</div>
}

Accordion.propTypes = {
  children: PropTypes.array,
  isOpen: PropTypes.bool
}

Accordion.defaultProps = {
  isOpen: false
}

const AccordionHeader = ({ isOpen, expandIcon, setIsOpen, title, subtitle, ...props }) => {
  return (
    <StyledHeader
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      isOpen={isOpen}
      px={16}
      onClick={() => setIsOpen(current => !current)}
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
      <StyledIcon isOpen={isOpen} icon={expandIcon} color='gray.800' />
    </StyledHeader>
  )
}

AccordionHeader.propTypes = {
  backgroundColor: PropTypes.string,
  isOpen: PropTypes.bool,
  expandIcon: PropTypes.string,
  setIsOpen: PropTypes.func,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

AccordionHeader.defaultProps = {
  backgroundColor: 'white',
  expandIcon: 'expand_more'
}

const AccordionDetail = ({ children, isOpen, ...props }) => {
  const [heightTransition, setHeightTransition] = useState(0)
  const accordionContentRef = useRef(null)

  useEffect(() => setHeightTransition(accordionContentRef.current.offsetHeight + 100), [accordionContentRef])

  return (
    <AccordionContent heightTransition={heightTransition} ref={accordionContentRef} isOpen={isOpen} {...props}>
      {children}
    </AccordionContent>
  )
}

AccordionDetail.propTypes = {
  isOpen: PropTypes.bool,
  backgroundColor: PropTypes.string
}

AccordionDetail.defaultProps = {
  backgroundColor: 'gray.100',
  padding: 16
}

const AccordionsWrapper = styled.div(
  ({ border, theme: { colors } }) => css`
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
      ${border === 'line' && {
        borderTop: '1px',
        borderStyle: 'solid'
      }}
    }

    & > div > div:first-child {
      ${border === 'line' && {
        borderWidth: '0px 1px 0px',
        borderStyle: 'solid'
      }}
    }

    & > div > div:nth-child(2) {
      ${border === 'line' && {
        borderWidth: '0px 1px 1px',
        borderStyle: 'solid'
      }}
    }

    & > div:last-child > div:nth-child(2) {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    & > div:not(:last-child) {
      ${border !== 'line' && { borderBottom: `1px solid ${colors.gray['300']}` }};
    }

    ${layout}
    ${space}
  `
)

AccordionsWrapper.defaultProps = {
  border: 'shadow'
}

const StyledIcon = styled(Icon)(
  ({ isOpen }) => css`
    transition: transform 0.5s ease-in-out;
    transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  `
)

const StyledHeader = styled(Flex)(
  ({ isOpen, theme: { colors } }) => css`
    padding: 4;
    height: 56px;
    width: inherit;
    cursor: pointer;
    box-sizing: border-box;
    border-color: ${colors.gray['300']} !important;

    ${
      isOpen
        ? {
            borderBottomLeftRadius: '0px !important',
            borderBottomRightRadius: '0px !important',
            borderBottomWidth: '0px !important'
          }
        : ''
    }

    ${background}
    ${layout}
  `
)

const AccordionContent = styled.div(
  ({ isOpen, heightTransition, theme: { colors } }) => css`
    height: auto;
    width: inherit;
    transition: all 0.5s ease-in-out;
    box-sizing: border-box;
    overflow: hidden;
    color: ${colors.gray['800']};
    border-color: ${colors.gray['300']};
    padding: 0px 16px;

    ${background}

    ${heightTransition && { maxHeight: '0' }}

    ${isOpen && [space, { maxHeight: heightTransition }]}

  `
)

export { AccordionDetail, AccordionHeader, AccordionsWrapper }
export default Accordion
