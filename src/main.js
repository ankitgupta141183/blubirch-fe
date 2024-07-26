// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper';
import App from './App'
import router from './router'
import { store } from './store'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import VueToast from 'vue-toast-notification'
// Import any of available themes
import 'vue-toast-notification/dist/theme-default.css'
// for pagination
import Paginate from 'vuejs-paginate'
// for csv import
import VueCsvImport from 'vue-csv-import'
import Vuelidate from 'vuelidate'
import  './assets/css/font-awesome.min.css'
import  './assets/css/style.css'
import './assets/css/annotorious.css'
import './assets/javascript/annotorious.min.js'
import './assets/css/custom.css'
// For Multiselect option
import Multiselect from 'vue-multiselect'
import { VBToggle,BButton,CollapsePlugin } from 'bootstrap-vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const options = { 
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://cyberwave-pdf-reports.s3-us-west-2.amazonaws.com/style.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    
  ]
}
Vue.directive('b-toggle', VBToggle)
Vue.component('b-button', BButton)
Vue.use(CollapsePlugin)
Vue.component('vue-csv-import', VueCsvImport)
Vue.component('paginate', Paginate)
Vue.component('multiselect', Multiselect)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(require('vue-moment'));
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})
Vue.use(VueHtmlToPaper, options);
Vue.use(VueToast, { position: 'top' })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify : new Vuetify(),
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})


