import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from '@xstyled/styled-components'
import { th, up, down } from '@xstyled/system'

import { Flex, Typography } from '../'

const Breadcrumb = ({ path, variant, ...props }) => {
  const lastPage = useMemo(() => (path.length > 1 ? path[path?.length - 2] : path[0]), [path])

  const isNotLastElement = useCallback(index => path.length - 1 !== index, [path])

  const CondensedBreadcrumb = useMemo(
    () => (
      <Flex alignItems='center' {...props}>
        <Icon fontSize={3} lineHeight={3} mr={8} color='gray.800'>
          ‹
        </Icon>
        <Link fowardedAs='a' fontSize={3} lineHeight={3} href={lastPage?.link} {...props}>
          {lastPage?.label}
        </Link>
      </Flex>
    ),
    [path, variant]
  )

  const ExpandedBreadcrumb = useMemo(
    () => (
      <Flex {...props}>
        {path.map(({ label, link }, index) => (
          <Flex key={index} alignItems='center'>
            <Link
              fowardedAs='a'
              fontSize={3}
              lineHeight={3}
              {...(isNotLastElement(index) && { href: link })}
              {...props}
            >
              {label}
            </Link>
            {isNotLastElement(index) && (
              <Icon fontSize={3} lineHeight={3} mx={8} color='gray.800'>
                ›
              </Icon>
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

const Link = styled(Typography)`
  cursor: pointer;
  color: ${({ color }) => th.color(color)};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  :visited {
    color: inherit;
  }

  :active {
    color: inherit;
  }

  :only-child {
    &:last-child {
      cursor: default;
      color: gray.800;
      :hover {
        text-decoration: none;
      }
    }
  }
`

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
