import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LocalStorage, SessionStorage } from 'quasar'

const state = {

    historys: [],
    loading: false,
    uploadProgress: -1,
    historySearchKey:  '',
    koty: {},
    Xanghana : {},
    api : []



}

const mutations = {

    addhistory (state, payload) {
       state.historys.push(payload.object)

    },

    addhistoryAPI (state, payload) {
        state.api.push(payload.object)
     },

    updatehistory (state, payload) {
        Object.assign(state.historys[payload.id], payload.updates)
    },
    deletehistory (state, id) {
        Vue.delete(state.historys, id)
    },
   
    sethistorySearchKey(state, val) {
        state.historySearchKey = val
    },
}

const getters = {
    gethistoryById: (state) => (id) => {
        return state.historys[id]
    }
        ,


        gethistoryById: (state) => () => {
            return state.historys[id]
        },

    searchhistorys: (state) => (historys) => {
        let object = {}

        Object.keys(historys).forEach(key => {
            let history = historys[key]
            if (history.traducao.toLowerCase().includes(state.historySearchKey.toLowerCase())) {
                object[key] = history
            }
        })
        return object
}

}

const actions = {

    loadItems ({ commit }) {
        axios
            .get('http://localhost:8081/api/emakua', {
               
            })
            .then(response => response.data)
            .then(items => {
                
                commit('addhistoryAPI', {
                    id: items.id,
                    object: items
                })
             
        })
    },



    
    getHistory ({ commit }) {

        this.history = LocalStorage.getItem('history')
        commit('addhistory', {
            object: history
        })
    },

  

    addhistory ({commit}, payload) {
     
        payload.createdAt = new Date();
        payload.updatedAt = new Date();

        LocalStorage.set('history', payload)




      
    },
    updatehistory({commit}, payload) {
        commit('loading', true)
        payload.updatedAt = new Date();
        
    },

    deletehistory ({commit}, id) {
        commit('loading', true)
       



    },
    sethistorySearchKey ({commit}, text) {
        commit('sethistorySearchKey', text)
    },

}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}