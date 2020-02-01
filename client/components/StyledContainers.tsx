import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const GrowContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.mainBackground};
`

export const FormContainer = styled.div`
  border: solid 2px ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.mainText};
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 400px;
`
