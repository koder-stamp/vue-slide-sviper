import { UserService } from '@/services/user.service'

export const getUser = async ({ commit }) => {
  try {
    const profile = await UserService.getUser()
    commit('SET_USER_PROFILE', profile)
    return profile
  } catch (error) {
    throw error
  } finally {
    // commit('SITE_SETTINGS_LOADING', false)
  }
}

export const getStartBalance = async ({ commit, dispatch }) => {
  try {
    // eslint-disable-next-line camelcase
    const { balance, rates, active_currency, phone } = await UserService.getStartBalance()
    console.log(balance, rates)
    commit('SET_USER_BALANCE', balance)
    commit('SET_RATES', rates)
    commit('SET_USER_PHONE', phone)
    commit('SET_ACTIVE_CURRENCY', active_currency)
    dispatch('userBalanceTotalAmount')
    return { balance, rates }
  } catch (error) {
    throw error
  } finally {
    // commit('SITE_SETTINGS_LOADING', false)
  }
}

export const getVoucherList = async ({ commit }) => {
  try {
    // eslint-disable-next-line camelcase
    const { data: voucherList } = await UserService.getVoucherList()
    commit('SET_USER_VOUCHER', voucherList)
    return voucherList
  } catch (error) {
    throw error
  } finally {
  }
}

export const setVoucher = async ({ commit }, data) => {
  try {
    return await UserService.setVoucher(data)
  } catch (error) {
    throw error
  }
}

export const getUserBalance = async ({ commit, dispatch }) => {
  commit('SET_USER_BALANCE_REQUEST_WAITING', true)
  try {
    const { balance, rates } = await UserService.getBalance()
    commit('SET_USER_BALANCE', balance)
    commit('SET_RATES', rates)
    dispatch('userBalanceTotalAmount')
    return { balance, rates }
  } catch (error) {
    throw error
  } finally {
    commit('SET_USER_BALANCE_REQUEST_WAITING', false)
  }
}
export const checkEmail = async ({ commit, dispatch }, email) => {
  try {
    const response = await UserService.checkEmail(email)
    commit('SET_USER_EMAIL', response)
    return response
  } catch (error) {
    throw error
  } finally {
    // commit('SITE_SETTINGS_LOADING', false)
  }
}

export const userBalanceTotalAmount = ({ commit, state }) => {
  const totalAmount = state.balance.reduce((total, current) => {
    return total + current.total * +state.rates[current.code.toUpperCase()]
  }, 0)
  commit('SET_USER_BALANCE_TOTAL_AMOUNT', totalAmount.toFixed(2))
}

export const getLastActivity = async ({ commit, dispatch }, data) => {
  commit('SET_LAST_ACTIVITY_REQUEST_WAITING', true)
  try {
    const response = await UserService.getLastActive(data)
    commit('SET_LAST_ACTIVITY', response.transactions)
    return response
  } catch (error) {
    throw error
  } finally {
    commit('SET_LAST_ACTIVITY_REQUEST_WAITING', false)
  }
}
