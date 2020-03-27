import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import eventBus from '@/plugins/eventBus'
import Platform from '@/plugins/Platform'

import { VueHammer } from 'vue2-hammer'

import '@/assets/scss/main.scss'

import VueCurrencyInput from 'vue-currency-input'

Vue.use(Platform)

const pluginOptions = {
  globalOptions: { locale: 'en' }
}
Vue.use(VueCurrencyInput, pluginOptions)

Vue.use(VueHammer)
Vue.use(eventBus)

/* // let isOrientationChange = false
applicationElementSize()

console.log('main', window.innerHeight)

// document.addEventListener('DOMContentLoaded', () => {
//   applicationElementSize()
// })

window.addEventListener('orientationchange', () => {
  // isOrientationChange = true
})

window.addEventListener('resize', () => {
  applicationElementSize()
  console.log('resize', window.innerHeight)
  // isOrientationChange = false
}) */
Vue.config.productionTip = false

Vue.filter('trimZero', function (value) {
  if (!value) return ''
  if (typeof value === 'number') {
    value = String(value)
  }
  if (value.indexOf('.') !== -1) {
    value = value.replace(/0+$/, '').replace(/\.$/, '')
  }
  return value
})

Vue.filter('formatMoneyCash', function (value) {
  if (!value) return ''
  try {
    const decimalCount = 2
    const thousands = ','
    const decimal = '.'

    const negativeSign = value < 0 ? '-' : ''

    let i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString()
    let j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
})

Vue.filter('formatMoneyCrypto', function (value) {
  if (!value) return ''
  try {
    const decimalCount = 8
    const thousands = ','
    const decimal = '.'

    const negativeSign = value < 0 ? '-' : ''

    let i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString()
    let j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
