
const UserService = {
  getUser: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 'name': null, 'country': null, 'active_currency': 'USD', 'email': null, 'verify_mail': false, 'phone': '+380682706261', 'last_login': '2020-03-27 09:46:39' })
    }, 1000)
  }),
  getBalance: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 'balance': [{ 'id_currency': 2, 'total': '0.04000000', 'name': 'Bitcoin', 'code': 'btc', 'icon': '/upload/btc.svg', 'h24': '1.183', 'market_name': 'USDT' }, { 'id_currency': 4, 'total': '0.00000000', 'name': 'Etherium', 'code': 'eth', 'icon': '/upload/etherum.svg', 'h24': '0.658', 'market_name': 'USDT' }, { 'id_currency': 5, 'total': '0', 'name': 'Tether', 'code': 'usdt', 'icon': '/upload/usdt.svg', 'h24': '0', 'market_name': null }], 'rates': { 'BTC': '6598.95000000', 'ETH': '134.60000000', 'USDT': '1' }, 'status': true })
    }, 1000)
  }),
  getLastActive: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 'count_rows': 6, 'transactions': [{ 'id': 463, 'total': '0.00400000', 'created_at': '2020-03-26 19:21:12', 'comeout': 'code_out', 'currency_name': 'Bitcoin', 'currency_code': 'BTC', 'arrow': 'out', 'comment': 'Created voucher LGEsS...' }, { 'id': 462, 'total': '0.00300000', 'created_at': '2020-03-26 19:14:30', 'comeout': 'code_out', 'currency_name': 'Bitcoin', 'currency_code': 'BTC', 'arrow': 'out', 'comment': 'Created voucher bCXcz...' }, { 'id': 461, 'total': '0.00000000', 'created_at': '2020-03-26 19:00:08', 'comeout': 'code_out', 'currency_name': 'Etherium', 'currency_code': 'ETH', 'arrow': 'out', 'comment': 'Created voucher D0qay...' }, { 'id': 460, 'total': '0.00200000', 'created_at': '2020-03-26 18:38:04', 'comeout': 'code_out', 'currency_name': 'Bitcoin', 'currency_code': 'BTC', 'arrow': 'out', 'comment': 'Created voucher Qu9df...' }, { 'id': 459, 'total': '0.00100000', 'created_at': '2020-03-25 14:13:21', 'comeout': 'code_out', 'currency_name': 'Bitcoin', 'currency_code': 'BTC', 'arrow': 'out', 'comment': 'Created voucher B50Ez...' }, { 'id': 438, 'total': '0.05', 'created_at': '2020-03-10 11:54:52', 'comeout': 'transfer_in', 'currency_name': 'Bitcoin', 'currency_code': 'BTC', 'arrow': 'in', 'comment': 'Received from mobile +380994602448' }], 'status': true })
    }, 1000)
  })
}

export { UserService }
