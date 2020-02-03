import styled from 'styled-components'
import { RedButton } from '../StyledButtons'

export const NavbarContainer = styled.div`
  height: 60px;
  width: 100%;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.menuText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`

export const LogoContainer = styled.div`
  cursor: pointer;
`

export const LogoText = styled.h2``

export const SearchContainer = styled.div``

export const LinkContainer = styled.div``

export const LinkText = styled.a`
  padding: 1rem;
  height: 100%;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.mainDarker};
  }
`

export const ConfirmText = styled.p`
  color: ${props => props.theme.colors.mainText};
  margin-bottom: 5px;
`
