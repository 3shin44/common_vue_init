import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'
Vue.use(ElementUI, { locale })

// custom scss
import '@/assets/css/index.scss'

import mockData from './util/mockData'
Vue.prototype.$mockData = mockData

new Vue({
  render: (h) => h(App)
}).$mount('#app')
