import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
            <Link {...(isNotLastElement(index) && { href: link })} {...props}>
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

const Link = styled.a(
  ({ theme: { colors } }) => `
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  font-family: 'Open Sans';
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
      color: ${colors.gray['800']};
      :hover {
        text-decoration: none;
      }
    }
  }
  `
)

const Icon = styled(Typography)`
  cursor: default;
`

const DesktopContainer = styled(Flex)`
  @media (max-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`

const MobileContainer = styled(Flex)`
  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`

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
