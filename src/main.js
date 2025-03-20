import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'hover.css/css/hover-min.css';


import { createApp } from 'vue';

import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');



