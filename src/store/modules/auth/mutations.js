import { StorageService } from '@/services/storage.service'

export const AUTH_REQUEST_WAITING = (state, status) => {
  state.authRequestWaiting = status
}

export const SET_PHONE_NUMBER = (state, phoneNumber) => {
  state.phoneNumber = phoneNumber
}

export const SET_CUSTOMER_ID = (state, status) => {
  state.idCustomer = status.idCustomer
}

export const SET_ACCESS_TOKEN = (state, token) => {
  state.accessToken = token
}

export const SET_KEY_START = (state, key) => {
  state.preAuth = key
  if (key) {
    StorageService.setPreToken(key)
  } else {
    StorageService.removePreToken()
  }
}
