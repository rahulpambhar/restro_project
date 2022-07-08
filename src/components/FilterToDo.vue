<template>
    <div class="col mt-2">
        <h5 class="text-primary d-inline ">Filter ToDos:</h5>
        <select class="mx-2" @click="FilterToDo($event)">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>
    </div>
    <div class="col">
        <section>
            <p>

                <i class="fa-solid fa-angles-left text-info cursor-pointer " @click="changePage(0)"></i> |
                <i class="fa-solid fa-angle-left" @click="changePage(-1)"></i> |
                <span class="text-success">
                    SHOWING {{ page }} OF {{ pages }}
                </span>
                | <i class="fa-solid fa-angle-right" @click="changePage(1)"></i>
                | <i class="fa-solid fa-angles-right text-info" @click="changePage(pages)"></i>


            </p>
            <h3 class="text-dark">Total records:{{ this.totalRecords }}</h3>
        </section>
    </div>
</template>

<script>

// import { mapActions } from 'vuex'
export default {
    props: ['totalRecords'],
    name: "FilterToDo",
    data: function () {
        return {
            page: 1,
            limit: '',
            perPage: ''

        }
    },
    created() {
        this.changePage(0)
    },
    computed: {
        pages() {

            const reminder = this.totalRecords % this.perPage
            console.log(this.perPage);
            if (reminder > 0) {
                return Math.floor(this.totalRecords / this.perPage) + 1
            } else {

                return this.totalRecords / this.perPage

            }
        }
    },
    methods: {

        FilterToDo(e) {
            this.perPage = parseInt(e.target.options[e.target.options.selectedIndex].innerText)

        },

        changePage(val) {

            switch (val) {
                case 0: this.page = 1; break;
                case -1: this.page = this.page > 1 ? this.page - 1 : this.page; break;
                case 1: this.page = this.page < this.pages ? this.page + 1 : this.page; break;
                case this.pages: this.page = this.pages; break;
            }
            if (this.perPage == 0) {
                this.perPage=5
                this.$emit('input', { page: this.page, perPage: this.perPage })
            } else {
                this.$emit('input', { page: this.page, perPage: this.perPage })
            }
           
        }
    }
}
</script>