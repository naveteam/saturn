import styled from 'styled-components'
import { space, layout, typography, color, flexbox } from 'styled-system'
import StyledSystemProptypes from '@styled-system/prop-types'

const Box = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ${space}
  ${layout}
  ${typography}
  ${color}
  ${flexbox}
`

Box.propTypes = {
  ...StyledSystemProptypes.space,
  ...StyledSystemProptypes.layout,
  ...StyledSystemProptypes.typography,
  ...StyledSystemProptypes.space,
  ...StyledSystemProptypes.flexbox
}

export default Box
