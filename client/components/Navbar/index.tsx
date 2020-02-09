import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {
  LinkContainer,
  LinkText,
  LogoContainer,
  LogoText,
  NavbarContainer,
  SearchContainer, ConfirmText
} from './StyledNavbar'
import { Button, RedButtonMarginRight } from '../StyledButtons'
import { DarkenBackground, PopupContainer } from '../StyledContainers'

interface Props {
  isAuthenticated: boolean
  user: {
    isAdmin: boolean
    createdAt: string
    _id: string
    username: string
    email: string
  }
  handleLogout: () => void
}

const Navbar = ({ isAuthenticated, user, handleLogout }: Props) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const logoutClick = () => {
    handleLogout()
    setShowLogoutConfirm(false)
    Router.push('/')
  }

  return (
    <>
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
          {
            isAuthenticated
              ? <>
                {user &&
                  <>
                    <LinkText>{user.username}</LinkText>
                    <LinkText onClick={() => setShowLogoutConfirm(true)}>Logout</LinkText>
                  </>
                }
              </>
              : <>
                <Link href='/user/login'>
                  <LinkText>Login</LinkText>
                </Link>
                <Link href='/user/register'>
                  <LinkText>Register</LinkText>
                </Link>
              </>

          }
        </LinkContainer>
      </NavbarContainer>
      <DarkenBackground show={showLogoutConfirm}>
        <PopupContainer>
          <div>
            <ConfirmText>Are you sure you want to log out?</ConfirmText>
            <RedButtonMarginRight onClick={logoutClick}>Yes</RedButtonMarginRight>
            <Button onClick={() => setShowLogoutConfirm(false)}>No</Button>
          </div>
        </PopupContainer>
      </DarkenBackground>
    </>
  )
}

export default Navbar
