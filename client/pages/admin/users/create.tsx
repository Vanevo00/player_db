import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import {AvatarImg, FormContainer, GrowContainerGreen, StyledInput, UserInfoContainer, StyledCheckbox} from './StyledUserForm';
import {WideButton} from '../../../components/StyledButtons';
import {ErrorMessage} from '../../user/StyledUserPages';


const CreateUser = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    isAdmin: false,
    password: ''
  })
  const [errors, setErrors] = useState([])

  const router = useRouter()

  const handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setInput({
      ...input,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {username, email, password, isAdmin} = input

    try {
      await axios.post('http://localhost:4000/api/users/admin/create', {
        username,
        email,
        password,
        isAdmin
      })
      router.push('/admin/users')
    } catch (err) {
      const errArr = []
      err.response.data.errors.map(error => {
        errArr.push(error.msg)
      })
      setErrors(errArr)
      setTimeout(() => {
        setErrors([])
      }, 60000)
    }
  }

  return (
    <Layout>
      <GrowContainerGreen>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <AvatarImg src='https://www.pngitem.com/pimgs/m/105-1050694_user-placeholder-image-png-transparent-png.png' alt='user placeholder'/>
            <UserInfoContainer>
              <label htmlFor='username'>Username</label>
              <StyledInput type='text' id='username' name='username' onChange={handleChange} value={input.username}/>
              <label htmlFor='email'>Email</label>
              <StyledInput type='email' id='email' name='email' onChange={handleChange} value={input.email}/>
              <label htmlFor='password'>Password</label>
              <StyledInput type='password' id='password' name='password' onChange={handleChange} value={input.password}/>
              <div>
                <label htmlFor='password'>Admin?</label>
                <StyledCheckbox type='checkbox' name='isAdmin' checked={input.isAdmin} onChange={handleChange}/>
              </div>
            </UserInfoContainer>
          </FormContainer>
          <WideButton type='submit'>Submit</WideButton>
        </form>
        {errors.length > 0 && errors.map(error =>
          <ErrorMessage>{error}</ErrorMessage>
        )}
      </GrowContainerGreen>
    </Layout>
  );
}

export default CreateUser
