import React from 'react'
import { storiesOf } from '@storybook/react'


import { Navbar, NavItem, NavbarMenu } from '../src'
import { FileText } from 'react-feather'

const data = [
  {title: 'link1', ref: 'www.lul.com'},
  {title: 'link1', ref: 'www.lul.com'},
  {title: 'link1', ref: 'www.lul.com'},
  {title: 'link1', ref: 'www.lul.com'}
]

storiesOf('Navbar', module)
  .add('Navbar base', () => {
    return (
      <Navbar/>
    )
  })
  .add('Navbar with menu', () => {
    return(
      <NavbarMenu
        mode='mobile'
        menuItems={data.map((item, index) => (
          <NavItem key={index} href={item.ref}>{item.title}</NavItem>
        ))}
      />
    )
  })
  .add('Navbar with search', () => {
    return (
      <Navbar
        searchable={() => {}}
      />
    )
  })
  .add('Navbar with account', () => {
    return (
      <Navbar
        handleNotification={() => {}}
        right={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'/></svg>
            <div style={{marginLeft: '1em',height: '30px', width: '30px', borderRadius: '50%', backgroundColor: '#0f0'}} />
          </div>}
      />
    )
  })
  .add('NavItem', () => {
    return (
      <NavItem href='/'>Link</NavItem>
    )
  })
