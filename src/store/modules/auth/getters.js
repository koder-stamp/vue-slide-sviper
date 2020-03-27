export const authRequestWaiting = state => state.authRequestWaiting

export const isAuthenticated = state => !!state.accessToken && !!state.idCustomer

export const phoneNumber = state => state.phoneNumber

export const isPreAuthenticated = state => !!state.preAuth
