import React from 'react'
import styled from '@xstyled/styled-components'

const ItemCarousel = ({ url }) => {
  return <Item img={url} />
}

const Item = styled.div`
  width: 588px;
  height: 240px;
  ${props => props.img && `background-image: url("${props.img}")`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
`

export default ItemCarousel
