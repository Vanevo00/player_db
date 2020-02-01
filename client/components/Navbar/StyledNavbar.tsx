import styled from 'styled-components'
import {RedButton} from '../StyledButtons';

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

export const DarkenBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.black};
  opacity: 0.7;
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`

export const LogoutConfirmContainer = styled.div`
  width: 300px;
  height: 100px;
  background-color: ${props => props.theme.colors.mainBackground};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ConfirmText = styled.p`
  color: ${props => props.theme.colors.formText};
  margin-bottom: 5px;
`

export const RedButtonMarginRight = styled(RedButton)`
  margin-right: 5px;
`
