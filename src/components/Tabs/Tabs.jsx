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

const ScrollButton = forwardRef(({ to, disabled, clickHandler }, ref) => (
  <ArrowButton ref={ref} onClick={clickHandler} disabled={disabled}>
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

export const Tabs = ({ direction, tabs, initialActiveTab, children, ...props }) => {
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
        <ScrollButton to='left' disabled={!leftArrowClickable} ref={leftTrigger} clickHandler={leftTriggerHandler} />
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

const BaseVariants = variant({
  prop: 'direction',
  variants: {
    horizontal: {},
    vertical: { display: 'flex' }
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
    true: {
      pointerEvents: 'none',
      '*': {
        fill: 'disabled'
      }
    },
    false: {}
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
    false: {
      'button': {
        display: 'none'
      }
    }
  }
})

const collapsedVariant = variant({
  prop: 'collapsed',
  variants: {
    true: { transform: 'translateX(-103%)' },
    false: { transform: 'translateX(0)' }
  }
})

const NavigationWrapperDirectionVariant = variant({
  prop: 'direction',
  variants: {
    horizontal: { display: 'block' },
    vertical: {
      display: 'block',
      transition: '0.4s cubic-bezier(0.22, 0.61, 0.36, 1)',
      boxSizing: 'border-box',
      padding: '6px 0px',
      backgroundColor: 'white',
      maxWidth: 'fit-content',
      boxShadow: '0px 4px 10px rgba(33, 33, 33, 0.25)',
      ...collapsedVariant
    }
  }
})

const NavigationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${hasScrollVariant};
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    button {
      display: none;
    }
  }
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    ${NavigationWrapperDirectionVariant};
  }
`


const directionVariantContainer = ({ theme }) => variant({
  prop: 'direction',
  variants: {
    horizontal: {
      width: '100%',
      maxWidth: '100%',
      flexDirection: 'row',
      borderBottom: '1px solid',
      borderBottomColor: 'gray.300',

      'li:last-child': {
        marginRight: '0'
      }
    },
    vertical: {
      borderRight: '1px solid',
      maxHeight: '400px',
      flexDirection: 'column',
      borderRightColor: 'gray.300',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',

      '::-webkit-scrollbar': {
        display: 'none'
      },

      'li:last-child': {
        marginBottom: '0'
      },

      [`@media only screen and (max-width: ${theme.breakpoints.sm}px)`]: {
        paddingLeft: '32px'
      }
    }
  }
})

const directionVariantTab = ({ theme: { breakpoints, space } }) => {
  variant({
    prop: 'direction',
    variants: {
      horizontal: {
        padding: `0px ${space[3]} ${space[4]}`,
        marginRight: space[6],
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'fit-content',
        justifyContent: 'center',
        [`@media only screen and (max-width: ${breakpoints.md}px)`]: {
          maxWidth: '100%'
        },
        '&::after': {
          bottom: '-1px',
          left: '0',
          width: '100%',
          height: '4px'
        }
      },
      vertical: {
        padding: `$${space[3]} ${space[6]} ${space[3]} 0`,
        marginBottom: space[6],

        '&:: after': {
          right: '-1px',
          top: '0px',
          width: '4px',
          height: '100%'
        }
      }
    }
  })
}

const TabsContainer = styled.ul`
  list-style-type: none;
  display: flex;
  margin: ${({ hasScroll }) => (hasScroll ? `0 ${space[5]}` : '0')};
  padding: 0;
  overflow: hidden;
  align-items: center;
  ${directionVariantContainer};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin: 0;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    border: none;
  }
