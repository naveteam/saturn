import React, { Fragment, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { Button, Icon } from '..'
import { Flex } from '../Grid'
import TextField from '../TextField'
import Typography from '../Typography'

const PAGES_NUMBER = 3

const MIDDLE = Math.trunc(PAGES_NUMBER / 2)

const Pagination = ({ page = 1, pageSize, onPageChange, onPageSizeChange, variant, ...props }) => {
  const [currentPage, setcurrentPage] = useState(page)

  const getLowerValue = (valueA, valueB) => {
    if (valueA > valueB) {
      return valueB
    }
    return valueA
  }

  const getPages = useCallback(
    state => {
      const prevLength = getLowerValue(MIDDLE, currentPage - 1)
      const nextLength = getLowerValue(MIDDLE, pageSize - currentPage)
      if (state === 'prev') {
        return pageSize > 7 ? getLowerValue(MIDDLE + MIDDLE - nextLength, currentPage - 1) : currentPage - 1
      }

      return pageSize > 7 ? getLowerValue(MIDDLE + MIDDLE - prevLength, pageSize - currentPage) : pageSize - currentPage
    },
    [currentPage, pageSize]
  )

  const prevLength = useMemo(() => getPages('prev'), [getPages])
  const nextLength = useMemo(() => getPages('next'), [getPages])

  const showFirstDots = currentPage > 3 && pageSize > 7
  const showLastDots = currentPage < pageSize - 2 && pageSize > 7

  return (
    <Container justifyContent='center' alignItems='center' {...props}>
      <Icon cursor='pointer' onClick={() => currentPage != 1 && setcurrentPage(currentPage - 1)} icon='chevron-left' />
      {variant ? (
        <Fragment>
          <TextField placeholder={currentPage} width={40} />
          <Typography pl={8}>de</Typography>
          <Typography pl={8}>{pageSize}</Typography>
        </Fragment>
      ) : (
        <Fragment>
          {showFirstDots && (
            <Fragment>
              <Button color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(1)}>
                1
              </Button>
              {!showLastDots && (
                <Fragment>
                  <Button color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(2)}>
                    {2}
                  </Button>
                  <Button color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(3)}>
                    {3}
                  </Button>
                </Fragment>
              )}
              <Button
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(currentPage - prevLength - 1)}
              >
                ...
              </Button>
            </Fragment>
          )}
          {Array.from({ length: prevLength }).map((_, index) => {
            const page = currentPage - (prevLength - index)
            return (
              <Button
                key={page}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(page)}
              >
                {page}
              </Button>
            )
          })}
          <Button width={40} height={40} onClick={() => setcurrentPage(currentPage)}>
            {currentPage}
          </Button>
          {Array.from({ length: nextLength }).map((_, index) => {
            const page = currentPage + index + 1
            return (
              <Button
                key={page}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(page)}
              >
                {page}
              </Button>
            )
          })}
          {showLastDots && (
            <Fragment>
              <Button
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(currentPage + nextLength + 1)}
              >
                ...
              </Button>
              {!showFirstDots && (
                <Fragment>
                  <Button
                    color='gray.900'
                    width={40}
                    height={40}
                    variant='text'
                    onClick={() => setcurrentPage(pageSize - 2)}
                  >
                    {pageSize - 2}
                  </Button>
                  <Button
                    color='gray.900'
                    width={40}
                    height={40}
                    variant='text'
                    onClick={() => setcurrentPage(pageSize - 2)}
                  >
                    {pageSize - 1}
                  </Button>
                </Fragment>
              )}
              <Button color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(pageSize)}>
                {pageSize}
              </Button>
            </Fragment>
          )}
        </Fragment>
      )}

      <Icon
        cursor='pointer'
        icon='chevron-right'
        onClick={() => currentPage != pageSize && setcurrentPage(currentPage + 1)}
      />
    </Container>
  )
}

const Container = styled(Flex)``

export default Pagination
