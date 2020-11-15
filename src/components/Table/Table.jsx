import React, { useRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { th, variant } from '@xstyled/system'
import PropTypes from 'prop-types'

const Table = ({ type, ...props }) => {
  const overflowRef = useRef()

  const children = React.Children.map(props.children, child => {
    return React.cloneElement(child, { overflowRef });
  })

  return (
    <OverflowWrapper ref={overflowRef}>
      <Container type={type} {...props}>
        {children}
      </Container>
    </OverflowWrapper>
  )
}

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


const OverflowWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
  position: relative;
`

const Container = styled.table`
  ${typeVariant}
  border-radius: 4;
  background: ${th.color('white')};

  min-width: 328px;
  max-width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  td:first-of-type,
  th:first-of-type {
    display: flex;
    label {
      margin-right: 12px;
    }
    span {
      margin-right: 8px;
    }
  }

  td {
    align-items: center;
  }
`

Table.defaultProps = {
  type: 'regular'
}

Table.propTypes = {
  type: PropTypes.oneOf(['regular', 'quiet'])
}

export default Table
