import React, { Fragment, useCallback, useMemo, useEffect } from 'react'
import styled from 'styled-components'
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
  useEffect(() => {
    variant && (document.getElementById('page').value = page)
  }, [page])

  const onChangePageInput = () => {
    setTimeout(
      () =>
        Number(document.getElementById('page').value) <= pageSize
          ? setPage(Number(document.getElementById('page').value))
          : setPage(page),
      700
    )
  }

  const setPage = useCallback(pageNumber => {
    onPageChange && onPageChange(pageNumber)
  }, [])

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
      {variant ? (
        <Fragment>
          <Input id='page' onChange={onChangePageInput} />
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
              <ButtonNotSelected
                mr={2}
                color='gray.900'
                width={24}
                height={24}
                minHeight={24}
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                onClick={() => setPage(1)}
              >
                1
              </ButtonNotSelected>
              {!showLastDots && (
                <Fragment>
                  <ButtonNotSelected
                    mr={2}
                    color='gray.900'
                    width={24}
                    height={24}
                    minHeight={24}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    variant='text'
                    onClick={() => setPage(2)}
                  >
                    {2}
                  </ButtonNotSelected>
                  <ButtonNotSelected
                    mr={2}
                    color='gray.900'
                    width={24}
                    height={24}
                    minHeight={24}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    variant='text'
                    onClick={() => setPage(3)}
                  >
                    {3}
                  </ButtonNotSelected>
                </Fragment>
              )}
              <ButtonNotSelected
                mr={2}
                color='gray.900'
                width={24}
                height={24}
                minHeight={24}
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                onClick={() => setPage(page - prevLength - 1)}
              >
                ...
              </ButtonNotSelected>
            </Fragment>
          )}
          {Array.from({ length: prevLength }).map((_, index) => {
            const pagesBefore = page - (prevLength - index)
            return (
              <ButtonNotSelected
                mr={2}
                key={pagesBefore}
                color='gray.900'
                width={24}
                height={24}
                minHeight={24}
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                onClick={() => setPage(pagesBefore)}
              >
                {pagesBefore}
              </ButtonNotSelected>
            )
          })}
          <ButtonSelected
            mr={2}
            width={24}
            height={24}
            minHeight={24}
            display='flex'
            justifyContent='center'
            alignItems='center'
            onClick={() => setPage(page)}
          >
            {page}
          </ButtonSelected>
          {Array.from({ length: nextLength }).map((_, index) => {
            const pagesAfter = page + index + 1
            return (
              <ButtonNotSelected
                mr={2}
                key={pagesAfter}
                color='gray.900'
                width={24}
                height={24}
                minHeight={24}
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                onClick={() => setPage(pagesAfter)}
              >
                {pagesAfter}
              </ButtonNotSelected>
            )
          })}
          {showLastDots && (
            <Fragment>
              <ButtonNotSelected
                mr={2}
                color='gray.900'
                width={24}
                height={24}
                minHeight={24}
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                onClick={() => setPage(page + nextLength + 1)}
              >
                ...
              </ButtonNotSelected>
              {!showFirstDots && (
                <Fragment>
                  <ButtonNotSelected
                    mr={2}
                    color='gray.900'
                    width={24}
                    height={24}
                    minHeight={24}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    variant='text'
                    onClick={() => setPage(pageSize - 2)}
                  >
                    {pageSize - 2}
                  </ButtonNotSelected>
                  <ButtonNotSelected
                    mr={2}
                    color='gray.900'
                    width={24}
                    height={24}
                    minHeight={24}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    variant='text'
                    onClick={() => setPage(pageSize - 2)}
                  >
                    {pageSize - 1}
                  </ButtonNotSelected>
                </Fragment>
              )}
              <ButtonNotSelected
                color='gray.900'
                width={24}
                height={24}
                minHeight={24}
                display='flex'
                justifyContent='center'
                alignItems='center'
                variant='text'
                onClick={() => setPage(pageSize)}
              >
                {pageSize}
              </ButtonNotSelected>
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

const ButtonSelected = styled(Button)`
  p {
    font-size: ${th.fontSize(1)};
  }
`

const ButtonNotSelected = styled(Button)`
  p {
    font-size: ${th.fontSize(1)};
  }

  &:hover {
    background-color: rgba(78, 152, 237, 0.15);
  }
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
