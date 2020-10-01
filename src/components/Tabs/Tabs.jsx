import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled, { css, up, down } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Typography } from '../'
import { Icon } from '../Iconography'
import Flex from '../Grid/Flex'

import { outerWidth, debounce, useEventListener } from '../../utils'

const Content = ({ children, value, index, ...props }) => {
  return (
    <TabContent
      role='tabcontent'
      hidden={value !== index}
      id={`tab-content-${props.id}-${index}`}
      aria-labelledby={`tab-${props.id}-${index}`}
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

const ScrollButton = forwardRef(({ to, disabled, clickHandler }, ref) => (
  <ArrowButton ref={ref} onClick={() => clickHandler()} disabled={disabled}>
    <Icon icon={`chevron-${to}`} color='blue.400' />
  </ArrowButton>
))

ScrollButton.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired
}

const a11yProps = (id, index) => {
  return {
    id: `tab-${id}-${index}`,
    'aria-controls': `tab-content-${id}-${index}`
  }
}

const getType = (hasLabel, hasIcon) => {
  if (hasLabel && hasIcon) return 'full'
  if (!hasLabel && hasIcon) return 'onlyIcon'
  return 'onlyText'
}

export const Tabs = ({ direction, tabs, children, ...props }) => {
  const [activeTabValue, setActiveTab] = useState(0)
  const [navigationVisible, setNavigationVisible] = useState(false)
  const [leftArrowClickable, setLeftArrowClickable] = useState(false)
  const [rightArrowClickable, setRightArrowClickable] = useState(true)
  const [collapsedList, setCollapse] = useState(true)
  const [viewSize, setViewSize] = useState(0)
  const [totalSize, setTotalSize] = useState(0)
  const [pointer, setPointer] = useState(0)
  const [translate, setTranslate] = useState(0)
  const [tabSizeArray, setTabSizeArray] = useState([])
  const [id] = useState(props.id || `tabs-${String(Math.random()).replace(/\./g, '')}`)

  const tabsWrapper = useRef(null)
  const leftTrigger = useRef(null)
  const rightTrigger = useRef(null)

  const xScroll = () => {
    tabsWrapper.current.style.transform = `translateX(${translate}px)`
  }

  const leftTriggerHandler = () => {
    setPointer(pointer - 1)
    setTranslate(translate + tabSizeArray[pointer - 1])
    setRightArrowClickable(true)
  }

  const rightTriggerHandler = () => {
    setLeftArrowClickable(true)
    setTranslate(translate - tabSizeArray[pointer])
    setPointer(pointer + 1)

    const nonReachedWidth = totalSize - (tabSizeArray[pointer] + Math.abs(translate))
    const lastViewWidth = tabsWrapper.current.clientWidth
    
    if (nonReachedWidth <= lastViewWidth) {
      setRightArrowClickable(false)
    }
  }

  const checkNavigationNeed = () => {
    if (totalSize > viewSize && direction === 'horizontal') {
      setNavigationVisible(true)
    }
  }

  useEventListener(
    'resize',
    debounce(() => checkNavigationNeed(), true)
  )

  useEffect(() => {
    setViewSize(outerWidth(tabsWrapper.current))
  }, [])

  useEffect(() => {
    setTabSizeArray([...tabsWrapper.current.childNodes].map(el => outerWidth(el)))
  }, [viewSize])

  useEffect(() => {
    setTotalSize(tabSizeArray.reduce((a, b) => a + b, 0))
  }, [tabSizeArray])

  useEffect(() => {
    checkNavigationNeed()
  }, [totalSize, viewSize])

  useEffect(() => {
    if (translate == 0) {
      setLeftArrowClickable(false)
    }
    return xScroll()
  }, [translate])

  return (
    <Base {...props} direction={direction} id={id}>
      <NavigationWrapper hasScroll={navigationVisible} collapsed={collapsedList} direction={direction}>
        <MobileMenu direction={direction}>
          <HamburgerButton onClick={() => setCollapse(!collapsedList)}>
            <Icon icon='menu' color='blue.400' />
          </HamburgerButton>
        </MobileMenu>
        <ScrollButton to='left' disabled={!leftArrowClickable} ref={leftTrigger} clickHandler={leftTriggerHandler} />
        <TabsContainer hasScroll={navigationVisible} value={activeTabValue} direction={direction}>
          <TabsWrapper ref={tabsWrapper} direction={direction}>
            {tabs.map((tab, index) => {
              const { label, disabled, icon } = tab
              return (
                <Tab
                  type={getType(!!label, !!icon)}
                  tabindex={index}
                  key={index}
                  direction={direction}
                  disabled={disabled}
                  active={index === activeTabValue}
                  onClick={() => setActiveTab(index)}
                  {...a11yProps(id, index)}
                >
                  <TabBody>
                    <TabBodyContent>
                      {icon && (
                        <IconContainer hasLabel={label} disabled={disabled} active={index === activeTabValue}>
                          <Icon icon={icon} height='24px' />
                        </IconContainer>
                      )}
                      {label && (
                        <Label title={label} hasScroll={navigationVisible} forwardedAs='span'>
                          {label}
                        </Label>
                      )}
                    </TabBodyContent>
                  </TabBody>
                </Tab>
              )
            })}
          </TabsWrapper>
        </TabsContainer>
        <ScrollButton
          to='right'
          disabled={!rightArrowClickable}
          ref={rightTrigger}
          clickHandler={rightTriggerHandler}
        />
      </NavigationWrapper>
      <Body>
        {children.map((JSX, index) => (
          <Content key={index} value={activeTabValue} index={index} id={id}>
            {React.cloneElement(JSX, { ...JSX.props })}
          </Content>
        ))}
      </Body>
    </Base>
  )
}

Tabs.defaultProps = {
  direction: 'horizontal',
  label: `Tab`
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
    horizontal: css``,
    vertical: css`
      display: flex;
    `
  }
})

