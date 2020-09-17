import React, { Fragment, useCallback, useMemo, useEffect, useRef, useState } from 'react'
import { useDebounce } from '@naveteam/prometheus'
import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Button, Icon } from '..'
import { Flex as Container } from '../Grid'
import Typography from '../Typography'

const getLowerValue = (valueA, valueB) => {
  if (valueA > valueB) {
    return valueB
  }
  return valueA
}

const Pagination = ({
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  minPagesToShowDots,
  pagesShownedBetweenDots,
  variant,
  ...props
}) => {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState(page)
  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    variant === 'input' && (inputRef.current.value = page)
  }, [page])

  useEffect(() => {
    debouncedValue <= pageSize && debouncedValue > 0 ? setPage(debouncedValue) : setPage(page)
  }, [debouncedValue])

  const setPage = useCallback(pageNumber => {
    onPageChange && onPageChange(pageNumber)
  }, [])

  const showPagesInMiddle = direction => {
    return direction === 'before'
      ? Array.from({ length: prevLength }).map((_, index) => {
          const pagesBefore = page - (prevLength - index)
          return (
            <ButtonPage key={pagesBefore} hover variant='text' onClick={() => setPage(pagesBefore)}>
              {pagesBefore}
            </ButtonPage>
          )
        })
      : Array.from({ length: nextLength }).map((_, index) => {
          const pagesAfter = page + index + 1
          return (
            <ButtonPage key={pagesAfter} hover variant='text' onClick={() => setPage(pagesAfter)}>
              {pagesAfter}
            </ButtonPage>
          )
        })
  }

  const getPages = useCallback(
    state => {
      const prevLength = getLowerValue(MIDDLE, page - 1)
      const nextLength = getLowerValue(MIDDLE, pageSize - page)
      if (state === 'prev') {
        return pageSize > minPagesToShowDots ? getLowerValue(MIDDLE + MIDDLE - nextLength, page - 1) : page - 1
      }

      return pageSize > minPagesToShowDots
        ? getLowerValue(MIDDLE + MIDDLE - prevLength, pageSize - page)
        : pageSize - page
    },
    [page, pageSize]
  )

  const MIDDLE = useMemo(() => Math.trunc(pagesShownedBetweenDots / 2), [pagesShownedBetweenDots])
  const prevLength = useMemo(() => getPages('prev'), [getPages])
  const nextLength = useMemo(() => getPages('next'), [getPages])

  const showFirstDots = page > 3 && pageSize > minPagesToShowDots
  const showLastDots = page < pageSize - 2 && pageSize > minPagesToShowDots

  return (
    <Container {...props}>
      <Icon
        mr={2}
        color='gray.800'
        cursor='pointer'
        onClick={() => page != 1 && setPage(page - 1)}
        icon='chevron-left'
      />
      {variant === 'input' ? (
        <Fragment>
          <Input ref={inputRef} onChange={() => setInputValue(Number(inputRef.current.value))} />
          <Typography ml={3} color='gray.800'>
            de
          </Typography>
          <Typography ml={2} mr={2} color='gray.800'>
            {pageSize}
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          {showFirstDots && (
            <Fragment>
              <ButtonPage variant='text' hover onClick={() => setPage(1)}>
                1
              </ButtonPage>
              {!showLastDots && (
                <Fragment>
                  <ButtonPage variant='text' hover onClick={() => setPage(2)}>
                    2
                  </ButtonPage>
                  <ButtonPage variant='text' hover onClick={() => setPage(3)}>
                    3
                  </ButtonPage>
                </Fragment>
              )}
              <ButtonPage variant='text' hover onClick={() => setPage(page - prevLength - 1)}>
                ...
              </ButtonPage>
            </Fragment>
          )}
          {showPagesInMiddle('before')}
          <ButtonPage selected onClick={() => setPage(page)}>
            {page}
          </ButtonPage>
          {showPagesInMiddle('after')}
          {showLastDots && (
            <Fragment>
              <ButtonPage variant='text' hover onClick={() => setPage(page + nextLength + 1)}>
                ...
              </ButtonPage>
              {!showFirstDots && (
                <Fragment>
                  <ButtonPage variant='text' hover onClick={() => setPage(pageSize - 2)}>
                    {pageSize - 2}
                  </ButtonPage>
                  <ButtonPage variant='text' hover onClick={() => setPage(pageSize - 1)}>
                    {pageSize - 1}
                  </ButtonPage>
                </Fragment>
              )}
              <ButtonPage variant='text' hover onClick={() => setPage(pageSize)}>
                {pageSize}
              </ButtonPage>
            </Fragment>
          )}
        </Fragment>
      )}

      <Icon
        color='gray.800'
        cursor='pointer'
        icon='chevron-right'
        onClick={() => page != pageSize && setPage(page + 1)}
      />
    </Container>
  )
}

const Input = styled.input`
  width: 28px;
  height: 20px;
  font-size: ${th.fontSize(1)};
  font-family: 'Open Sans';
  padding: 1px;
  text-align: center;
  border: 1px solid ${th.color('gray.600')};
  border-radius: 2px;
  &:focus {
    outline: none;
    border-color: ${th.color('blue.50')};
    border-width: 2px;
    padding: 0;
  }
`

const ButtonPage = styled(Button)`
  margin-right: 2px;
  width: 24px;
  height: 24px;
  min-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${th.color('gray.900')};

  p {
    font-size: ${th.fontSize(1)};
    line-height: ${th.lineHeight(1)};
  }

  ${props =>
    props.selected &&
    css`
      color: white;
    `}

  ${props =>
    props.hover &&
    css`
      &:hover {
        background-color: rgba(78, 152, 237, 0.15);
      }
    `}
`
Pagination.defaultProps = {
  page: 1,
  minPagesToShowDots: 7,
  pagesShownedBetweenDots: 3
}

Pagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  minPagesToShowDots: PropTypes.number,
  pagesShownedBetweenDots: PropTypes.number
}

export default Pagination
