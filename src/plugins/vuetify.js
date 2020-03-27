import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#525D7F',
        secondary: '#808080',
        orange: '#F2994A',
        'light-green': '#71AC37'
      }
    }
  }
})
