import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Layout from '../../../components/Layout'
import { InputContainer, StyledLabel, UserContainer, StyledTextInput, ErrorMessage } from '../StyledUserPages'
import { FormContainer } from '../../../components/StyledContainers'
import { WideButton } from '../../../components/StyledButtons'
import axios from 'axios'
import setAuthToken from '../setAuthToken';

const Login = () => {
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { username, password } = inputData

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
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post('http://localhost:4000/api/auth', {
        username,
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
    <Layout title='Login'>
      <UserContainer>
        <FormContainer>
          <h2>Log in</h2>
          {errors.length > 0 && errors.map(error =>
            <ErrorMessage>{error}</ErrorMessage>
          )}
          <form onSubmit={onSubmit}>
            <InputContainer>
              <StyledLabel htmlFor='username'>username</StyledLabel><br/>
              <StyledTextInput type='text' name='username' onChange={onChange}/>
            </InputContainer>
            <InputContainer>
              <StyledLabel htmlFor='password'>password</StyledLabel><br/>
              <StyledTextInput type='password' name='password' onChange={onChange}/>
            </InputContainer>
            <WideButton type="submit">Login</WideButton>
          </form>
        </FormContainer>
      </UserContainer>
    </Layout>
  )
}

export default Login
