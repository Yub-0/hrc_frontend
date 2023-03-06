import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import VNepaliDatePicker from 'v-nepalidatepicker'

// import "bootstrap/dist/css/bootstrap.css";

Vue.use(VNepaliDatePicker)

// import example from './module-example'
import user from './user'

// import tree from './tree'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {

    // example
    user
  },
  plugins: [createPersistedState()],
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

export default function (/* { ssrContext } */) {
  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  // if (process.env.DEV && module.hot) {
  //   module.hot.accept(['./user'], () => {
  //       const newShowcase = require('./user').default
  //       Store.hotUpdate({
  //         modules: {
  //           user: newuser
  //         }
  //       })
  //     }),
  //     module.hot.accept(['./store-tasks'], () => {
  //       const newShowcase = require('./store-tasks').default
  //       Store.hotUpdate({
  //         modules: {
  //           task: newtask
  //         }
  //       })
  //     })
  // }

  return Store
}

export {
  Store
}
