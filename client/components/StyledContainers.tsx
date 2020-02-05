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

export const DarkenBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.black};
  opacity: 0.7;
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 20;
`

export const PopupContainer = styled.div`
  width: 300px;
  height: 100px;
  background-color: ${props => props.theme.colors.mainBackground};
  border-radius: 8px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`
