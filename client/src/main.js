import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import http from "./http";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faAddressBook,
  faCompass,
  faUser,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faUserPlus,
  faCamera,
  faSearch,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faComments,
  faAddressBook,
  faCompass,
  faUser,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faUserPlus,
  faCamera,
  faSearch,
  faEllipsisH
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$axios = http;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
