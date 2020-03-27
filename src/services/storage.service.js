const TOKEN_KEY = 'access_token'
const PHONE_KEY = 'phone'
const ID_KEY = 'id'
const USER_STATUS_KEY = 'us'
const PRE_TOKEN = 'k'

const StorageService = {
  getToken () {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken (accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken () {
    localStorage.removeItem(TOKEN_KEY)
  },

  getPreToken () {
    return sessionStorage.getItem(PRE_TOKEN)
  },

  setPreToken (preToken) {
    sessionStorage.setItem(PRE_TOKEN, preToken)
  },

  removePreToken () {
    sessionStorage.removeItem(PRE_TOKEN)
  },

  setPhone (phone) {
    localStorage.setItem(PHONE_KEY, phone)
  },

  removePhone () {
    localStorage.removeItem(TOKEN_KEY)
  },

  getIdCustomer () {
    return localStorage.getItem(ID_KEY)
  },

  setIdCustomer (id) {
    localStorage.setItem(ID_KEY, id)
  },

  removeIdCustomer () {
    localStorage.removeItem(ID_KEY)
  },

  getUserStatus () {
    return localStorage.getItem(USER_STATUS_KEY)
  },

  setUserStatus (status) {
    return localStorage.setItem(USER_STATUS_KEY, status)
  },

  removeUserStatus () {
    localStorage.removeItem(USER_STATUS_KEY)
  }

}

export { StorageService }
