export const userProfile = state => state.userProfile

export const userEmail = state => state.userEmail

export const walletsBalance = state => (state.balance.map(item => {
  item.code = item.code.toUpperCase()
  const currencyRate = state.rates[item.code]
  const total = (+item.total).toFixed(8)
  const currentQuote = isNaN((total / currencyRate) * 100 / state.balanceTotal) ? 0 : (total * currencyRate) * 100 / state.balanceTotal
  return {
    ...item,
    icon: process.env.VUE_APP_ROOT_HOST + item.icon,
    rate: (+currencyRate).toFixed(2),
    quote: currentQuote.toFixed(currentQuote >= 100 || currentQuote <= 0 ? 0 : 2),
    total_currency: (total * currencyRate).toFixed(2),
    total
  }
}))

export const balanceRates = state => state.rates

export const balanceTotal = state => state.balanceTotal

export const activeCurrency = state => state.activeCurrency

export const userPhone = state => state.userPhone

export const lastActivityRequestWaiting = state => state.lastActivityRequestWaiting

export const userBalanceRequestWaiting = state => state.userBalanceRequestWaiting

export const lastActivity = state => state.lastActivity

export const userVoucher = state => state.userVoucher

export const totalBTC = state => {
  let returnValue = state.balanceTotal / state.rates['BTC']
  returnValue = Number(returnValue.toFixed(8)).toString()
  return isNaN(returnValue) ? '' : returnValue + ' BTC'
}
