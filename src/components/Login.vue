<template >
    <div class="row ">
        <div class="col h-25 w-25 text-center mx-auto">
            <img class="LogoImg" src="../assets/Images/Logo/pattern-on-clay-pot-for-indian-restaurant-6940ld.png" />
            <h1 class="mt-3 pb-2">Log In</h1>

            <div class="col">
                <form @submit.prevent="LogIn()">
                    <h5 class="text-danger"> {{error}}</h5> 
                    <input :class="`border border-primary mt-2${errors.email ? 'border border-danger is-invalid' : ''}`"
                        type="text" placeholder="Email" v-model="email" /><br />
                    <h6 class="invalid-feedback ">{{ errors.email }}</h6>

                    <input
                        :class="`border border-primary mt-2${errors.password ? 'border border-danger is-invalid' : ''}`"
                        type="text" placeholder="Password" v-model="password" /><br />
                    <h6 class="invalid-feedback ">{{ errors.password }}</h6>

                    <button class="btn btn-success mt-2" type="submit">Log In &nbsp;</button>
                </form>


            </div>
            <div class="col mt-2 text-light">
                <h3 class="btn btn-success text-light">
                    <router-link to="/signup" class="text-light text-decoration-none">SignUp</router-link>
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
import loginInput from "/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/validation/loginInput.js"
import axios from "axios";
export default {

    name: 'LogIn',
    data() {
        return {
            email: "",
            password: "",
            errors: {},
            error: ""
        }
    },
    methods: {
        async LogIn() {

            const { isInvalid, errors } = loginInput({
                email: this.email,
                password: this.password
            })
            if (isInvalid) {
                this.errors = errors
            } else {
                const result = await axios.post(
                    `http://127.0.0.1:8000/api/login/`, { email: this.email, password: this.password }
                );
                
                if (result.data === this.email && result.data.length > 0) {
                    localStorage.setItem("user - info", JSON.stringify(result.data))
                    this.$router.push({ name: 'Home' })
                } else {
                    this.error = "email or password incorrect"
                }
            }
        }
    },
    mounted() {

        const user = localStorage.getItem('user - info')
        if (user) {
            this.$router.push({ name: 'Home' })
        }
    }

}

</script>