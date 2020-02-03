import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout'
import axios from 'axios'
import {Container, DeleteRowItem, HeaderRow, HeaderRowItem, Row, RowItem, Table} from './StyledAdmin';
import ConfirmDelete from './ConfirmDelete';

const Users = () => {
  const [users, setUsers] = useState([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    fetchUsers()
  }, [selectedUser])

  const fetchUsers = async () => {
    const { data } = await axios.get('http://localhost:4000/api/users')
    setUsers(data)
  }

  const openPopup = (user) => {
    setSelectedUser(user)
    setShowConfirmDelete(true)
  }

  const handlePopupClick = async (answer) => {
    if (answer) {
      try {
        await axios.delete(`http://localhost:4000/api/users/${selectedUser._id}`)

      } catch (err) {
        console.log(err)
      }
    }
    setSelectedUser(null)
    setShowConfirmDelete(false)
  }

  return (
    <>
      <Layout title='Admin/Users'>
        <ConfirmDelete show={showConfirmDelete} user={selectedUser} handlePopupClick={handlePopupClick}/>
        <Container>
          <h2>Users</h2>
          <Table>
            <HeaderRow>
              <HeaderRowItem width={1.5}>Username</HeaderRowItem>
              <HeaderRowItem width={3.5}>Email</HeaderRowItem>
              <HeaderRowItem width={0.5}>Admin</HeaderRowItem>
              <HeaderRowItem width={2}>Created</HeaderRowItem>
              <HeaderRowItem width={0.75}>Edit</HeaderRowItem>
              <HeaderRowItem width={0.25}><i className="fas fa-trash"></i></HeaderRowItem>
            </HeaderRow>
            {
              users.map(user => (
                <Row>
                  <RowItem width={1.5}>{user.username}</RowItem>
                  <RowItem width={3.5}>{user.email}</RowItem>
                  <RowItem width={0.5} center={true}>{user.isAdmin ? <i className="far fa-check-square"/> : <i className="fas fa-times"/>}</RowItem>
                  <RowItem width={2}>{user.created}</RowItem>
                  <RowItem width={0.75} center={true}>Edit</RowItem>
                  <DeleteRowItem width={0.25} center={true} onClick={() => openPopup(user)}><i className="fas fa-trash"></i></DeleteRowItem>
                </Row>
              ))
            }
          </Table>
        </Container>
      </Layout>

    </>
  )
}

export default Users;
