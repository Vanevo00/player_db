import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { Container, DeleteRowItem, EditRowItem, HeaderRow, HeaderRowItem, Row, RowItem, Table } from '../StyledAdmin'
import ConfirmDelete from '../ConfirmDelete'
import formatDate from '../../../utils/formatDate'
import Spinner from '../../../components/Utilities/Spinner';
import {FloatingAddButton} from '../../../components/StyledButtons';

const Users = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    fetchUsers()
  }, [selectedUser])

  const fetchUsers = async () => {
    setIsLoading(true)
    const { data } = await axios.get('http://localhost:4000/api/users')
    setIsLoading(false)
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
      <Layout title='Admin/Index'>
        <ConfirmDelete show={showConfirmDelete} user={selectedUser} handlePopupClick={handlePopupClick}/>
        <Container>
          <h2>Users</h2>
          <Table>
            <HeaderRow>
              <HeaderRowItem width={2}>Username</HeaderRowItem>
              <HeaderRowItem width={3.5}>Email</HeaderRowItem>
              <HeaderRowItem width={0.75}>Admin</HeaderRowItem>
              <HeaderRowItem width={3}>Created</HeaderRowItem>
              <HeaderRowItem width={0.75}>Edit</HeaderRowItem>
              <HeaderRowItem width={0.25}><i className="fas fa-trash"></i></HeaderRowItem>
            </HeaderRow>
            {isLoading && <Spinner/>}
            {
              users.map(user => (
                <Row key={user._id}>
                  <RowItem width={2}>{user.username}</RowItem>
                  <RowItem width={3.5}>{user.email}</RowItem>
                  <RowItem width={0.75} center={true}>{user.isAdmin ? <i className="far fa-check-square"/> : <i className="fas fa-times"/>}</RowItem>
                  <RowItem width={3}>{formatDate(user.createdAt)}</RowItem>
                  <Link href={`/admin/users/edit/${user._id}`}>
                    <EditRowItem width={0.75} center={true}>Edit</EditRowItem>
                  </Link>
                  <DeleteRowItem width={0.25} center={true} onClick={() => openPopup(user)}><i className="fas fa-trash"></i></DeleteRowItem>
                </Row>
              ))
            }
          </Table>
          <Link href='/admin/users/create'>
            <FloatingAddButton><i className="fas fa-user-plus"></i></FloatingAddButton>
          </Link>
        </Container>
      </Layout>
    </>
  )
}

export default Users
