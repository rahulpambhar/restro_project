<template >
    <div class="row">
        <HeaderNav />
        <div class="col-5 mt-5 text-danger">

            Update Restro.

            <form class="mt-5" @submit.prevent="update_Restaurant">
                <div class="form-group">
                    <h6 class="text-dark">Restaurant Name</h6>
                    <input type="text" class="form-control" placeholder="Restaurant Name"
                        v-model="restaurant.RestaurantUpdate.name" />
                    <h6>{{ UpdateRestroErr.name }}</h6>
                </div>

                <div class="form-group mt-2">
                    <h6 class="text-dark">Address</h6>
                    <input type="text" class="form-control" placeholder="Address"
                        v-model="restaurant.RestaurantUpdate.address" />
                    <h6>{{ UpdateRestroErr.address }}</h6>
                </div>

                <div class="form-group mt-2">
                    <h6 class="text-dark">Contact</h6>
                    <input type="text" class="form-control" placeholder="Contact"
                        v-model="restaurant.RestaurantUpdate.contact" />
                    <h6>{{ UpdateRestroErr.contact }}</h6>
                </div>

                <button type="submit" class="btn btn-primary mt-3">Update
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
    name: 'UpdateRestro',
    components: {
        HeaderNav
    },
    data() {
        return {
            UpdateRestroErr:{},
            restaurant: {
                RestaurantUpdate: {
                    id: "",
                    name: "",
                    address: "",
                    contact: ""
                }
            }
        }
    },
    async mounted() {

        const user = localStorage.getItem('user - info')
        if (!user) {

            this.$router.push({ name: 'LogIn' })
        }
        this.id = this.$route.params.id
        const result = await axios.post(`http://127.0.0.1:8000/api/updateRestorent/${this.$route.params.id}`);
        this.restaurant = result.data


    },
    methods: {

        async update_Restaurant() {

            const { isInvalid, addRestroErr } = AddRestroValidationInput({
                name: this.restaurant.RestaurantUpdate.name,
                address: this.restaurant.RestaurantUpdate.address,
                contact: this.restaurant.RestaurantUpdate.contact
            })


            if (isInvalid) {
                this.UpdateRestroErr = addRestroErr

            } else {

                const data = {
                    id: this.id,
                    name: this.restaurant.RestaurantUpdate.name,
                    address: this.restaurant.RestaurantUpdate.address,
                    contact: this.restaurant.RestaurantUpdate.contact
                }
                let result = await axios.post('http://127.0.0.1:8000/api/updateRestorent', data)

                if (result.status === 200) {

                    this.$router.push({ name: 'Home' })
                }
            }
        }

    }

}

</script>

