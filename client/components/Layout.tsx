import React, { Fragment } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from './ThemeProvider'
import { MainContainer } from './StyledContainers'

const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
        <title>{`Football Player DB${props.title && ': ' + props.title}`}</title>
      </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <MainContainer>
            <Navbar/>
            {props.children}
          </MainContainer>
        </ThemeProvider>
    </Fragment>
  )
}

export default Layout
