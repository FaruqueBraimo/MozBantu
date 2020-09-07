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
        
        let checked = [];
		let data = localStorage.getItem('history');
		const productChecked =  data ? JSON.parse(data) : [];

        commit('addhistory', {
            object: productChecked
        })
    },

    removeChecked({ dispatch }, payload) {
		let checked = [];
		var data = localStorage.getItem('history');
		let productChecked = JSON.parse(data);
		productChecked.forEach(element => {
			if (element.payload.id == payload) {
				productChecked.splice(element, 1);
            }
            else{
            }
		});

		localStorage.setItem('history', JSON.stringify(productChecked));
		dispatch('getHistory');
	},


  

    addhistory ({commit,dispatch}, payload) {


        let checked = [];
		var data = localStorage.getItem('history');
		data = data ? JSON.parse(data) : [];

		data.push({
			payload
		});

        localStorage.setItem('history', JSON.stringify(data));
        dispatch('getHistory');



      
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