`

const tabsWrapperDirectionVariant = ({ theme }) => variant({
  prop: 'direction',
  variants: {
    vertical: {
      flexDirection: 'column',
      [`@media only screen and (max-width: ${theme.breakpoints.sm}px)`]: {
        backgroundColor: 'white',
        boxSizing: 'border-box',
        maxHeight: '400px',
        position: 'relative',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden'
      }
    },
    horizontal: {
      flexDirection: 'row',
      [`@media only screen and (max-width: ${theme.breakpoints.md}px)`]: {
        overflowX: 'scroll',
        overflowY: 'hidden'
      }
    }
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



// const MobileMenu = styled.div(
//   ({ theme: { breakpoints, space }, direction }) =>
//     css`
//       @media only screen and(max-width: ${breakpoints.md}px) {
//         display: ${direction === 'vertical' ? 'flex' : 'none'};
//         margin-bottom: ${space[5]};
//         box-sizing: border-box;
//         justify-content: flex-end;
//       }

//       @media only screen and(min-width: ${breakpoints.sm}px) {
//         display: none;
//       }
//   `)
// )



const TabsWrapper = styled.div`
display: flex;
transition: 0.3s;
width: 100 %;
${tabsWrapperDirectionVariant};
`

const iconDisabledVariant = ({ theme }) => variant({
  prop: 'disabled',
  variants: {
    true: {
      '*': {
        fill: `${theme.colors.gray['400']} !important; `
      }
    },
    false: {}
  }
})

const iconActiveVariant = ({ theme }) => variant({
  prop: 'active',
  variants: {
    true: {
      '*': {
        fill: theme.colors.primary
      }
    },
    false: {
      '*': {
        fill: theme.colors.gray['800']
      }
    }
  }
})

const IconContainer = styled.div`
  display: block;
  max-height: 24px;
  height: 100%;
  ${iconDisabledVariant};
  ${iconActiveVariant};
  ${({ hasLabel, theme }) => hasLabel && `margin-right: ${theme.space[4]}`};
`

const Label = styled(Typography)`
display: inline - block;
transition: font - weight 0.3s cubic - bezier(0.04, 1.01, 0.6, 0.57);

  &:: after {
  display: block;
  content: attr(title);
  font - weight: bold;
  height: 1px;
  color: transparent;
  overflow: hidden;
  visibility: hidden;
}
`

const disabledTabVariant = ({ theme }) => variant({
  prop: 'disabled',
  variants: {
    true: {
      pointerEvents: 'none',
      color: 'disabled'
    }
  }
})

const activeTabVariant = ({ theme }) => variant({
  prop: 'active',
  variants: {
    true: {
      color: theme.colors.primary,
      fontWeight: theme.fontWeights[0],
      '&:hover': {
        color: theme.colors.primary
      },
      '&::after': {
        backgroundColor: theme.colors.primary
      }
    },
    false: {
      '&:hover': {
        'span': {
          color: theme.colors.gray['900'],
          fontWeight: theme.fontWeights[0]
        },
        '*': {
          fill: theme.colors.gray['900']
        }
      }
    }
  }
})

const minWidthTabVariant = ({ theme }) => variant({
  prop: 'type',
  variants: {
    full: {},
    onlyIcon: {
      minWidth: theme.space[5]
    },
    onlyText: {
      minWidth: theme.space[5]
    }
  }
})

const Tab = styled.li`
${({ theme }) => css`
    width: 100%;
    font-size: ${theme.fontSizes[3]};
    line-height: ${theme.lineHeights[3]};
    font-weight: normal;
    box-sizing: border-box;
    border-radius: ${theme.radii[1]};
    position: relative;
    color: ${theme.colors.gray['800']};
    cursor: pointer;
    ${directionVariantTab}
    ${disabledTabVariant}
    ${minWidthTabVariant}
    ${activeTabVariant}

    &:active {
      &::after {
          background-color: ${theme.colors.primary};
      }
    }

    &::after{
      content: '';
      display: block;
      border-radius: ${theme.radii[1]};
      transition: background-color 0.2s linear;
      position: absolute;
    }
  `}
`

const TabBody = styled.div`
  display: table;
  white-space: nowrap;
  overflow-x: hidden;
`

const TabContent = styled.div`
display: ${({ hidden }) => hidden ? 'none' : 'block'};
`

const Body = styled.div`
  width: 100%;
  height: 100%;
`
