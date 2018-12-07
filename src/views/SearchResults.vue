<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <h3 class="text-center">Search Results for "{{searchQuery}}"</h3>
            </div>
        </div>
        <div class="row py-2" v-if="!dataLoaded">
            <Loading/>
            {{results.length}} {{dataLoaded}}
        </div>
        <div class="row" v-else-if="!results.length && dataLoaded">
            <div class="col">
                <p class="lead font-italic text-center">We're sorry, but your search did not return any results</p>
            </div>
        </div>
        <div class="row py-2 my-3 border shadow" v-for="(result, result_index) in results" :key="result_index">
            <div class="col-2"><img :src="buildImage(result.poster_path || result.profile_path || '', 'w180')" alt="" class="img-fluid"></div>
            <div class="col-10">
                <h4> {{ result.name || result.title }} </h4>
                <h5>{{ capitalize(result.media_type) }} </h5>
                <p class="description">
                    {{ result.overview || 'No Description Given' }}
                </p>
                <p v-if="result.vote_average!=null">
                    <strong>Rating</strong> {{result.vote_average}} (<small>{{result.vote_count }} votes</small>)
                </p>
                <router-link :to="'/'+result.media_type+'/'+result.id" class="btn btn-teal">View More</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// We're going to need 
import Vue from 'vue';
import Loading from '@components/Loading.vue';

// because I do not feel like having to actually go through and name each of these things.
interface searchObjectInterface{
    [key: string]: any;
}
// Search data interface
interface searchDataInterface{
    results: searchObjectInterface[];
    currentPage: number;
    dataLoaded: boolean;
}
// Export our vue instance
export default Vue.extend({
    components:{
        Loading
    },
   data(): searchDataInterface {
       return {
           results: [],
           currentPage: 1,
           dataLoaded: false
       }
   },
   computed: {
       searchQuery(): string{
           return this.$store.state.searchQuery ;
       },
       loading(): boolean{
           return !this.results.length || 
       }
   },
   methods: {
       buildImage(image?: string): string{
           // If we have an item that does not have a poster, then we simply use a placeholder image
           return !image ? 'https://placehold.it/300x400?text=No+Image+Available' : this.$tmdb.buildImageUri(image, 'w300');
       },
       capitalize(str: string): string{
           str = str.toLowerCase();
           return str.charAt(0).toUpperCase() + str.slice(1);
       },
       nextPage() {
           this.currentPage++;
       },
       prevPage() {
           this.currentPage--;
       },
       goToPage(page:number ) {
           this.currentPage = page;
       },
       loadResults(): void{
            this.$tmdb.get('search/multi', {
                params: {
                    query: this.searchQuery,
                    page: this.currentPage
                }
            }).then(({ data }) => {
                this.results = data.results;
                this.dataLoaded = true;
            })           
       } 
   },
   beforeUpdate(): void{
       console.log("updated");
       this.loadResults();
   },
   mounted(): void{
       this.loadResults();
   } 
});
</script>
