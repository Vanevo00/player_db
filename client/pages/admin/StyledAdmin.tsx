import styled from 'styled-components'
import { GrowContainer } from '../../components/StyledContainers'

export const Container = styled(GrowContainer)`
  padding: 1rem 3rem;
`

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.main};
`

export const Row = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.main};
  min-height: 30px;
`

export const HeaderRow = styled(Row)`
  background-color: ${props => props.theme.colors.main};
  border-bottom: 1px solid ${props => props.theme.colors.formBackground};
  color: ${props => props.theme.colors.buttonText};
`

export const RowItem = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  padding-left: ${props => !props.center && '4px'};
  align-items: center;
  width: ${props => props.width * 10}%;
  border-right: 1px solid ${props => props.theme.colors.main};
`

export const HeaderRowItem = styled(RowItem)`
  justify-content: center;
`

export const DeleteRowItem = styled(RowItem)`
  cursor: pointer;
  background-color: ${props => props.theme.colors.danger};
  color: ${props => props.theme.colors.buttonText};
  
  &:hover {
    background-color: ${props => props.theme.colors.dangerLighter};
  }
`

export const EditRowItem = styled(RowItem)`
  cursor: pointer;
  transition: .3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.buttonText};
  }
`
