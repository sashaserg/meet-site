import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import store from './store/index'
import axios from 'axios'
import {restURL} from "./api/baseURL";
import {LOGOUT} from "./constants";
import VModal from 'vue-js-modal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faBolt, faCogs, faSearch, faHome, faUser, faEnvelope, faGift, faPlus, faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faBolt, faCogs, faSearch, faHome, faUser, faEnvelope, faGift, faPlus, faPlusSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VModal);

axios.interceptors.response.use(response => { return response }, error => {
  const status = error.response ? error.response.status : null;
  const originalRequest = error.config;
  // Do something with response error
  if (status === 401 && !originalRequest._retry) {
    console.log('401 error');
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
      return axios.post(restURL + '/refreshTokens', {refreshToken: refreshToken})
        .then(result => {
          const { data } = result;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
          return axios(originalRequest);
        })
        .catch(err => {
          localStorage.removeItem('removeItem');
          localStorage.removeItem('refreshToken');
          router.push('/login');
          return;
        })
    }
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
