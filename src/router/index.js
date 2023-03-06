import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import VNepaliDatePicker from "v-nepalidatepicker";
import Auth from "../services/Auth";
Vue.use(VNepaliDatePicker);
Vue.use(VueRouter);
import { Store } from "../store/index";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if (to.meta.checkLoggedIn) {
      // console.log("here");
      if (Auth.check()) {
        return next({ name: "Dashboard" });
      }
    }
    if (to.meta.requiresAuth && !Auth.check()) {
      return next({ name: "Login" });
    }
    return next();
  });
  return Router;
}
