import { createApp } from 'vue'
import router from './router/index'
import { store, key } from './store/index'
import App from './App.vue'
import './index.css'

createApp(App).use(store, key).use(router).mount('#app')
