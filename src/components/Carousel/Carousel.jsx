import React, { Children, useReducer } from 'react'
import styled from '@xstyled/styled-components'
import { useSwipeable } from 'react-swipeable'

import { Box, Flex } from '../Grid'

const getOrder = ({ index, pos, numItems }) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos
}

const initialState = { pos: 0, sliding: false, dir: NEXT }

const NEXT = 'NEXT'
const PREV = 'PREV'

const Carousel = ({ width = 588, height = 240, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const numItems = Children.count(children)

  const slide = dir => {
    dispatch({ type: dir, numItems })
    setTimeout(() => {
      dispatch({ type: 'stopSliding' })
    }, 50)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  return (
    <Container width={width} height={height} {...handlers}>
      <Wrapper>
        <Slides dir={state.dir} sliding={state.sliding}>
          {Children.map(children, (child, index) => (
            <CarouselSlot key={index} order={getOrder({ index: index, pos: state.pos, numItems })}>
              {child}
            </CarouselSlot>
          ))}
        </Slides>
      </Wrapper>
      <ContainerDots>
        <Dot active={state.pos === 0} />
        <Dot active={state.pos === 1} />
        <Dot active={state.pos === 2} />
        <Dot active={state.pos === 3} />
        <Dot active={state.pos === 4} />
      </ContainerDots>
      <SlideButton onClick={() => slide(PREV)} float='left'>
        Prev
      </SlideButton>
      <SlideButton onClick={() => slide(NEXT)} float='right'>
        Next
      </SlideButton>
    </Container>
  )
}

const reducer = (state, { type, numItems }) => {
  switch (type) {
    case 'reset':
      return initialState
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1
      }
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1
      }
    case 'stopSliding':
      return { ...state, sliding: false }
    default:
      return state
  }
}

const Wrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
`

const CarouselSlot = styled(Box)`
  flex: 1;
  flex-basis: 100%;
  order: ${props => props.order};
`

const Slides = styled(Flex)`
  transition: ${props => (props.sliding ? 'none' : 'transform 1s ease')};
  transform: ${props => {
    if (!props.sliding) return 'translateX(calc(-100% - 1px))'
    if (props.dir === PREV) return 'translateX(calc(2 * (-100% - 1px)))'
    return 'translateX(0%)'
  }};
`

const ContainerDots = styled(Flex)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 26px;
  width: 100%;
`

const Dot = styled(Box)`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${props => (props.active ? '#FFF' : '#010101')};
  margin-right: 16px;
  z-index: 2px;
`

const SlideButton = styled.button`
  padding: 10px;
  background-color: #989898;
  border: 1px solid white;
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  top: 45%;
  visibility: hidden;
  ${props => (props.float === 'right' ? 'right: 10px' : 'left: 10px')};
`

const Container = styled(Box)`
  background-color: #2378c1;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  &:hover ${SlideButton} {
    visibility: visible;
    transition: 0.2s ease-in;
  }
`

export default Carousel
