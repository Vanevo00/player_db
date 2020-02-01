import styled from 'styled-components'

export const NavbarContainer = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.menuText};
  border-top: solid 2px ${props => props.theme.colors.mainBackground};
  display: flex;
  align-items: center;
`

export const NavbarItem = styled.div`
  height: 100%;
  padding: 0 1rem;
  border-right: solid 1px ${props => props.theme.colors.mainBackground};
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.mainDarker};
  }
`

export const AdminItem = styled(NavbarItem)`
  padding: 0 4rem 0 1rem;
  cursor: default;
  
  &:hover {
    background-color: ${props => props.theme.colors.main};
  }
`
