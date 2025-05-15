// api.js
import axios from 'axios'
import router from '../router/index'
import TokenService from './token.service' //generates tokens

const instance = axios.create({
  // initializing axios (making requests)
  baseURL: 'http://127.0.0.1:8000/api/', // path to the backend
  withCredentials: true,  // Ensure cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor to add token to requests
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken() // Retrieve the token from local storage
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token // Add the token to the request header
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
      TokenService.removeToken() // Remove the token on authentication failure
      router.push({ name: 'Home' }) // Redirect to the homepage
    }
    return Promise.reject(error)
  },
)

export default instance
