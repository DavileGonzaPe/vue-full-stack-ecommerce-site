import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router from './router'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCzHA47adZeMqQY44ZCgf_oC2c-eDth1Nk",
  authDomain: "vue-full-stack-ecommerce-site.firebaseapp.com",
  projectId: "vue-full-stack-ecommerce-site",
  storageBucket: "vue-full-stack-ecommerce-site.appspot.com",
  messagingSenderId: "722352460684",
  appId: "1:722352460684:web:5916c6303db22be69efca9"
};

initializeApp(firebaseConfig);

createApp(App)
    .use(router)
    .mount('#app')
