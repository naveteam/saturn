import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { compose, space, layout, typography, color, flexbox, background, grid, border } from 'styled-system'

const props = compose(space, layout, typography, color, flexbox, background, grid, border)

const Box = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ${props}
`

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.flexbox,
  ...propTypes.background
}

export default Box
