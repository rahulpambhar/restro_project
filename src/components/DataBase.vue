<template>
    <HeaderNav />
    <div class="row">
        <div class="col">
            <div class="col  ">
                <h3 class="text-success">Users DataBase </h3>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User's Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Field</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" (DataBase, index) in alldatabase" :key="index">
                        <th>{{ DataBase.id }}</th>
                        <td>{{ DataBase.name }} </td>
                        <td>{{ DataBase.email }} </td>
                        <td>
                            <button type="button" class="btn btn-success" @click="UserRelationId(DataBase.id)"
                                data-toggle="modal" data-target="#Usars_Restaurat">
                                user Restaurant
                            </button>

                        </td>
                        <td><button @click="deletesUser({ DataBase })" type="button" data-target="#deleteModal"
                                data-toggle="modal"
                                style="border:none; background:transparent;cursor: pointer; outline: none; "
                                class="text-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                    class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                data-target="#exampleModal" @click="EditData({ DataBase })">Edit User
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Usar's Restaurat -->
            <div class="modal fade" id="Usars_Restaurat" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="exampleModalLongTitle">User's Restaurant List :</h6>

                            <tr v-for=" (Restaurants, index) in userRestaurants" :key="index">
                                <td>{{ Restaurants.name }}</td>
                            </tr>

                        </div>
                        <form @submit.prevent="addrestaurant()">
                            <div class="modal-body">
                                <h6 class="text-success"> Add New Restaurant </h6>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Restaurant Name</label>
                                    <input type="text" class="form-control" v-model="restaurant.R_name">
                                    <h6 class="text-danger">{{ addRestroErr.name }}</h6>

                                    <label for="recipient-name" class="col-form-label">Address</label>
                                    <input type="text" class="form-control" v-model="restaurant.R_address">
                                    <h6 class="text-danger">{{ addRestroErr.address }}</h6>

                                    <label for="message-text" class="col-form-label">Contact Detail</label>
                                    <input type="text" class="form-control" v-model="restaurant.R_contact">
                                    <h6 class="text-danger">{{ addRestroErr.contact }}</h6>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal"
                                    @click="emptyData">Back</button>
                                <button type="submit" class="btn btn-success">Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--  Delete Modal -->
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-danger" id="exampleModalLabel">Alert!!</h5>
                        </div>
                        <div class="modal-body">
                            You will lose <u class="text-success">{{ deleteUserName }}</u> permanently...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-dismiss="modal">Cancle</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal"
                                @click="deletesUserConfirm(deleteUserId)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Edit model -->
            <div class=" modal fade" id="exampleModal" role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Name</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                style="border: none ; background-color: transparent; ">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="recipient-name"
                                        placeholder="Edit your name here.." v-model="UserName">
                                </div>
                                <div class="form-group mt-2">
                                    <input type="text" class="form-control" id="recipient-name"
                                        placeholder="Edit your name here.." v-model="UserEmail">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                                    <button type="button" class="btn btn-success"
                                        @click="EditUserConfirm({ UserName, UserEmail, UserId })"
                                        data-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AddRestroValidationInput from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/validation/AddRestroValidation.js'
import HeaderNav from './Header.vue'
export default {
    name: "DataBase",
    components: {
        HeaderNav
    },
    data() {
        return {
            UserName: "",
            UserId: "",
            UserEmail: "",
            deleteUserId: '',
            deleteUserName: '',
            user: {
                name: "",
                email: ""
            },
            restaurant: {
                R_name: "",
                R_address: "",
                R_contact: ''
            },
            addRestroErr: {},
            RelationId: '',
            userRestaurants: ''
        }

    },
    computed: mapGetters(['alldatabase']),
    created() {
        this.fetchUser()

    },
    methods: {
        ...mapActions(['fetchUser']),

        async deletesUser(data) {

            this.deleteUserId = data.DataBase.id
            this.deleteUserName = data.DataBase.name
        },
        async deletesUserConfirm(id) {

            let result = await axios.post('http://127.0.0.1:8000/api/deletesUser/' + id);
            if (result.status == 200) {
                this.fetchUser()

            }
        },
        EditData(data) {
            this.UserId = data.DataBase.id
            this.UserName = data.DataBase.name
            this.UserEmail = data.DataBase.email


        },
        async EditUserConfirm(data) {

            const EditedData = {
                id: data.UserId,
                name: data.UserName,
                email: data.UserEmail,

            }
            let result = await axios.post('http://127.0.0.1:8000/api/editUserConfirm', EditedData)
            if (result.status === 200) {
                this.fetchUser()
            }
        },
        async UserRelationId(id) {
            this.RelationId = id

            const result = await axios.post(`http://127.0.0.1:8000/api/UserRelation/${id}`);
            this.userRestaurants = result.data.restaurants



        },
        async addrestaurant() {


            const { isInvalid, addRestroErr } = AddRestroValidationInput({
                name: this.restaurant.R_name,
                address: this.restaurant.R_address,
                contact: this.restaurant.R_contact
            })

            if (isInvalid) {
                this.addRestroErr = addRestroErr

            } else {
                const data = {
                    user_id: this.RelationId,
                    name: this.restaurant.R_name,
                    address: this.restaurant.R_address,
                    contact: this.restaurant.R_contact
                }
                let result = await axios.post(`http://127.0.0.1:8000/api/addrestaurants`, data);

                if (result.status === 200) {
                    alert("Successfully Added..");

                }
            }
        },
        emptyData() {
            this.restaurant.R_name = ""
            this.restaurant.R_address = ""
            this.restaurant.R_contact = ""
            this.addRestroErr = {}

        }

    },
    mounted() {

        const user = localStorage.getItem('user - info')
        if (!user) {
            this.$router.push({ name: 'LogIn' })
        }
    }
}
</script>   