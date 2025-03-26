//token.service.js
import router from '../router/index'
import api from './api'

class TokenService {
  setToken(token) {
    localStorage.setItem('authToken', token) //name and what is coming
  }

  setUser(user) {
    localStorage.setItem('user', user)
  }

  getToken() {
    const token = localStorage.getItem('authToken')
    console.log('This is my Token --->>', token)
    return token
  }
  removeToken() {
    localStorage.removeItem('authToken')
    router.push('/login') //when you remove a token you're redirected to the homepage
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  async userInfo() {
    try {
      const response = await api.get('me')
      localStorage.setItem('user', response.data.name)
    } catch (error) {
      console.error('No Authenticated User Was Found', error)
    }
  }
}

const myTokenInstance = new TokenService()
export default myTokenInstance
