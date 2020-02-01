import React from 'react'
import { AdminItem, NavbarContainer, NavbarItem } from './StyledAdminNavbar'
import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <NavbarContainer>
      <AdminItem>Admin</AdminItem>
      <Link href='/admin/users'>
        <NavbarItem>Users</NavbarItem>
      </Link>
      <NavbarItem>Clubs</NavbarItem>
      <NavbarItem>Players</NavbarItem>
    </NavbarContainer>
  )
}

export default AdminNavbar
