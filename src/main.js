import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import JwPagination from 'jw-vue-pagination';

createApp(App).use(store).use(router).use(JwPagination).mount('#app')



