import React from 'react'
import { renderWithTheme } from '../../helpers/testTheme'

import Navbar from './Navbar'
import { NavbarMenu, NavItem } from './'

describe('Navbar', () => {
  it('render without ´right´ prop', () => {
    const { container } = renderWithTheme(<Navbar />)
    expect(container).toMatchSnapshot()
  })

  it('render with `right` prop', () => {
    const { container } = renderWithTheme(<Navbar right={<p>test</p>} />)
    expect(container).toMatchSnapshot()
  })
  it('render with `searchable` prop', () => {
    const { container } = renderWithTheme(<Navbar searchable={() => {}} />)
    expect(container).toMatchSnapshot()
  })
  it('render with `searchable` and `right`', () => {
    const { container } = renderWithTheme(<Navbar right={<p>test</p>} searchable={() => {}} />)
    expect(container).toMatchSnapshot()
  })
})

describe('NavbarMenu', () => {
  it('render without ´right´ prop', () => {
    const { container } = renderWithTheme(<NavbarMenu />)
    expect(container).toMatchSnapshot()
  })

  it('render with `right` prop', () => {
    const { container } = renderWithTheme(<NavbarMenu right={<p>test</p>} />)
    expect(container).toMatchSnapshot()
  })
  it('render with `searchable` prop', () => {
    const { container } = renderWithTheme(<NavbarMenu searchable={() => {}} />)
    expect(container).toMatchSnapshot()
  })
  it('render with `searchable` and `right`', () => {
    const { container } = renderWithTheme(<NavbarMenu right={<p>test</p>} searchable={() => {}} />)
    expect(container).toMatchSnapshot()
  })
  it('render with `searchable` and `menuItems`', () => {
    const { container } = renderWithTheme(
      <Navbar
        searchable={() => {}}
        menuItems={
          <>
            <NavItem>TEST01</NavItem>
            <NavItem>TEST01</NavItem>
            <NavItem>TEST01</NavItem>
            <NavItem>TEST01</NavItem>
          </>
        }
      ></Navbar>
    )
    expect(container).toMatchSnapshot()
  })
  it('render with `searchable`, `right` and `menuItems`', () => {
    const { container } = renderWithTheme(
      <Navbar
        right={<p>test</p>}
        searchable={() => {}}
        menuItems={
          <>
            <NavItem>TEST01</NavItem>
            <NavItem>TEST01</NavItem>
            <NavItem>TEST01</NavItem>
            <NavItem>TEST01</NavItem>
          </>
        }
      ></Navbar>
    )
    expect(container).toMatchSnapshot()
  })
})
