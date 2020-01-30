import styled from 'styled-components'
import { GrowContainer } from '../../components/StyledContainers'

export const UserContainer = styled(GrowContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InputContainer = styled.div`
  margin: 1rem 0;
`

export const StyledLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 700;
`

export const StyledTextInput = styled.input`
  width: 100%;
  font-size: ${props => props.theme.fontSizes.s};
  padding: .3rem;
  border-radius: 4px;
  border: solid 1px ${props => props.theme.colors.formBorder};
  
  &:focus {
    border-color: ${props => props.theme.colors.main};
    box-shadow: 0 0 3px 2px rgba(0,112,12,.5);
  }
`

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.s};
  margin: 0;
`
