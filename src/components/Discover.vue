<template>
    <section class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2 class="text-center">Discover New Movies</h2>
                    <!-- display only if we have data to display -->
                    <div class="card-deck" v-if="hasData">

                        <div class="card poster" :key="movie_index" v-for="(movie, movie_index) in discover.slice(startIndex,endIndex)">
                            <router-link :to="'/movie/'+movie.id">
                                <div class="poster-wrapper">
                                    <img :src=" getPoster(movie.poster_path) " :alt="movie.title" class="img-fluid">
                                    <div class="poster_description-text">
                                        <section class="poster_description-text_main">
                                            {{movie.overview}}
                                        </section>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        
                    </div>

                    <!-- If the data is currently not loaded, we give the user something to let them know that the page is loading -->

                    <div class="card-deck" v-else>
                        <div class="card poster">
                            <div class="poster-wrapper"><img src="https://placehold.it/300x500" class="img-fluid" alt=""></div>
                        </div>
                        <div class="card poster">
                            <div class="poster-wrapper"><img src="https://placehold.it/300x500" class="img-fluid" alt=""></div>
                        </div>
                        <div class="card poster">
                            <div class="poster-wrapper"><img src="https://placehold.it/300x500" class="img-fluid" alt=""></div>
                        </div>
                        <div class="card poster">
                            <div class="poster-wrapper"><img src="https://placehold.it/300x500" class="img-fluid" alt=""></div>
                        </div>
                        <div class="card poster">
                            <div class="poster-wrapper"><img src="https://placehold.it/300x500" class="img-fluid" alt=""></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <p class="font-italic">These are the movies that have risen quickly in ratings, maybe give them a look!</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.poster-wrapper{
    position:relative;
    height:100%;
    overflow:hidden;
}
.poster-wrapper:hover .poster_description-text{
    top:0;
    right:0;
    bottom:0;
    left:0;
    display:block;
}
.poster-wrapper .poster_description-text{
    transition:all 400ms ease-in;
    position:absolute;
    display:none;
    background-color:rgba(0,0,0,0.4);
    color:white;
    padding:10px 8px;
    text-align:left;
}
.poster_description-text_main{
    display:none;
}
.poster-wrapper:hover .poster_description-text_main{
    display:block;
    overflow:hidden;
    text-overflow: ellipsis;
}
</style>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data(){
        return {
            page:0,
            discover:[]
        }
    },
    computed:{
        hasData(): boolean{
            return this.discover.length > 0
        },
        startIndex(): number{
            return this.page * 5;
        },
        endIndex(): number{
            return (this.page + 1 ) * 5;
        }
    },
    methods:{
        getPoster(url:string): string{
            return this.$tmdb.buildImageUri(url, 'w300')
        }
    },
    mounted(){
        
        this.$tmdb.get('discover/movie',{
            params:{
                "vote_avg.gte": 7
            }
        }).then(({ data })=>{
            this.discover = data.results
        });
    }
})
</script>
