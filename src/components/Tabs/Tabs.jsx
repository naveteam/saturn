import React, { useState } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'

// import { Typography } from '../'
// import { Icon } from '../Iconography'
import Flex from '../Grid/Flex'

const Content = ({ children, value, index, ...props }) => {
  console.log(value, index, '<<<')
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

const Tabs = ({ type, tabs, children, ...props }) => {
  const [activeTabValue, setActiveTab] = useState(0)

  const handleChange = value => setActiveTab(value)

  return (
    <Base {...props}>
      <TabsContainer value={activeTabValue} type={type}>
        {tabs.map((tab, index) => {
          const { label, disabled, icon } = tab
          return (
            <Tab
              tabindex={index}
              key={index}
              disabled={disabled}
              onClick={() => handleChange(index)}
              {...a11yProps(index)}
            >
              <p>{label}</p>
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
  type: 'horizontal'
}

Tabs.propTypes = {
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

const flexDirections = {
  horizontal: 'row',
  vertical: 'column'
}

const Base = styled.div`
  display: block;
`

const TabsContainer = styled.ul(
  ({ type }) => css`
    list-style-type: none;
    display: flex;
    width: 100%;
    flex-direction: ${flexDirections[type]};
  `
)

const TabVariant = variant({
  default: false,
  prop: 'icon',
  key: 'tab',
  variants: {
    false: css`
    `,
    true: css`
    `,
    disabled: css`
    `
  }
})

const Tab = styled.li`
  cursor: pointer;
  ${TabVariant};
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
