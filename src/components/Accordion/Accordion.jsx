import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { backgrounds, css, layout, space, variant } from '@xstyled/styled-components'
import { Icon, Typography } from '../'

const Accordion = ({ children, disabled = false }) => {
  const [expanded, setExpanded] = useState(false)

  React.useEffect(() => {
    console.log(children)
  }, [])

  const propChildren = React.Children.map(children, current => {
    return React.cloneElement(current, {
      expanded
    })
  })

  return <AccordionsContainer onClick={() => setExpanded(current => !current)}>{propChildren}</AccordionsContainer>
}

const AccordionHeader = ({ expanded, title }) => (
  <StyledButton padding={4}>
    <Typography as='span' fontWeight={1} color='gray.800' fontSize={3} lineHeight={3}>
      {title}
    </Typography>
    <Icon icon={expanded ? 'expand_less' : 'expand_more'} color='gray.800' />
  </StyledButton>
)

const AccordionDetail = ({ children, expanded }) => (
  <>
    <AccordionContent display={expanded ? 'block' : 'none'} backgroundColor='gray.100'>
      {children}
    </AccordionContent>
    {/* {divider ? <Divider /> : null} */}
  </>
)

const AccordionsContainer = styled.div`
  & > button:first-child {
    border-radius: 4px 4px 0 0;
  }

  & > button:last-of-type {
    border-radius: 0 0 4px 4px;
  }
`

const StyledButton = styled.button`
  background: #fff;
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

  ${variant({
    default: 'shadow',
    prop: 'contour',
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
  display: none;
  width: 100%;

  ${backgrounds}
  ${layout}
`

const Divider = styled.div`
  border-top: 1px solid;
  height: 0;
  border-color: gray.300;
`

export { AccordionDetail, AccordionHeader }
export default Accordion
