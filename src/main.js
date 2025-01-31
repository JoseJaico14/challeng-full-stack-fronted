import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
function isTokenExpired(token) {
  const decodedToken = parseJwt(token);
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  if(isTokenExpired(accessToken) && router.currentRoute.value.fullPath != "/login"){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
  config.headers['Authorization'] = 'Bearer '+accessToken;
  return config;
});

createApp(App).use(router).mount('#app')
