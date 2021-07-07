import {createWebHistory, createRouter} from "vue-router";
import Login from "@/views/login/Login";
import Panel from "@/views/panel/Panel";

const routes = [
    {
        path: '/panel',
        name: 'panel',
        component: Panel
    },
    {
        path: '/',
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router