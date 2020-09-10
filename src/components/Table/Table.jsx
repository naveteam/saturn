import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import PropTypes from 'prop-types'

const typeVariant = variant({
  prop: 'type',
  default: 'regular',
  variants: {
    regular: css`
      box-shadow: 0px 2px 4px rgba(33, 33, 33, 0.2);
    `,
    quiet: css`
      border: 0;
    `
  }
})

const Table = styled.table`
  ${typeVariant}
  border-radius: 4px;
  background: white;

  min-width: 328px;
  max-width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  td:first-of-type,
  th:first-of-type {
    p label {
      margin-right: 11px;
    }
    p span {
      margin-right: 8px;
    }
  }

  tr:hover {
    background-color: ${th.color('gray.100')};
  }

  td:last-child {
    p {
      text-align: center;
      border-radius: 2;
      padding: 4px;
      background: ${th.color('blue.400')};
      color: ${th.color('white')};
    }
  }
`
Table.defaultProps = {
  type: 'regular'
}

Table.propTypes = {
  type: PropTypes.oneOf(['regular', 'quiet'])
}

export default Table
