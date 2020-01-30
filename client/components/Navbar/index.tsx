import React from 'react'
import Link from 'next/link'
import { LinkContainer, LinkText, LogoContainer, LogoText, NavbarContainer, SearchContainer } from './StyledNavbar'

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link href='/'>
        <LogoContainer>
          <LogoText>Player DB</LogoText>
        </LogoContainer>
      </Link>
      <SearchContainer>
        <LogoText>Search</LogoText>
      </SearchContainer>
      <LinkContainer>
        <LinkText>Clubs</LinkText>
        <LinkText>Players</LinkText>
        <LinkText>Login</LinkText>
        <Link href='/user/register'>
          <LinkText>Register</LinkText>
        </Link>
      </LinkContainer>
    </NavbarContainer>
  )
}

export default Navbar
