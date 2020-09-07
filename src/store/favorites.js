import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LocalStorage, SessionStorage } from 'quasar'

const state = {

    favorites: [],
    loading: false,
    uploadProgress: -1,
    favoriteSearchKey:  '',
    koty: {},
    Xanghana : {},
    api : []



}

const mutations = {

    addfavorite (state, payload) {
       state.favorites.push(payload.object)
       

    },

    reset (state, payload) {
        state.favorites = {}
     },

    updatefavorite (state, payload) {
        Object.assign(state.favorites[payload.id], payload.updates)
    },
    deletefavorite (state, id) {
        Vue.delete(state.favorites, id)
    },
   
    setfavoriteSearchKey(state, val) {
        state.favoriteSearchKey = val
    },
}

const getters = {
    getfavoriteById: (state) => (id) => {
        return state.favorites[id]
    }
        ,


        getfavoriteById: (state) => () => {
            return state.favorites[id]
        },

    searchfavorites: (state) => (favorites) => {
        let object = {}

        Object.keys(favorites).forEach(key => {
            let favorite = favorites[key]
            if (favorite.traducao.toLowerCase().includes(state.favoriteSearchKey.toLowerCase())) {
                object[key] = favorite
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
                
                commit('addfavoriteAPI', {
                    id: items.id,
                    object: items
                })
             
        })
    },



    
    getfavorite ({ commit }) {
        
        let checked = [];
		let data = localStorage.getItem('favorite');
		const productChecked =  data ? JSON.parse(data) : [];

        commit('addfavorite', {
            object: productChecked
        })
    },

    removeChecked({ dispatch }, payload) {
		let checked = [];
		var data = localStorage.getItem('favorite');
		let productChecked = JSON.parse(data);
		productChecked.forEach(element => {
			if (element.payload.id == payload) {
				productChecked.splice(element, 1);
            }
            else{
            }
		});
		dispatch('getfavorite');

        localStorage.setItem('favorite', JSON.stringify(productChecked));
        dispatch('getfavorite');

	},


  

    addfavorite ({commit,dispatch}, payload) {


        let checked = [];
		var data = localStorage.getItem('favorite');
		data = data ? JSON.parse(data) : [];

		data.push({
			payload
		});

        localStorage.setItem('favorite', JSON.stringify(data));
        dispatch('getfavorite');



      
    },
    updatefavorite({commit}, payload) {
        commit('loading', true)
        payload.updatedAt = new Date();
        
    },

    deletefavorite ({commit}, id) {
        commit('loading', true)
       



    },
    setfavoriteSearchKey ({commit}, text) {
        commit('setfavoriteSearchKey', text)
    },

}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}