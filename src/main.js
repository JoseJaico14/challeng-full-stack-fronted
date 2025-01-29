import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer '+localStorage.getItem("token");
  return config;
});

createApp(App).use(router).mount('#app')
