import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from '@xstyled/styled-components'
import { typography, th, up, down } from '@xstyled/system'

import { Flex, Icon } from '../'

const Breadcrumb = ({ path, variant, ...props }) => {
  const lastPage = useMemo(() => (path.length > 1 ? path[path?.length - 2] : path[0]), [path])

  const CondensedBreadcrumb = useMemo(
    () => (
      <Flex {...props}>
        <Icon icon='chevron_left' color='gray.800' />
        <Link href={lastPage?.link} {...props}>
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
          <Flex key={index}>
            <Link {...(path.length - 1 !== index && { href: link })} {...props}>
              {label}
            </Link>
            {path.length - 1 !== index && <Icon icon='chevron_right' />}
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

const Link = styled.a`
  font-size: 16px;
  line-height: 24px;
  font-family: 'Open Sans', sans-serif;
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
      color: ${th.color('gray.800')};
      :hover {
        text-decoration: none;
      }
    }
  }
  ${typography};
`

const DesktopContainer = styled(Flex)(
  down(
    'sm',
    css`
      display: none;
    `
  )
)

const MobileContainer = styled(Flex)(
  up(
    'sm',
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
