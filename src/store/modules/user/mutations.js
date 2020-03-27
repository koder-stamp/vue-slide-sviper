export const SET_USER_PROFILE = (state, profile) => {
  state.userProfile = profile
}

export const SET_USER_BALANCE_REQUEST_WAITING = (state, status) => {
  state.userBalanceRequestWaiting = status
}

export const SET_USER_BALANCE = (state, balance) => {
  state.balance = balance
}
export const SET_USER_VOUCHER = (state, userVoucher) => {
  state.userVoucher = userVoucher
}

export const SET_USER_PHONE = (state, phone) => {
  state.userPhone = phone
}

export const SET_USER_EMAIL = (state, email) => {
  state.userEmail = email
}
export const SET_RATES = (state, rates) => {
  state.rates = rates
}

export const SET_USER_BALANCE_TOTAL_AMOUNT = (state, balance) => {
  state.balanceTotal = balance
}

export const SET_ACTIVE_CURRENCY = (state, currency) => {
  state.activeCurrency = currency
}

export const SET_LAST_ACTIVITY = (state, activity) => {
  state.lastActivity = state.lastActivity.concat(activity)
}

export const SET_LAST_ACTIVITY_CLEAR = (state) => {
  state.lastActivity = []
}

export const SET_LAST_ACTIVITY_REQUEST_WAITING = (state, status) => {
  state.lastActivityRequestWaiting = status
}
