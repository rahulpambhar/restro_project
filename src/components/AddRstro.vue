<template >
    <div class="row">
        <HeaderNav />
        <div class="col-5 mt-5 text-danger">

            Add Restro.


            <form class="mt-5">
                <div class="form-group">
                    
                    <input type="text" class="form-control" placeholder="Restaurant Name" v-model="restaurant.Name">
                    <h6>{{ addRestroErr.name }}</h6>
                </div>

                <div class="form-group mt-2">
                    <input type="text" class="form-control" placeholder="Address" v-model="restaurant.Address">
                    <h6>{{ addRestroErr.address }}</h6>
                </div>

                <div class="form-group mt-2">
                    <input type="text" class="form-control" placeholder="Contact" v-model="restaurant.Contact">
                    <h6>{{ addRestroErr.contact }}</h6>
                </div>

                <button type="button" class="btn btn-primary mt-3" v-on:click="Add_Restaurant()">Add New
                    Restaurant</button>
            </form>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import HeaderNav from './Header.vue'
import AddRestroValidationInput from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/validation/AddRestroValidation.js'
export default {
    name: 'AddRestro',
    components: {
        HeaderNav
    },
    data() {
        return {
            addRestroErr: {},
            restaurant: {
                Name: "",
                Address: "",
                Contact: "",                
            }

        }
    },
    methods: {

        async Add_Restaurant() {

            const { isInvalid, addRestroErr } = AddRestroValidationInput({
                name: this.restaurant.Name,
                address: this.restaurant.Address,
                contact: this.restaurant.Contact
            })

            if (isInvalid) {
                this.addRestroErr = addRestroErr

            } else {
                const data = {
                    name: this.restaurant.Name,
                    address: this.restaurant.Address,
                    contact: this.restaurant.Contact
                }
                let result = await axios.post(`http://127.0.0.1:8000/api/addrestaurants`, data);

                if (result.status === 200) {

                    this.$router.push({ name: 'Home' })
                }
            }
        }
    },
    mounted() {
        const user = localStorage.getItem('user - info');
        if (!user) {

            this.$router.push({ name: 'LogIn' })
        }
    }





}

</script>