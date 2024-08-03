import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'

import useAlert from './stores/alert';
import Alert from './components/UI/Alert.vue';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('alert', useAlert());
app.component('alert', Alert);

app.mount('#app')
