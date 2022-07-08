<template >
    <div class="row">
        <HeaderNav />
        <h6 class="d-flex">welcome <span class="text-success  d-flex">{{ this.user }} || <h6 class="mx-3 text-">list of
                    restaurants</h6>
            </span>
        </h6>
        <div class="col">
            <div class="co--5 d-flex">

                <button class="btn btn-primary">
                    <router-link class="nav-link text-white" to="/addrestro">Add New Restaurant</router-link>
                </button>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">R_Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Actions</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in restaurants" :key="item.id">
                        <th>{{ item.id }}</th>
                        <td>{{ item.name }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.contact }}</td>
                        <td>
                            <router-link :to="'/updaterestro/' + item.id" class="text-decoration-none">Update
                            </router-link>
                            <button type="button" class="btn btn-danger mx-3" data-toggle="modal"
                                v-on:click="deleteRes({ item })" data-target="#exampleModal">Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- delete Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger" id="exampleModalLabel"> Alert !!!!</h5>
                </div>
                <div class="modal-body">
                    It will Delete : {{ deleteRestaurant }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                        @click="DeleteRestroConfirm(deletId)">Delete</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

import HeaderNav from './Header.vue'
import axios from 'axios'
export default {
    name: "HomePage",
    components: {
        HeaderNav
    },

    data() {
        return {
            UserName: "",
            restaurants: [],
            name: "",
            editUser: "",
            updatedName: "",
            editId: "",
            count: "",
            user: '',
            deletId: '',
            deleteRestaurant: ""
        }
    },
    methods: {
        deleteRes(data) {
            this.deletId = data.item.id;
            this.deleteRestaurant = data.item.name;

        },
        async DeleteRestroConfirm(id) {
            let result = await axios.post('http://127.0.0.1:8000/api/deleteRestaurant/' + id);
            if (result.status == 200) {
                this.loadData()
            }
        },
        async loadData() {
            const user = localStorage.getItem('user - info')
            this.UserName = JSON.parse(user).name
            const result = await axios.post('http://127.0.0.1:8000/api/rastaurantDataBase');
            this.restaurants = result.data.RestaurantsData

        },
       
        

    },
    mounted() {

        this.user = localStorage.getItem('user - info')
        if (!this.user) {
            this.$router.push({ name: 'SignUp' })
        }
        this.loadData()
    }
}
</script>


<!-- componant name should relavant to nav names -->


