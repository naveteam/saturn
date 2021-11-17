import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled, { css } from 'styled-components'
import { variant } from 'styled-system'
import PropTypes from 'prop-types'

import { Typography } from '../Typography'
import { Icon } from '../Iconography'
import { Flex } from '../Grid'

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

const ScrollButton = forwardRef(({ to, disabled, clickHandler, direction }, ref) => (
  <ArrowButton ref={ref} onClick={clickHandler} disabled={disabled} direction={direction}>
    <Icon icon={`chevron-${to}`} color='primary' />
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

const Tabs = ({ direction, tabs, initialActiveTab, children, ...props }) => {
  const [activeTabValue, setActiveTab] = useState(initialActiveTab || 0)
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
            <Icon icon='menu' color='primary' />
          </HamburgerButton>
        </MobileMenu>
        <ScrollButton
          to='left'
          disabled={!leftArrowClickable}
          ref={leftTrigger}
          clickHandler={leftTriggerHandler}
          direction={direction}
        />
        <TabsContainer hasScroll={navigationVisible} value={activeTabValue} direction={direction}>
          <TabsWrapper ref={tabsWrapper} direction={direction}>
            {tabs.map((tab, index) => {
              const { label, disabled, onClickTab, icon } = tab
              return (
                <Tab
                  type={getType(!!label, !!icon)}
                  tabindex={index}
                  key={index}
                  direction={direction}
                  disabled={disabled}
                  active={index === activeTabValue}
                  onClick={() => {
                    setActiveTab(index)
                    onClickTab && onClickTab()
                  }}
                  {...a11yProps(id, index)}
                >
                  <TabBody>
                    <Flex alignItems='center'>
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
                    </Flex>
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
          direction={direction}
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
  label: 'Tab'
}

Tabs.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string,
      disabled: PropTypes.bool,
      onClickTab: PropTypes.func
    })
  ).isRequired,
  initialActiveTab: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

const BaseVariant = variant({
  prop: 'direction',
  variants: {
    horizontal: {},
    vertical: {
      display: 'flex'
    }
  }
})

const disabledArrowButton = variant({
  prop: 'disabled',
  variants: {
    true: {
      pointerEvents: 'none',
      '*': {
        fill: 'disabled'
      }
    },
    false: {}
  }
})

const hasScrollVariant = variant({
  prop: 'hasScroll',
  variants: {
    false: {},
    button: {
      display: 'none'
    }
  }
})

const collapsedVariant = variant({
  prop: 'collapsed',
  variants: {
    true: {
      transform: 'translateX(-103%)'
    },
    false: {
      transform: 'translateX(0)'
    }
  }
})

const NavigationWrapperDirectionVariant = ({ theme }) =>
  variant({
    prop: 'direction',
    variants: {
      horizontal: {
        display: 'block'
      },
      vertical: {
        display: 'block',
        transition: '0.4s cubic-bezier(0.22, 0.61, 0.36, 1)',
        boxSizing: 'border-box',
        padding: `${theme.space[6]}px 0`,
        backgroundColor: 'white',
        maxWidth: 'fit-content',
        boxShadow: '0px 4px 10px rgba(33, 33, 33, 0.25)'
      }
    }
  })

const directionVariantContainer = ({ theme: { colors, space } }) =>
  variant({
    prop: 'direction',
    variants: {
      horizontal: {
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'row',
        borderBottom: '1px solid',
        borderBottomColor: `${colors.gray['300']}`,

        'li:last-child': {
          marginRight: 0
        }
      },
      vertical: {
        flexDirection: 'column',
        borderRight: '1px solid',
        borderRightColor: `${colors.gray['300']}`,
        maxHeight: '400px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '::-webkit-scrollbar': 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        'li:last-child': {
          marginBottom: 0
        },
        '@media (max-width: 600px)': {
          paddingLeft: `${space[6]}px`
        }
      }
    }
  })

const directionVariantTab = ({ theme: { space } }) =>
  variant({
    prop: 'direction',
    variants: {
      horizontal: {
        padding: `0 ${space[3]}px ${space[4]}px ${space[3]}px`,
        marginRight: `${space[6]}px`,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'fit-content',
        justifyContent: 'center',

        '&::after': {
          bottom: -1,
          left: 0,
          width: '100%',
          height: 4
        }
      },
      vertical: {
        padding: `${space[3]}px ${space[6]}px ${space[3]}px 0`,
        marginBottom: `${space[6]}px`,

        '&::after': {
          right: -1,
          top: 0,
          width: 4,
          height: '100%'
        },

        '@media (max-width: 960px)': {
          maxWidth: '100%'
        }
      }
    }
  })

const tabsWrapperDirectionVariant = variant({
  prop: 'direction',
  variants: {
    vertical: {
      flexDirection: 'column',
      '@media (max-width: 600px)': {
        backgroundColor: 'white',
        boxSizing: 'border-box',
        maxHeight: 400,
        position: 'relative',
        overflowY: 'scroll',
        overflowX: 'hidden'
      }
    },
    horizontal: {
      flexDirection: 'row',
      '@media (max-width: 960px)': {
        overflowX: 'scroll',
        overflowY: 'hidden'
      }
    }
  }
})

const iconActiveVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'active',
    variants: {
      true: {
        '*': {
          fill: `${colors.primary}`
        }
      },
      false: {
        '*': {
          fill: `${colors.gray['800']}`
        }
      }
    }
  })

