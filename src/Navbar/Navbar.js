import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Navbar = props => {
  const { searchable, right, imageNavbar } = props
  const [value, setValue] = useState('')

  return (
    <Fragment>
      <NavbarContainer>
        <LogoContainer>{imageNavbar ? <Logo src={imageNavbar} /> : <p>LOGO</p>}</LogoContainer>
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
        {right}
      </NavbarContainer>
    </Fragment>
  )
}

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
const Logo = styled.img`
  max-height: 100%;
  max-width: 100%;
`
const InputContainer = styled.div`
  padding: 0.2em;
  border-style: solid;
  border-color: #7f7f7f;
  border-radius: 5px;
  border-width: 1px;
  height: 1.5em;
  width: 20%;
  background-color: #fff;
  transition: width 0.5s;
  display: flex;
  ${Input}:focus-within {
    width: 35%;
  }
`
const Input = styled.input`
  color: #7f7f7f;
  width: 100%;
  font-family: 'Roboto';
  background-color: #fff;
  border-width: 0;
  outline: none;
`

Navbar.propTypes = {
  /** Every element passed in this property will be shown to the right of the navbar */
  right: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  /** Treatment for what was entered in the search field */
  searchable: PropTypes.func,
  /** Image path */
  imageNavbar: PropTypes.string
}
export default Navbar
