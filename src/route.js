import Vue from 'vue'
import VueRouter from "vue-router"


import Login from "./components/login.vue"
import DashBoard from "@/components/dashboard.vue"
import CreateFile from "@/components/CreateFile.vue"
import ShowAllFiles from "@/components/ShowAllFiles.vue"
import EditTask from "@/components/EditTask.vue"
import ShowUserInfo from "@/components/ShowUserInfo";


Vue.use(VueRouter)

const routes = [
    {path: '/', component:Login},
    {path: '/login', component:Login},
    {path: '/dashboard', component:DashBoard},
    {path: '/createfile', component: CreateFile},
    {path: '/showallfiles', component: ShowAllFiles},
    {path: '/edittask', component: EditTask},
    {path: '/userinfo', component: ShowUserInfo},
]

const router = new VueRouter({
    mode:'history',
    routes: routes
})

export default router
