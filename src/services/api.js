// api.js
import axios from 'axios'
import router from '../router/index'
import TokenService from './token.service' //generates tokens

const instance = axios.create({
  //initializing axios (making requests)
  baseURL: 'https://schoolproject-backend.onrender.com/api/', //path to the backend
  headers: {
    'Content-Type': 'application/json',
  },
})

//in postman we had to use a token to make requests
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken() //first of all we retrieve the token from the local storage
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor to handle global authentication errors
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      TokenService.removeToken() //if there's an error you're removed from the app and you're redirected to homepage
      router.push({ name: 'Home' })
    }
    return Promise.reject(error)
  },
)

export default instance
