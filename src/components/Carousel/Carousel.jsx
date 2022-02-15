import React, { Children } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

import SwiperCore, { Pagination, Navigation } from 'swiper/core'

import { Flex } from '../Flex'
import { Box } from '../Box'

const variantTypes = ['light', 'dark']

SwiperCore.use([Pagination, Navigation])

const Carousel = ({ width, height, variant, children }) => {
  const numItems = Children.count(children)

  if (numItems > 5) return

  return (
    <Container width={width} height={height}>
      <Wrapper>
        <SwiperComponent
          slidesPerView={1}
          spaceBetween={0}
          loop
          navigation
          pagination={{
            clickable: true
          }}
          className='mySwiper'
          variant={variant}
        >
          {Children.map(children, (child, index) => {
            return (
              <Box width={1} height='100%'>
                <SwiperSlide>{child}</SwiperSlide>
              </Box>
            )
          })}
        </SwiperComponent>
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  position: relative;
  box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
  border-radius: 4px;
`

const SwiperComponent = styled(Swiper)`
  &.swiper-container {
    height: 100%;
  }

  & .swiper-button-prev,
  .swiper-button-next {
    width: 24px;
    height: 24px;
    padding: 5px;
    ${props =>
      variantTypes.includes(props.variant) &&
      css`
        background-color: ${props.variant === 'dark' ? '#212121' : '#FAFAFA'};
        opacity: 0.6;
      `};
    text-decoration: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    border-radius: 100%;
    visibility: hidden;

    &:active {
      filter: blur(2px);
      transition: transform 0.5s ease-in-out;
    }
  }

  & .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 18px;
    color: ${props => (props.variant === 'dark' ? '#FAFAFA' : '#212121')};
  }

  & .swiper-pagination-bullet {
    background-color: ${props => (props.variant === 'dark' ? '#212121' : '#FFF')};
    opacity: ${props => (props.variant === 'dark' ? 0.3 : 0.5)};
  }

  & .swiper-pagination-bullet-active {
    background-color: ${props => (props.variant === 'dark' ? '#212121' : '#FFF')};
    opacity: 1;
  }

  &:hover .swiper-button-next {
    transition: 0.5s ease-in;
    visibility: visible;
  }

  &:hover .swiper-button-prev {
    transition: 0.5s ease-in;
    visibility: visible;
  }
`

const Container = styled(Flex)`
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in;
`

Carousel.defaultProps = {
  width: '100%',
  height: 'auto',
  variant: 'light'
}

Carousel.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['light', 'dark']),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default Carousel