const disabledTabVariant = variant({
  prop: 'disabled',
  variants: {
    false: {
      cursor: 'pointer',
      '@media (max-width: 960px)': {
        cursor: 'default'
      }
    },
    true: {
      pointerEvents: 'none',
      color: 'disabled'
    }
  }
})

const activeTabVariant = ({ theme: { colors, space } }) =>
  variant({
    prop: 'active',
    variants: {
      true: {
        color: `${colors.primary}`,
        fontWeight: `${space[1]}px`,

        '&:hover': {
          color: `${colors.primary}`
        },

        '&::after': {
          backgroundColor: `${colors.primary}`
        }
      },
      false: {
        '&:hover': {
          '& span': {
            color: `${colors.gray['900']}`,
            fontWeight: `${space[1]}px`
          },
          '*': {
            fill: `${colors.gray['900']}`
          }
        }
      }
    }
  })

const minWidthTabVariant = variant({
  prop: 'type',
  variants: {
    full: {},
    onlyIcon: {
      minWidth: 24
    },
    onlyText: {
      minWidth: 24
    }
  }
})

const iconDisabledVariant = ({ theme: { colors } }) =>
  variant({
    prop: 'disabled',
    variants: {
      true: {
        '*': {
          fill: `${colors.gray['400']} !important`
        }
      },
      false: {}
    }
  })

const Base = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  ${BaseVariant};
`

const TabsContainer = styled.ul(
  ({ theme: { breakpoints } }) => css`
    list-style-type: none;
    display: flex;
    margin: ${({ hasScroll }) => (hasScroll ? '0 24px' : '0')};
    padding: 0;
    overflow: hidden;
    align-items: center;
    ${directionVariantContainer};

    @media (max-width: ${breakpoints.md}px) {
      margin: 0;
    }

    @media (max-width: ${breakpoints.sm}px) {
      border: none;
    }
  `
)

const NavigationWrapper = styled.div(
  ({ theme, direction }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    ${hasScrollVariant};

    @media (max-width: ${theme.breakpoints.md}px) {
      button {
        display: none;
      }
    }

    @media (max-width: ${theme.breakpoints.sm}px) {
      ${NavigationWrapperDirectionVariant};
    }

    @media (max-width: ${theme.breakpoints.sm}px) {
      button {
        display: none;
      }
      position: relative;
      ${direction === 'vertical' && collapsedVariant};
    }
  `
)

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

const MobileMenu = styled.div(
  ({ theme: { breakpoints }, direction }) => css`
    @media (max-width: ${breakpoints.sm}px) {
      display: ${direction === 'vertical' ? 'flex' : 'none'};
      margin-bottom: 32px;
      box-sizing: border-box;
      justify-content: flex-end;
    }

    @media (min-width: ${breakpoints.md}px) {
      display: none;
    }

    @media (min-width: ${breakpoints.sm}px) {
      display: none;
    }
  `
)

const ArrowButton = styled.button(
  ({ direction }) => css`
    display: ${direction === 'vertical' ? 'none' : 'flex'};
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
)

const TabsWrapper = styled.div`
  display: flex;
  transition: 0.3s;
  width: 100%;
  ${tabsWrapperDirectionVariant};
`

const IconContainer = styled.div(
  ({ hasLabel }) => css`
    display: block;
    max-height: 24px;
    height: 100%;
    ${iconDisabledVariant};
    ${iconActiveVariant};
    ${hasLabel &&
    css`
      margin-right: 16px;
    `};
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

const Tab = styled.li(
  ({ theme: { colors, space, fontSizes, lineHeights, breakpoints } }) => css`
    width: 100%;
    font-size: ${fontSizes[3]}px;
    line-height: ${lineHeights[3]};
    font-weight: normal;
    box-sizing: border-box;
    border-radius: ${space[1]}px;
    color: ${colors.gray['800']};
    position: relative;
    ${directionVariantTab};
    ${disabledTabVariant};
    ${activeTabVariant};
    ${minWidthTabVariant};

    &:active {
      &::after {
        background-color: ${colors.primary};
      }
    }

    &::after {
      content: '';
      display: block;
      border-radius: ${space[1]}px;
      transition: background-color 0.2s linear;
      position: absolute;
    }
  `
)

const TabBody = styled.div`
  display: table;
  white-space: nowrap;
  overflow-x: hidden;
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
