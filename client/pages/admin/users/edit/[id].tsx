import React, {useEffect, useState} from 'react'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import Spinner from '../../../../components/Utilities/Spinner';
import {AvatarImg, FormContainer, GrowContainerGreen, StyledInput, UserInfoContainer, StyledCheckbox} from '../StyledUserForm';
import {WideButton} from '../../../../components/StyledButtons';


const EditUser = () => {
  const [userId, setUserId] = useState()
  const [user, setUser] = useState()
  const [password, setPassword] = useState()

  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    setUserId(id)
  })

  useEffect(() => {
    if (userId) {
      fetchUser(userId)
    }
  }, [userId])

  const fetchUser = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/users/${id}`)
    setUser({
      ...data
    })
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setUser({
      ...user,
      [name]: value
    })
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password) {
      axios.put(`http://localhost:4000/api/users/${userId}`, {
        ...user,
        password
      })
    } else {
      axios.put(`http://localhost:4000/api/users/${userId}`, user
      )
    }

    router.push('/admin/users')
  }

  return (
    <Layout>
      {user
        ?
        <GrowContainerGreen>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <AvatarImg src='https://www.pngitem.com/pimgs/m/105-1050694_user-placeholder-image-png-transparent-png.png' alt='user placeholder'/>
                <UserInfoContainer>
                  <label htmlFor='username'>Username</label>
                  <StyledInput type='text' id='username' name='username' onChange={handleChange} value={user.username}/>
                  <label htmlFor='email'>Email</label>
                  <StyledInput type='email' id='email' name='email' onChange={handleChange} value={user.email}/>
                  <label htmlFor='password'>Change password</label>
                  <StyledInput type='password' id='password' name='password' onChange={handlePasswordChange} value={password}/>
                  <div>
                    <label htmlFor='password'>Admin?</label>
                    <StyledCheckbox type='checkbox' name='isAdmin' checked={user.isAdmin} onChange={handleChange}/>
                  </div>
                </UserInfoContainer>
            </FormContainer>
            <WideButton type='submit'>Submit</WideButton>
          </form>
        </GrowContainerGreen>
        : <Spinner/>}
    </Layout>
  );
}

export default EditUser
