import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import EleUploadVideo from '../lib/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(EleUploadVideo.name, EleUploadVideo)

new Vue({
  render: h => h(App)
}).$mount('#app')
