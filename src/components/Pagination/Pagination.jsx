import React, { Fragment, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button, Icon } from '..'
import { Flex } from '../Grid'
import TextField from '../TextField'
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
    <Container justifyContent='center' alignItems='center' {...props}>
      <Icon mr={4} cursor='pointer' onClick={() => page != 1 && setPage(page - 1)} icon='chevron-left' />
      {variant ? (
        <Fragment>
          <TextField placeholder={page} width={40} />
          <Typography pl={8}>de</Typography>
          <Typography pl={8}>{pageSize}</Typography>
        </Fragment>
      ) : (
        <Fragment>
          {showFirstDots && (
            <Fragment>
              <ButtonText
                mr={4}
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
              </ButtonText>
              {!showLastDots && (
                <Fragment>
                  <ButtonText
                    mr={4}
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
                  </ButtonText>
                  <ButtonText
                    mr={4}
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
                  </ButtonText>
                </Fragment>
              )}
              <ButtonText
                mr={4}
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
              </ButtonText>
            </Fragment>
          )}
          {Array.from({ length: prevLength }).map((_, index) => {
            const pagesBefore = page - (prevLength - index)
            return (
              <ButtonText
                mr={4}
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
              </ButtonText>
            )
          })}
          <Button
            mr={4}
            width={24}
            height={24}
            minHeight={24}
            display='flex'
            justifyContent='center'
            alignItems='center'
            onClick={() => setPage(page)}
          >
            {page}
          </Button>
          {Array.from({ length: nextLength }).map((_, index) => {
            const pagesAfter = page + index + 1
            return (
              <ButtonText
                mr={4}
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
              </ButtonText>
            )
          })}
          {showLastDots && (
            <Fragment>
              <ButtonText
                mr={4}
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
              </ButtonText>
              {!showFirstDots && (
                <Fragment>
                  <ButtonText
                    mr={4}
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
                  </ButtonText>
                  <ButtonText
                    mr={4}
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
                  </ButtonText>
                </Fragment>
              )}
              <ButtonText
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
              </ButtonText>
            </Fragment>
          )}
        </Fragment>
      )}

      <Icon cursor='pointer' icon='chevron-right' onClick={() => page != pageSize && setPage(page + 1)} />
    </Container>
  )
}

const Container = styled(Flex)``

const ButtonText = styled(Button)`
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