const Base = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  ${BaseVariants};
`

const disabledArrowButton = variant({
  prop: 'disabled',
  variants: {
    true: css`
      pointer-events: none;
      * {
        fill: disabled;
      }
    `
  }
})

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  ${disabledArrowButton};
`

const hasScrollVariant = variant({
  prop: 'hasScroll',
  variants: {
    false: css`
      button {
        display: none;
      }
    `
  }
})

const collapsedVariant = variant({
  prop: 'collapsed',
  variants: {
    true: css`
      transform: translateX(-103%);
    `,
    false: css`
      transform: translateX(0);
    `
  }
})

const NavigationWrapperDirectionVariant = variant({
  prop: 'direction',
  variants: {
    horizontal: css`
      display: block;
    `,
    vertical: css`
      display: block;
      transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
      box-sizing: border-box;
      padding: 6 0;
      background-color: white;
      max-width: fit-content;
      box-shadow: 0px 4px 10px rgba(33, 33, 33, 0.25);
      ${collapsedVariant};
    `
  }
})

const NavigationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${hasScrollVariant};

  ${down(
    'md',
    css`
      button {
        display: none;
      }
    `
  )}

  ${down(
    'sm',
    css`
      ${NavigationWrapperDirectionVariant};
    `
  )}
`

const directionVariantContainer = variant({
  prop: 'direction',
  variants: {
    horizontal: css`
      width: 100%;
      max-width: 100%;
      flex-direction: row;
      border-bottom: 1px solid;
      border-bottom-color: gray.300;

      li:last-child {
        margin-right: 0;
      }
    `,
    vertical: css`
      flex-direction: column;
      border-right: 1px solid;
      border-right-color: gray.300;
      max-height: 400px;
      overflow-y: scroll;
      overflow-x: hidden;
      -ms-overflow-style: none;
      scrollbar-width: none;

      ::-webkit-scrollbar {
        display: none;
      }

      li:last-child {
        margin-bottom: 0;
      }

      ${down(
        'sm',
        css`
          padding-left: 32px;
        `
      )}
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
      max-width: fit-content;
      justify-content: center;

      ${down(
        'md',
        css`
          max-width: 100%;
        `
      )}

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
  margin: ${({ hasScroll }) => (hasScroll ? '0 24px' : '0')};
  padding: 0;
  overflow: hidden;
  align-items: center;
  ${directionVariantContainer};

  ${down(
    'md',
    css`
      margin: 0;
    `
  )}

  ${down(
    'sm',
    css`
      border: none;
    `
  )}
`

const tabsWrapperDirectionVariant = variant({
  prop: 'direction',
  variants: {
    vertical: css`
      flex-direction: column;

      ${down(
        'sm',
        css`
          background-color: white;
          box-sizing: border-box;
          max-height: 400px;
          position: relative;
          overflow-y: scroll;
          overflow-x: hidden;
        `
      )}
    `,
    horizontal: css`
      flex-direction: row;

      ${down(
        'md',
        css`
          overflow-x: scroll;
          overflow-y: hidden;
        `
      )}
    `
  }
})

const HamburgerButton = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 8px 11px;
  transform: translateX(100%);
  background-color: white;
  cursor: pointer;
  box-shadow: 1px 2px 4px rgba(33, 33, 33, 0.25);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`

const MobileMenu = styled.div`
  ${down(
    'sm',
    css`
      display: ${({ direction }) => (direction === 'vertical' ? 'flex' : 'none')};
      margin-bottom: 32px;
      box-sizing: border-box;
      justify-content: flex-end;
    `
  )}
  ${up(
    'sm',
    css`
      display: none;
    `
  )}
`

const TabsWrapper = styled.div`
  display: flex;
  transition: 0.3s;
  width: 100%;
  ${tabsWrapperDirectionVariant};
`

const iconDisabledVariant = variant({
  prop: 'disabled',
  variants: {
    true: css`
      * {
        fill: gray.400 !important;
      }
    `
  }
})

const iconActiveVariant = variant({
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
    ${iconDisabledVariant};
    ${iconActiveVariant};
    ${hasLabel && 'margin-right: 16px'};
  `
)

const Label = styled(Typography)`
  display: inline-block;
  transition: font-weight 0.3s cubic-bezier(0.04, 1.01, 0.6, 0.57);

  &::after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 1px;
    color: transparent;
    overflow: hidden;
    visibility: hidden;
  }
`

const disabledTabVariant = variant({
  default: false,
  prop: 'disabled',
  variants: {
    false: css`
      cursor: pointer;
      ${down(
        'md',
        css`
          cursor: default;
        `
      )}
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
        span {
          color: gray.900;
          font-weight: 1;
        }
        * {
          fill: gray.900;
        }
      }
    `
  }
})

const minWidthTabVariant = variant({
  prop: 'type',
  variants: {
    full: css``,
    onlyIcon: css`
      min-width: 24px;
    `,
    onlyText: css`
      min-width: 24px;
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
  color: gray.800;
  ${directionVariantTab};
  ${disabledTabVariant};
  ${activeTabVariant};
  ${minWidthTabVariant};

  &:active {
    &::after {
      background-color: blue.400;
    }
  }

  &::after {
    content: '';
    display: block;
    border-radius: 1;
    transition: background-color 0.2s linear;
    position: absolute;
  }
`

const TabBody = styled.div`
  display: table;
  white-space: nowrap;
  overflow-x: hidden;
`

const TabBodyContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
