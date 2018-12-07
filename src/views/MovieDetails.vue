<template>
    <section class="movie-details">
        <div class="container-fluid backdrop" v-if="details.backdrop_path" :style="{backgroundImage: backgroundImage }">
            <div class="row backdrop-row">
                <div class="col text-center backdrop-text" style="margin-bottom:50px;">
                    <h1 class="text-white">{{ details.title }}</h1>
                    <h3 class="text-white font-italic" style="text-decoration:underline;" v-if="details.tagline">{{
                        details.tagline }}</h3>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row info-row">
                <section class="col-12 col-md-4">
                    <h3>Random Info</h3>
                    <a :href="details.homepage" target="_blank">Homepage</a> <br>
                    <span v-if="details.budget">Budget (USD): {{ budgetUsd }}<br></span>
                    Vote Average: <span :title="details.vote_count + ' votes'">{{details.vote_average}} /10 </span>
                </section>
                <div class="col-12 col-md-8">
                    <h3>Overview</h3>
                    <p class="overview">
                        {{ details.overview }}
                    </p>
                </div>
            </div>
            <div class="row cast-row">
                <div class="col">
                    <Loading v-if="!cast.length" />
                    <div class="cast py-2" v-else>
                        <h3 class="text-center">Cast</h3>
                        <div class="card-deck">
                            <b-card tag="section" :img-src="buildProfileUri(actor.profile_path)" 
                                :img-alt="actor.name" class="actor" 
                                v-for="(actor, index) in cast.slice(0,4)" 
                                :key="index">
                                <div class="row">
                                    <div class="col">
                                        <h6 class="text-center">{{actor.name}} <small> as </small></h6>
                                        <h4 class="text-center">{{actor.character}}</h4>
                                    </div>
                                </div>
                            </b-card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { CurrencyFormat } from '@lib/Helpers';
import Loading from '@components/Loading';

interface detailsInterface {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    poster_path: string;
    budget: number;
    [key: string]: any;
}
interface castInterface {
    cast_id: number;
    character: string;
    gender: number;
}
interface dataInterface {
    id?: string;
    details: detailsInterface;
    cast: object[]
}
export default Vue.extend({
    mounted() {
        this.$tmdb.get('movie/' + this.id).then(({ data }) => {
            this.details = data;
            return data;
        });
        this.$tmdb.get('movie/' + this.id + '/credits').then(({ data }) => {
            this.cast = data.cast;
        });
    },
    computed: {
        backgroundImage(): string {
            return 'url(' + this.$tmdb.buildImageUri(this.details.backdrop_path, 'w1280') + ')';
        },
        budgetUsd(): string {
            return CurrencyFormat(this.details.budget);
        }
    },
    data(): dataInterface {
        return {
            id: this.$route.params.id,
            details: {
                adult: false,
                backdrop_path: '',
                belongs_to_collection: {},
                poster_path: '',
                budget: 0
            },
            cast: []
        };
    },
    methods: {
        buildProfileUri(image:string ): string{
            return this.$tmdb.buildImageUri(image, 'w300');
        }
    },
    components: {
        Loading
    }
});
</script>


<style lang="scss">
    p.overview::first-line {
        font-size:130%;
        font-style: italic;
        text-align:left;
    }
    .backdrop {
        background-size:100%;
        background-repeat:no-repeat;
        background-position:center 0;
        background-color:lightgrey;
        background-attachment: fixed;
        .backdrop-row {
            align-items: flex-end;
            min-height: 450px;
            .backdrop-text {
                text-shadow:
                    1px 1px 5px black,
                    -1px -1px 5px black;
            }
        }
    }
    .actor-image{
        background-size:contain;
        background-repeat:no-repeat;
    }
    .info-row{
        padding:25px 5px;
    }
</style>