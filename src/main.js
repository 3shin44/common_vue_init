import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// custom scss
import "@/assets/css/index.scss"

new Vue({
  render: h => h(App),
}).$mount('#app')
