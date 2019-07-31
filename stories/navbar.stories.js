import React from 'react'
import { storiesOf } from '@storybook/react'


import { Navbar, NavItem } from '../src'

const data = [
  {title: 'link1', ref: 'www.lul.com'},
  {title: 'link1', ref: 'www.lul.com'},
  {title: 'link1', ref: 'www.lul.com'},
  {title: 'link1', ref: 'www.lul.com'}
]

storiesOf('Navbar', module)
  .add('simple', () => {
    return (
      <React.Fragment>
        <Navbar
          right={data.map((item,index) =>
            <NavItem key={index} href={item.ref}>{`${item.title}${index}`}</NavItem>
          )}
        />
      </React.Fragment>
    )
  })
  .add('Navbar with search', () => {
    return (
      <React.Fragment>
        <Navbar
          searchable={true}
          handleSearchChange={() => {}}
          right={data.map((item,index) =>
            <NavItem key={index} href={item.ref}>{`${item.title}${index}`}</NavItem>
          )}
        />
      </React.Fragment>
    )
  })
  .add('NavItem', () => {
    return (
      <React.Fragment>
        <NavItem href='/'>Link</NavItem>
      </React.Fragment>
    )
  })
