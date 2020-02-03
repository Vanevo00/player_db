import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.theme.colors.main};
  border-radius: 4px;
  border: none;
  height: 2rem;
  font-size: ${props => props.theme.fontSizes.m};
  color: ${props => props.theme.colors.buttonText};
  
  &:hover {
    background-color: ${props => props.theme.colors.mainLighter};
  }
`

export const RedButton = styled(Button)`
  background-color: ${props => props.theme.colors.danger};
  
  &:hover {
    background-color: ${props => props.theme.colors.dangerLighter};
  }
`

export const RedButtonMarginRight = styled(RedButton)`
  margin-right: 5px;
`

export const WideButton = styled(Button)`
  width: 100%;
`
