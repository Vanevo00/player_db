import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Layout from '../../../components/Layout'
import { InputContainer, StyledLabel, UserContainer, StyledTextInput, ErrorMessage } from '../StyledUserPages'
import { FormContainer } from '../../../components/StyledContainers'
import { WideButton } from '../../../components/StyledButtons'
import axios from 'axios'
import setAuthToken from '../setAuthToken';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { username, email, password, confirmPassword } = user

  const loadUser = async () => {
    if(localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      await axios.get('http://localhost:4000/api/auth')

      setIsAuthenticated(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }
  }, [isAuthenticated])

  useEffect(() => {
    loadUser()
  }, [])

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setErrors(['passwords do not match'])
    }
    try {
      const data = await axios.post('http://localhost:4000/api/users', {
        username,
        email,
        password
      })
      localStorage.setItem('token', data.data.token)
      loadUser()
    } catch(err) {
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
    <Layout title='Register'>
      <UserContainer>
        <FormContainer>
          <h2>Create Account</h2>
          {errors.length > 0 && errors.map(error =>
            <ErrorMessage>{error}</ErrorMessage>
          )}
          <form onSubmit={onSubmit}>
            <InputContainer>
              <StyledLabel htmlFor='username'>username</StyledLabel><br/>
              <StyledTextInput type='text' name='username' onChange={onChange}/>
            </InputContainer>
            <InputContainer>
              <StyledLabel htmlFor='email'>email</StyledLabel><br/>
              <StyledTextInput type='email' name='email' onChange={onChange}/>
            </InputContainer>
            <InputContainer>
              <StyledLabel htmlFor='password'>password</StyledLabel><br/>
              <StyledTextInput type='password' name='password' onChange={onChange}/>
            </InputContainer>
            <InputContainer>
              <StyledLabel htmlFor='confirmPassword'>re-enter password</StyledLabel><br/>
              <StyledTextInput type='password' name='confirmPassword' onChange={onChange}/>
            </InputContainer>
            <WideButton type="submit">Register</WideButton>
          </form>
        </FormContainer>
      </UserContainer>
    </Layout>
  )
}

export default Register
