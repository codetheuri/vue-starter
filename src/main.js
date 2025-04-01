import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'hover.css/css/hover-min.css';


import { createApp } from 'vue';

import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faTrash, faEdit, faPlus, faEye, faEyeSlash, faUser, faUserPlus, faUserCheck, faUserTimes, faSignOutAlt, faSignInAlt, faUserCircle, faUserCog, faUserLock, faUserEdit, faUserMinus, faUserShield, faUserTag, faUserTie, } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash, faEdit, faPlus, faEye, faEyeSlash, faUser, faUserPlus, faUserCheck, faUserTimes, faSignOutAlt, faSignInAlt, faUserCircle, faUserCog, faUserLock, faUserEdit, faUserMinus, faUserShield, faUserTag, faUserTie, );

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.mount('#app');



