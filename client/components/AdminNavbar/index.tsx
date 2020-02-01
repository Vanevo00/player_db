import React from 'react';
import {AdminItem, NavbarContainer, NavbarItem} from './StyledAdminNavbar';

const AdminNavbar = () => {
  return (
    <NavbarContainer>
      <AdminItem>Admin</AdminItem>
      <NavbarItem>Users</NavbarItem>
      <NavbarItem>Clubs</NavbarItem>
      <NavbarItem>Players</NavbarItem>
    </NavbarContainer>
  );
};

export default AdminNavbar;
