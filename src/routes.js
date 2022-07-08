import HomePage from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/Home.vue'
import SignUp from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/SignUp.vue'
import LogIn from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/Login.vue'
import AddRestro from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/AddRstro.vue'
import UpdateRestro from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/UpdateRestro.vue'
import DataBase from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/DataBase.vue'
import ToDo from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/ToDo.vue'
import UserRestaurant from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/components/UserRestaurant.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        name: 'Home',
        component: HomePage,
        path: '/'

    },
    {
        name: 'LogIn',
        component: LogIn,
        path: '/login'
    },
    {
        name: "SignUp",
        component: SignUp,
        path: '/signup'
    },
    {
        name: "AddRestro",
        component: AddRestro,
        path: '/addrestro'
    },
    {
        name: "UpdateRestro",
        component: UpdateRestro,
        path: '/updaterestro/:id'
    },
    {
        name: "DataBase",
        component: DataBase,
        path: '/database'
    },
    {
        name: "ToDo",
        component: ToDo,
        path: '/todo'
    },
    {
        name:"UserRestaurant",
        component:UserRestaurant,
        path: "/UserRestaurant/:id"
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router