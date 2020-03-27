export function cryptoToCurrency (value, rate) {
  return gaussRound(+value * +rate, 2)
}

export function currencyToCrypto (value, rate) {
  return gaussRound(1 / +rate * +value, 8)
}

function gaussRound (num, decimalPlaces) {
  let d = decimalPlaces || 0
  let m = Math.pow(10, d)
  let n = +(d ? num * m : num).toFixed(8)
  let i = Math.floor(n); let f = n - i
  let e = 1e-8
  let r = (f > 0.5 - e && f < 0.5 + e)
    ? ((i % 2 === 0) ? i : i + 1) : Math.round(n)
  return d ? r / m : r
}
