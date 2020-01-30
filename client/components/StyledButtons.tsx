import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.theme.colors.main};
  border-radius: 4px;
  border: none;
  height: 2rem;
  font-size: ${props => props.theme.fontSizes.m};
  color: ${props => props.theme.colors.mainText};
`

export const WideButton = styled(Button)`
  width: 100%;
`
