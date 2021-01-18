import React, { Fragment, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from '@xstyled/styled-components'
import { up, down } from '@xstyled/system'

import { Flex, Typography } from '../'
import Paragraph from '../Typography'
import { Link } from '../Link'

const Breadcrumb = ({ path, variant, ...props }) => {
  const lastPage = useMemo(() => (path.length > 1 ? path[path?.length - 2] : path[0]), [path])

  const isNotLastElement = useCallback(index => path.length - 1 !== index, [path])

  const CondensedBreadcrumb = useMemo(
    () => (
      <Flex alignItems='center' {...props}>
        <Icon fontSize={3} lineHeight={3} mr={8} color='gray.800'>
          ‹
        </Icon>
        <Link to={lastPage?.link}>{lastPage?.label}</Link>
      </Flex>
    ),
    [path, variant]
  )

  const ExpandedBreadcrumb = useMemo(
    () => (
      <Flex {...props}>
        {path.map(({ label, link }, index) => (
          <Flex key={index} alignItems='center'>
            {isNotLastElement(index) ? (
              <Fragment>
                <Link to={link} {...props}>
                  {label}
                </Link>
                <Icon fontSize={3} lineHeight={3} mx={8} color='gray.800'>
                  ›
                </Icon>
              </Fragment>
            ) : (
              <Paragraph color='gray.800'>{label}</Paragraph>
            )}
          </Flex>
        ))}
      </Flex>
    ),
    [path, variant]
  )

  if (variant === 'condensed') return CondensedBreadcrumb

  if (variant === 'expanded') return ExpandedBreadcrumb

  return (
    <>
      <DesktopContainer>{ExpandedBreadcrumb}</DesktopContainer>
      <MobileContainer>{CondensedBreadcrumb}</MobileContainer>
    </>
  )
}

const Icon = styled(Typography)`
  cursor: default;
`

const DesktopContainer = styled(Flex)(
  down(
    'md',
    css`
      display: none;
    `
  )
)

const MobileContainer = styled(Flex)(
  up(
    'md',
    css`
      display: none;
    `
  )
)

Breadcrumb.defaultProps = {
  color: 'blue.400',
  variant: 'responsive'
}

Breadcrumb.propTypes = {
  path: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, link: PropTypes.string })).isRequired,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['responsive', 'expanded', 'condensed'])
}

export default Breadcrumb
