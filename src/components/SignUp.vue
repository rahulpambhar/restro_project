<template>
  <div class="row">
    <div class="col h-25 w-25 text-center mx-auto">
      <img class="LogoImg" src="../assets/Images/Logo/pattern-on-clay-pot-for-indian-restaurant-6940ld.png" />
      <h1 class="mt-3 pb-2">SignUp Here</h1>

      <div class="col">
        <form @submit.prevent="SignUp()">

          <input :class="`border border-primary mt-2${errors.name ? 'border border-danger is-invalid' : ''}`"
            type="name" placeholder="Name" v-model="name" /> <br>
          <h6 class="invalid-feedback ">{{ errors.name }}</h6>

          <input :class="`border border-primary mt-2${errors.email ? 'border border-danger is-invalid' : ''}`"
            type="text" placeholder="Email" v-model="email" /><br>
          <h6 class="invalid-feedback ">{{ errors.email }}</h6>

          <input :class="`border border-primary mt-2${errors.password ? 'border border-danger is-invalid' : ''}`"
            placeholder="Password" v-model="password" /><br>
          <h6 class="invalid-feedback ">{{ errors.password }}</h6>

          <input
            :class="`border border-primary mt-2${errors.confirm_password ? 'border border-danger is-invalid' : ''}`"
            placeholder="Confirm Password" v-model="confirm_password" /><br>
          <h6 class="invalid-feedback ">{{ errors.confirm_password }}</h6>


          <button type="submit" class="btn btn-success mt-3">SignUp</button>
        </form>


      </div>
      <div class="col mt-2 text-light">
        <h3 class="btn btn-success text-light">
          <router-link to="/login" class="text-light text-decoration-none">Log In &nbsp;</router-link>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import ValidateRegisterInput from '/home/ts/Desktop/pract_vue/Restaurants/restro_project/src/validation/ValidateRegisterInput.js'
import axios from 'axios'
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},

    };
  },
  methods: {

    async SignUp() {
      const { isInvalid, errors } = ValidateRegisterInput({
        name: this.name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      })

      if (isInvalid) {
        this.errors = errors

      } else {
        const data = {
          name: this.name,
          email: this.email,
          password: this.confirm_password
        }
        let result = await axios.post(`http://127.0.0.1:8000/api/register`,data);

        if (result.status === 200) {

          this.$router.push({ name: 'LogIn' })

        }
      }
    },
  },
  
  mounted() {

    const user = localStorage.getItem('user - info')
    if (user) {
      this.$router.push({ name: 'Home' })
    }
  }

};
</script>
