import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#FF9900',
    secondary: '#FF9900',
    accent: '#FF9900',
    error: '#FF5252',
    info: '#FF9900',
    success: '#4CAF50',
    
  },
  options: {
    customProperties: true
  },
  iconfont: 'md',
})

