"use strict"

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Storeを生成
const store = new Vuex.Store({
    state: {
        accessFilePath:'',
        parentPath: '',
    },
    getters: {
        GetAccessFilePath(state){
            return state.accessFilePath;
        },
        GetParentFilePath(state){
            return state.parentPath;
        },
    },
    mutations: {
        SetAccessFilePath(state, FilePath){
            state.accessFilePath = FilePath
        },
        SetParentFilePath(state, FilePath){
            state.parentPath = FilePath
        },
    },
});
export default store;