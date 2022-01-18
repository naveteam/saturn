import styled from 'styled-components'

import { Box } from '../Box'

const Flex = styled(Box)`
  display: flex;
`

Flex.propTypes = {
  ...Box.propTypes
}

export default Flex
