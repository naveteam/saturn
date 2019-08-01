import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const NavbarMenu = props => {
  const { searchable, menuItems, mode } = props
  const [isShown, setIsShown] = useState(false)
  const [value, setValue] = useState('')

  const handleIcon = () => {
    setIsShown(!isShown)
  }

  return (
    <Fragment>
      <NavbarContainer>
        <LogoContainer>//LOGO</LogoContainer>
        {searchable && (
          <InputContainer>
            <Input
              placeholder='Search'
              onChange={event => {
                setValue(event.target.value)
                searchable(event.target.value)
              }}
              type='text'
            />
            <div style={{ width: 24 }}>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path
                  fill='#7D7D7D'
                  d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
                />
                <path d='M0 0h24v24H0z' fill='none' />
              </svg>
            </div>
          </InputContainer>
        )}
        {mode !== 'allways' && <DesktopMenu>{menuItems}</DesktopMenu>}
        <MenuButton mode={mode} open={isShown} onClick={() => handleIcon()}>
          <span />
          <span />
          <span />
        </MenuButton>
      </NavbarContainer>
      <MobileMenu isShown={isShown}>{menuItems}</MobileMenu>
    </Fragment>
  )
}
const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: ${props => (props.isShown ? 'visible' : 'hidden')};
  opacity: ${props => (props.isShown ? 1 : 0)};
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  height: ${props => (props.isShown ? 'calc(100vh - 60px)' : 0)};
  background-color: #fff;
  transition: all 0.3s linear;
  overflow: hidden;
  box-shadow: 0px 9px 10px -7px rgba(50, 50, 50, 0.2);
`
const NavbarContainer = styled.div`
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 2em;
  height: 60px;
  box-shadow: 0px 9px 10px -7px rgba(50, 50, 50, 0.2);
`
const MenuButton = styled.div`
  ${({ mode }) =>
    mode === 'mobile' &&
    `
  display: none;
  `}
  width: 32px;
  height: 32px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  @media only screen and (max-width: 768px) {
    display: block;
  }
  :hover {
    opacity: 1;
  }
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #7d7d7d;
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }
  span:nth-child(1) {
    top: 0px;
  }
  span:nth-child(2) {
    top: 10px;
  }
  span:nth-child(3) {
    top: 20px;
  }
  ${({ open }) =>
    open &&
    `
      span:nth-child(1){
        top: 10px;
        transform: rotate(135deg);
      }
      span:nth-child(2){
        opacity: 0;
        left: -60px;
      }
      span:nth-child(3){
        top: 10px;
        transform: rotate(-135deg);
      }
    `}
`

const DesktopMenu = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`
const LogoContainer = styled.div`
  margin: 0.8em 1em;
  margin-left: 0;
  border-radius: 10px;
  width: 20%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputContainer = styled.div`
  padding: 0.2em;
  border-style: solid;
  border-color: #7f7f7f;
  border-radius: 5px;
  border-width: 1px;
  height: 1.5em;
  width: 35%;
  background-color: #fff;
  display: flex;
`
const Input = styled.input`
  color: #7f7f7f;
  width: 100%;
  font-family: 'Roboto';
  background-color: #fff;
  border-width: 0;
  outline: none;
`
NavbarMenu.defaultProps = {
  mode: 'mobile'
}

NavbarMenu.propTypes = {
  /** Every element passed in this property will be shown to the right of the navbar */
  right: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  /** Treatment for what was entered in the search field */
  searchable: PropTypes.func,
  //** To choose when the hamburger button will appear */
  mode: PropTypes.string
}
