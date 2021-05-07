import React from 'react'
import styled from '@xstyled/styled-components'

const ItemCarousel = ({ url, width, height }) => {
  return <Item width={width} height={height} img={url} />
}

const Item = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  ${props => props.img && `background-image: url("${props.img}")`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
`

export default ItemCarousel
