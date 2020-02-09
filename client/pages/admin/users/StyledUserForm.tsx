import styled from 'styled-components'
import { GrowContainer } from '../../../components/StyledContainers'

export const GrowContainerGreen = styled(GrowContainer)`
  background-color: ${props => props.theme.colors.mainDarker};
  color: ${props => props.theme.colors.buttonText};
  padding: 2rem;
`

export const FormContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`

export const AvatarImg = styled.img`
  height: 100%;
  width: auto;
  margin-right: 2rem;
`

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledInput = styled.input`
  height: 40px;
  min-width: 300px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: ${props => props.theme.fontSizes.m};
  margin-bottom: 1rem;
`

export const StyledCheckbox = styled.input``
