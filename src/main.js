import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/style.css";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  components: { App },
  template: "<App/>",
});
