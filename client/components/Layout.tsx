import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from './ThemeProvider'
import { MainContainer } from './StyledContainers'
import setAuthToken from '../pages/user/setAuthToken'
import axios from 'axios'
import AdminNavbar from './AdminNavbar'

const Layout = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState()

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const data = await axios.get('http://localhost:4000/api/auth')

      setIsAuthenticated(true)
      setUser(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['x-auth-token']
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Fragment>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
        <title>{`Football Player DB${props.title && ': ' + props.title}`}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <MainContainer>
          <Navbar isAuthenticated={isAuthenticated} user={user} handleLogout={handleLogout}/>
          {user && user.isAdmin && <AdminNavbar/>}
          {props.children}
        </MainContainer>
      </ThemeProvider>
    </Fragment>
  )
}

export default Layout
