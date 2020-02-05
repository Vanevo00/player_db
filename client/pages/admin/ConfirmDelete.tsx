import React from 'react'
import { DarkenBackground, PopupContainer } from '../../components/StyledContainers'
import { Button, RedButtonMarginRight } from '../../components/StyledButtons'

interface Props {
  show: boolean
  user?: {
    username: string
  }
  handlePopupClick: (answer) => void
}

const ConfirmDelete = ({ show, user, handlePopupClick }: Props) => {
  return (
    <DarkenBackground show={show}>
      <PopupContainer>
        <div>
        Are you sure you want to delete {user && user.username}?

          <RedButtonMarginRight onClick={() => handlePopupClick(true)}>Yes</RedButtonMarginRight>
          <Button onClick={() => handlePopupClick(false)}>No</Button>
        </div>
      </PopupContainer>
    </DarkenBackground>
  )
}

export default ConfirmDelete
