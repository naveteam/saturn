import { system, style } from 'styled-system'

export const parseGridProps = system({
  gap: {
    property: 'gridGap'
  },
  columnGap: {
    property: 'gridColumnGap'
  },
  rowGap: {
    property: 'gridRowGap'
  },
  column: {
    property: 'gridColumn'
  },
  row: {
    property: 'gridRow'
  },
  autoFlow: {
    property: 'gridAutoFlow'
  },
  autoColumns: {
    property: 'gridAutoColumns'
  },
  autoRows: {
    property: 'gridAutoRows'
  },
  templateColumns: {
    property: 'gridTemplateColumns'
  },
  templateRows: {
    property: 'gridTemplateRows'
  },
  templateAreas: {
    property: 'gridTemplateAreas'
  },
  area: {
    property: 'gridArea'
  },
  columnStart: {
    property: 'gridColumnStart'
  },
  columnEnd: {
    property: 'gridColumnEnd'
  },
  rowStart: {
    property: 'gridrowStart'
  },
  rowEnd: {
    property: 'gridrowEnd'
  }
})
const getterColumns = n => `repeat(${n}, 1fr)`

export const columnsProp = style({
  cssProperty: 'grid-template-columns',
  prop: 'columns',
  alias: 'c',
  transformValue: getterColumns
})
