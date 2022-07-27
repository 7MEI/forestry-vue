import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from '../views/Login'
import Home from '../views/Home'
import Main2 from "@/views/Main2";
import UserAdd from "@/views/user/UserAdd";
import ChatPage from "@/views/chat/ChatPage";
import UserHome from "@/views/UserHome";
import AnimalView from "@/views/commentUser/AnimalView";
import PlantView from "@/views/commentUser/PlantView";
import AnimalShow from "@/components/user/aniInfo/AnimalShow";
import InfoShow from "@/components/user/aniInfo/InfoShow";
import PlantShow from "@/components/user/plantInfo/PlantShow";
import ActivityShow from "@/components/user/activty/ActivityShow";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
        path: '/UserHome',
        name: 'UserHome',
        component: UserHome,
        hidden: true
    },
    {
        path: '/AnimalView',
        name: 'AnimalView',
        component: AnimalView,
        hidden: true
    },
    {
        path: '/PlantView',
        name: 'PlantView',
        component: PlantView,
        hidden: true
    },
    {
        path: '/AnimalShow',
        name: 'AnimalShow',
        component: AnimalShow,
        hidden: true
    },
    {
        path: '/InfoShow',
        name: 'InfoShow',
        component: InfoShow,
        hidden: true
    },
    {
        path: '/PlantShow',
        name: 'PlantShow',
        component: PlantShow,
        hidden: true
    },
    {
        path: '/ActivityShow',
        name: 'ActivityShow',
        component: ActivityShow,
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
            {
                path: '/chat',
                name: '在线聊天',
                component: ChatPage
            },
        ]
    },

    {
        path: '/main2',
        name: 'Main2',
        component: Main2,
    },

    {
        path: '/userAdd',
        name: 'UserAdd',
        component: UserAdd,
    },

]

const router = new VueRouter({
    routes
})

export default router
