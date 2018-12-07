<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container justify-space-between">
                <div class="logo">
                    F<span class="d-none d-md-inline-block">ind&nbsp;</span>T<span class="d-none d-md-inline-block">hat&nbsp;</span>T<span class="d-none d-md-inline-block">hing</span>
                </div>
                <div class="search-container">
                    <form action="#/" method="post" @submit.prevent="search">
                        <input type="search" class="navbar-search" v-model.trim="searchQuery" placeholder="Search for Movies, TV, or People!">
                        <button type="button" class="search-button" @click="search()"><i class="fas fa-search"></i></button>
                    </form>
                </div>
                <div class="text-white router-links">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link active-class="active" to="/" class="nav-link">Home</router-link>
                        </li>
                        <li v-if="this.$route.name === 'search-results'">we have search results</li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    interface navbarData {
        searchQuery: string
    }
    @Component({
        data(): navbarData{
            return {
                searchQuery: ''
            }
        },
        methods: {
            test() {
                console.log("JIM WHAT ARE YOU DOING?!");
            },
            search(e): boolean {
                // First we have to update the data in our store
                this.$store.commit('updateSearch', { searchQuery: this.searchQuery });
                // Let's make it look like we've gone to a new page
                this.$router.push({
                    name:'search-results',
                    params:{
                        query: this.searchQuery
                    }
                });
            }
        }
    })
    export default class Navbar extends Vue {}
</script>

<style lang="scss">
    .logo{
        color:white;
    }
    .navbar-search{
        padding:5px 25px;
        font-size:1.1rem;
        border-radius:25px;
        border:1px solid gray;
        height:50px;
        transition:width 400ms ease-in;
        text-align:center;
        width:350px;
        &:focus{
            width:500px;
            & + button.search-button{
                display:inline-block;
            }
        }
    }

    button.search-button{
        display:none;
        font-size:25px;
        padding:5px 0;
        margin-left:-50px;
        color:lightgrey;
        background-color:transparent;
        border:0;
    }
</style>
