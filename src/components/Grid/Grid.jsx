import { Box } from '../'
import clsx from 'clsx'
import styled from 'styled-components'
import { parseGridProps, columnsProp } from './Grid.utils'

const containerClassName = 'Saturn_grid-container'
const itemClassName = 'Saturn_grid-container'

const Grid = styled(({ className: extraClassNames, item, ...rest }) => {
  const defaultClassName = item ? itemClassName : containerClassName
  return <Box display='grid' className={clsx(defaultClassName, extraClassNames)} {...rest} />
})`
  ${parseGridProps};
  ${columnsProp};
`

export default Grid
