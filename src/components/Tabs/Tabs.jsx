import React, { useState, useEffect } from 'react'
import styled, { css, up, down } from '@xstyled/styled-components'
import { variant } from '@xstyled/system'
import PropTypes from 'prop-types'
import { outerWidth, debounce } from '../../utils'

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

const ScrollButton = ({ to, disabled }) => (
  <ArrowButton onClick={e => e.preventDefault()} className={`tabs__scroll-trigger_${to}`} disabled={disabled}>
    <Icon icon={`chevron-${to}`} color='blue.400' />
  </ArrowButton>
)

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-content-${index}`
  }
}

const Tabs = ({ direction, tabs, children, ...props }) => {
  const [activeTabValue, setActiveTab] = useState(0)
  const [showNavigation, toggleNavigation] = useState(false)
  const [leftArrowClickable, toggleLeftArrow] = useState(false)
  const [rightArrowClickable, toggleRightArrow] = useState(true)
  const [collapsedList, setCollapse] = useState(true)
  const [id] = useState(props.id || `tabs-${String(Math.random()).replace(/\./g, '')}`)

  const handleChange = value => setActiveTab(value)

  const getType = (hasLabel, hasIcon) => {
    if (hasLabel && hasIcon) return 'full'
    if (!hasLabel && hasIcon) return 'onlyIcon'
    return 'onlyText'
  }

  const bindScroll = () => {
    const tabElement = document.querySelector(`#${id} .tabs__tab-item`)
    const tabsWrapper = document.querySelector(`#${id} .tabs__wrapper`)

    const leftTrigger = document.querySelector(`#${id} .tabs__scroll-trigger_left`)
    const rightTrigger = document.querySelector(`#${id} .tabs__scroll-trigger_right`)

    const ITEM_SIZE = outerWidth(tabElement) // get tab width
    const ITEMS_LENGTH = tabs.length
    const WRAPPER_SIZE = ITEM_SIZE * ITEMS_LENGTH // total width of the wrapper

    const firstViewSize = outerWidth(tabsWrapper) // gets the visible width of the wrapper
    const firstViewLimit = firstViewSize / ITEM_SIZE // gets the max number of tabs in the visible width

    let translate = 0 // scroll position

    if (ITEMS_LENGTH > firstViewLimit && direction === 'horizontal') {
      // check if scroll navigation is needed
      toggleNavigation(true)
    }

    leftTrigger.addEventListener('click', () => {
      if (translate < ITEM_SIZE) {
        // check if the scroll position is already on max left
        translate += ITEM_SIZE
        toggleRightArrow(true)
      }

      if (translate == 0) {
        // prevent the last left click to overflowing the wrapper
        toggleLeftArrow(false)
      }
      tabsWrapper.style.transform = `translateX(${translate}px)`
    })

    rightTrigger.addEventListener('click', e => {
      const nonReachedView = WRAPPER_SIZE + translate // translate returns a negative value because of that we do an addition
      const itemsPerView = WRAPPER_SIZE / ITEM_SIZE
      const viewSize = ITEM_SIZE * itemsPerView
      const reachedLastView = viewSize > nonReachedView

      if (reachedLastView) {
        // check if the scroll position is already on max right
        toggleRightArrow(false)
      }

      toggleLeftArrow(true)

      translate -= ITEM_SIZE
      tabsWrapper.style.transform = `translateX(${translate}px)`
    })
  }

  useEffect(() => {
    bindScroll()

    window.addEventListener(
      'resize',
      debounce(() => {
        bindScroll()
      }, true)
    )
  }, [])

  return (
    <Base {...props} direction={direction} id={id}>
      <NavigationWrapper hasScroll={showNavigation} collapsed={collapsedList} direction={direction}>
        <MobileMenu direction={direction}>
          <HamburgerButton onClick={() => setCollapse(!collapsedList)}>
            <Icon icon='menu' color='blue.400' />
          </HamburgerButton>
        </MobileMenu>
        <ScrollButton to='left' disabled={!leftArrowClickable} />
        <TabsContainer hasScroll={showNavigation} value={activeTabValue} direction={direction}>
          <TabsWrapper className='tabs__wrapper' direction={direction}>
            {tabs.map((tab, index) => {
              const { label, disabled, icon } = tab
              return (
                <Tab
                  type={getType(!!label, !!icon)}
                  className='tabs__tab-item'
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
          </TabsWrapper>
        </TabsContainer>
        <ScrollButton to='right' disabled={!rightArrowClickable} />
      </NavigationWrapper>
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
    horizontal: css`
    `,
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
        fill: disabled !important;
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
        color: gray.900;
        font-weight: 1;

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
  transition: font-weight 0.2s ease-in-out;
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

export default Tabs
