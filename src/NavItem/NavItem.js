import styled from 'styled-components'

const NavItem = styled.a`
  text-transform: uppercase;
  padding: 0.2em 0.4em;
  border-radius: 5px;
  color: #5d5d5d;
  text-decoration: none;
  font-family: 'Roboto';
  margin: 0 1em;
  opacity: 0.8;
  transition: 0.4s;
  &:visited {
    color: #5d5d5d;
  }
  &:hover {
    opacity: 1;
  }
`

export default NavItem
