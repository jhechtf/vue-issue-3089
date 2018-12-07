import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TmdbPlugin from '@lib/tmdb';
import config from '@/config/tmdb';
import BootstrapVue from 'bootstrap-vue';
// Use the TmdbPlugin
Vue.use(TmdbPlugin, {
  apiKey: config.apiKey
});

// Use the Bootstrap Vue stuff
Vue.use(BootstrapVue);

// Create the main Vue instance
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
