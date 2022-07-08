<template>
    <HeaderNav />
    <div class="row">
        <div class="col">
            <div class="col">
                <h3 class="text-success">User Data Manager</h3>
            </div>
            <button type="button" class="btn btn-success mt-3 mb-3" data-toggle="modal" data-target="#NewName"
                data-whatever="@mdo">Enter New Data</button>
            <div class="col-3">
                <form class="d-flex" @submit.prevent="searchdata(NameSearch)">
                    <input class="form-control me-2" type="search" v-model="NameSearch" placeholder="Search"
                        aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            
            <FilterToDo :totalRecords="alltodo.length" @input="testCall" />

            <!-- Add new user Model  -->

            <div class=" modal fade mt-3" id="NewName" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New Entry</h5>
                            <button type="button" class="close border-bone"
                                style="border: none ; background-color: transparent;" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Name</label>
                                    <input type="text" class="form-control" id="recipient-name" v-model="NewName">
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Email</label>
                                    <input type="text" class="form-control" id="recipient-name" v-model="NewEmail">

                                </div>
                                <div class="modal-footer">
                                    <!-- <input class="btn btn-primary" type="submit" value="Save Data"> -->
                                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                                        @click="NewData({ NewName, NewEmail })">Save Data</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User's Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for=" (todo, index) in computeAlltodo" :key="index">
                        <th>{{ todo.id }}</th>
                        <td>{{ todo.name }} </td>
                        <td>{{ todo.email }} </td>
                        <td><button @click="removeToDo(todo)"
                                style="border:none; background:transparent;cursor: pointer; outline: none; "
                                class="text-danger" data-target="#exampleModalCenter" data-toggle="modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                    class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                data-target="#exampleModal" @click="EditTodo(todo)">Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Modal for delete  -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <h3 class="text-danger">Are You sure ?? <br> <span class="text-primary">{{ R_name }} will
                                    deleted</span></h3>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal"
                                @click="RemoveId(R_Id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal for edit  -->
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
                            <form @submit.prevent="updateToDo({ ToDoId, ToDoName, ToDoEmail })">
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label">Name</label>
                                    <input type="name" class="form-control" id="recipient-name" required
                                        placeholder="Edit your Name here.." v-model="ToDoName">
                                </div>
                                <div class="form-group mt-2">
                                    <label for="message-text" class="col-form-label">Email</label>
                                    <input type="email" class="form-control" id="recipient-name" required
                                        placeholder="Edit your Email here.." v-model="ToDoEmail">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">close</button>
                                    <button type="submit" class="btn btn-success">Save</button>
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
import { mapActions } from 'vuex'
import HeaderNav from './Header.vue'
import FilterToDo from './FilterToDo.vue'
import store from '@/store'

export default {
    name: "ToDo",
    components: {
        HeaderNav, FilterToDo
    },

    // computed: mapGetters(['alltodo']),
    created() {
        this.fetchUser()

    },
    data: function () {
        return {
            NameSearch: "",
            NewName: "",
            NewEmail: '',
            ToDoId: '',
            ToDoName: "",
            ToDoEmail: "",
            R_Id: "",
            R_name: '',
            page: "",
            perPage: ''
        }
    },
    computed: {
        computeAlltodo() {
            if (!this.alltodo) {
                return []
            } else {

                const firstIndex = (this.page - 1) * (this.perPage)
                const lastIndex = this.page * this.perPage
                return this.alltodo.slice(firstIndex, lastIndex)
            }
        },
        alltodo() {
            return store.getters.alltodo;
        }
    },
    methods: {
        ...mapActions(['fetchUser', 'RemoveId', 'updateToDo', 'addNewName', 'searchdata']),

        EditTodo(todo) {

            this.ToDoName = todo.name
            this.ToDoEmail = todo.email
            this.ToDoId = todo.id
        },
        NewData(data) {
            this.NewName = data.NewName
            this.NewEmail = data.NewEmail
            this.addNewName({ id: "New Id", name: this.NewName, email: this.NewEmail });
        },
        removeToDo(data) {
            this.R_Id = data.id
            this.R_name = data.name
        },
        testCall(data) {

            if (data.perPage == null) {
                this.page = data.page
                this.perPage = 5
            } else {
                this.page = data.page
                this.perPage = data.perPage
            }

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

