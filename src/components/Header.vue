<template >
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="#">Logo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li class="nav-item">
                        <router-link class="nav-link active text-white" to="/">Restaurants Database</router-link>
                    </li>                   
                    <li class="nav-item ">
                        <router-link class="nav-link text-white" to="/database">User DataBase</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link text-white" to="/todo">Vuex-Demo</router-link>
                    </li>
                    <li class="nav-item">
                        <a v-on:click="logout()" class="nav-link  text-white" href="#">Logout</a>
                    </li>
                </ul>
              
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: "HeaderNav",
    data() {
        return {
            NameSearch: "",
            suggestions: "",
           
        }
    },
    methods: {
        
        logout() {
            localStorage.clear();
            this.$router.push({ name: 'LogIn' })
        },

    }
}
</script>