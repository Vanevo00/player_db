import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.mainText}
  }
  
  h1, h2, h3 {
    margin: 0;
  }
  
  input:focus {
    outline: none;
  }
`

export default GlobalStyle
