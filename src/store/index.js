import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

import palavra from './Palavras'
import config from './configs'
import histo from './history'
import favorite from './favorites'



Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
       palavra ,
       config,
       histo,
       favorite

    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
