// Vue Instance & default TipTool
import Vue from 'vue'
Vue.config.productionTip = false

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'
Vue.use(ElementUI, { locale })

export default Vue
