import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Navbar = props => {
  const { items, right } = props
  const [isShown, setIsShown] = useState(false)

  const handleIcon = () => {
    if (isShown) {
      setIsShown(false)
    } else {
      setIsShown(true)
    }
    console.log('troco')
    console.log(isShown)
  }

  return (
    <Fragment>
      <NavbarContainer>
        <Logo style={{ backgroundColor: '#DDD' }} />
        <ItemsContentDesktop>{right}</ItemsContentDesktop>
        <MenuButton onClick={() => handleIcon()}>
          {isShown ? (
            //With a icon
            <Image />
          ) : (
            //With another icon
            <Image />
          )}
        </MenuButton>
      </NavbarContainer>
      {isShown && <ItemsContentMobile>{right}</ItemsContentMobile>}
    </Fragment>
  )
}

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  padding: 0 2em;
`
const Image = styled.div`
  width: 80%;
  height: 80%;
`
const MenuButton = styled.button`
  border: none;
  outline: none;
  display: none;
  border-radius: 5px;
  width: 2.5em;
  height: 2.5em;
  background-color: #ddd;
  @media only screen and (max-width: 768px) {
    display: block;
  }
  :hover {
    background-color: #f02;
  }
  :active {
    background-color: #cb4;
  }
`
const ItemsContentDesktop = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`
const ItemsContentMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background-color: #eee;
  height: 100vh;
`
const Logo = styled.div`
  width: 20%;
  height: 4em;
`
const Item = styled.a`
  text-transform: uppercase;
  padding: 0.2em 0.4em;
  border-radius: 5px;
  color: #5d5d5d;
  text-decoration: none;
  font-family: 'Roboto';
  margin: 0 1em;
  :visited {
    color: #5d5d5d;
  }
  :hover {
    background-color: #cccccc;
  }
`

export default Navbar
