import React, { Fragment, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { th } from '@xstyled/system'

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
      <Icon mr={4} cursor='pointer' onClick={() => currentPage != 1 && setcurrentPage(currentPage - 1)} icon='chevron-left' />
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
              <ButtonText
                mr={4}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(1)}
              >
                1
              </ButtonText>
              {!showLastDots && (
                <Fragment>
                  <ButtonText mr={4} color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(2)}>
                    {2}
                  </ButtonText>
                  <ButtonText mr={4} color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(3)}>
                    {3}
                  </ButtonText>
                </Fragment>
              )}
              <ButtonText
                mr={4}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(currentPage - prevLength - 1)}
              >
                ...
              </ButtonText>
            </Fragment>
          )}
          {Array.from({ length: prevLength }).map((_, index) => {
            const page = currentPage - (prevLength - index)
            return (
              <ButtonText
                mr={4}
                key={page}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(page)}
              >
                {page}
              </ButtonText>
            )
          })}
          <Button mr={4} width={40} height={40} onClick={() => setcurrentPage(currentPage)}>
            {currentPage}
          </Button>
          {Array.from({ length: nextLength }).map((_, index) => {
            const page = currentPage + index + 1
            return (
              <ButtonText
                mr={4}
                key={page}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(page)}
              >
                {page}
              </ButtonText>
            )
          })}
          {showLastDots && (
            <Fragment>
              <ButtonText
                mr={4}
                color='gray.900'
                width={40}
                height={40}
                variant='text'
                onClick={() => setcurrentPage(currentPage + nextLength + 1)}
              >
                ...
              </ButtonText>
              {!showFirstDots && (
                <Fragment>
                  <ButtonText
                    mr={4}
                    color='gray.900'
                    width={40}
                    height={40}
                    variant='text'
                    onClick={() => setcurrentPage(pageSize - 2)}
                  >
                    {pageSize - 2}
                  </ButtonText>
                  <ButtonText
                    mr={4}
                    color='gray.900'
                    width={40}
                    height={40}
                    variant='text'
                    onClick={() => setcurrentPage(pageSize - 2)}
                  >
                    {pageSize - 1}
                  </ButtonText>
                </Fragment>
              )}
              <ButtonText color='gray.900' width={40} height={40} variant='text' onClick={() => setcurrentPage(pageSize)}>
                {pageSize}
              </ButtonText>
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

const ButtonText = styled(Button)`
  &:hover {
    background-color: rgba(78, 152, 237, 0.15);
  }
`

export default Pagination
