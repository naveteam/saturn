import React, { useState } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography } from '../'
import { Icon } from '../Iconography'
import Flex from '../Grid/Flex'

const Content = ({ children, value, index, ...props }) => {
  return (
    <TabContent
      role='tabcontent'
      hidden={value !== index}
      id={`tab-content-${index}`}
      aria-labelledby={`tab-${index}`}
      {...props}
    >
      {value === index && <Flex>{children}</Flex>}
    </TabContent>
  )
}

Content.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-content-${index}`
  }
}

const Tabs = ({ direction, tabs, children, ...props }) => {
  const [activeTabValue, setActiveTab] = useState(0)

  const handleChange = value => setActiveTab(value)

  return (
    <Base {...props} direction={direction}>
      <TabsContainer value={activeTabValue} direction={direction}>
        {tabs.map((tab, index) => {
          const { label, disabled, icon } = tab
          return (
            <Tab
              tabindex={index}
              key={index}
              direction={direction}
              disabled={disabled}
              active={index === activeTabValue}
              onClick={() => handleChange(index)}
              {...a11yProps(index)}
            >
              <TabBody>
                <TabBodyContent>
                  {icon && (
                    <IconContainer hasLabel={label} disabled={disabled} active={index === activeTabValue}>
                      <Icon icon={icon} height='24px' />
                    </IconContainer>
                  )}
                  {label && <Label forwardedAs='span'>{label}</Label>}
                </TabBodyContent>
              </TabBody>
            </Tab>
          )
        })}
      </TabsContainer>
      <Body>
        {children.map((JSX, index) => (
          <Content key={index} value={activeTabValue} index={index}>
            {React.cloneElement(JSX, { ...JSX.props })}
          </Content>
        ))}
      </Body>
    </Base>
  )
}

Tabs.defaultProps = {
  direction: 'horizontal'
}

Tabs.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

const BaseVariants = variant({
  prop: 'direction',
  variants: {
    horizontal: css`
      width: 100%;
    `,
    vertical: css`
      height: 100%;
    `
  }
})

const Base = styled.div`
  display: block;
  ${BaseVariants};
`

const directionVariantContainer = variant({
  prop: 'direction',
  variants: {
    horizontal: css`
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      flex-direction: row;
      border-bottom: 1px solid #e0e0e0;

      li:last-child {
        margin-right: 0;
      }
    `,
    vertical: css`
      overflow-x: hidden;
      overflow-y: auto;
      flex-direction: column;
      border-right: 1px solid #e0e0e0;

      li:last-child {
        margin-bottom: 0;
      }
    `
  }
})

const directionVariantTab = variant({
  prop: 'direction',
  variants: {
    horizontal: css`
      padding: 0 3 4 3;
      margin-right: 6;
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 4px;
      }
    `,
    vertical: css`
      padding: 3 6 3 0;
      margin-bottom: 6;

      &::after {
        right: -1px;
        top: 0;
        width: 4px;
        height: 100%;
      }
    `
  }
})

const TabsContainer = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
  ${directionVariantContainer};
`

const IconDisabledVariant = variant({
  prop: 'disabled',
  variants: {
    true: css`
      * {
        fill: disabled!important;
      }
    `,
  }
})

const IconActiveVariant = variant({
  prop: 'active',
  variants: {
    true: css`
      * {
        fill: blue.400;
      }
    `,
    false: css`
      * {
        fill: gray.800;
      }
    `
  }
})

const IconContainer = styled.div(
  ({ hasLabel }) => css`
    display: block;
    max-height: 24px;
    height: 100%;
    ${IconDisabledVariant};
    ${IconActiveVariant};
    ${hasLabel && 'margin-right: 16px'};
  `
)

const Label = styled(Typography)`
  display: inline-block;
`

const disabledTabVariant = variant({
  default: false,
  prop: 'disabled',
  variants: {
    false: css`
      cursor: pointer;
    `,
    true: css`
      pointer-events: none;
      color: disabled;
    `
  }
})

const activeTabVariant = variant({
  default: false,
  prop: 'active',
  variants: {
    true: css`
      color: blue.400;
      font-weight: 1;

      &:hover {
        color: blue.400;
      }

      &::after {
        background-color: blue.400;
      }
    `,
    false: css`
      &:hover {
        color: gray.900;
        font-weight: 1;

        * {
          fill: gray.900;
        }
      }
    `
  }
})

const Tab = styled.li`
  width: 100%;
  font-size: 3;
  line-height: 3;
  font-weight: normal;
  box-sizing: border-box;
  border-radius: 1;
  position: relative;
  transition: all 0.1s;
  color: gray.800;
  ${directionVariantTab};
  ${disabledTabVariant};
  ${activeTabVariant};

  &::after {
    content: '';
    display: block;
    border-radius: 1;
    position: absolute;
  }
`

const TabBody = styled.div`
  display: table;
`

const TabBodyContent = styled.div`
  display: flex;
`

const TabContent = styled.div(
  ({ hidden }) => css`
    display: ${hidden ? 'none' : 'block'};
  `
)

const Body = styled.div`
  width: 100%;
  height: 100%;
`

export default Tabs
