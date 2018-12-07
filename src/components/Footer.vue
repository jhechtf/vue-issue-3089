<template>
    <footer class="bg-dark text-white">
        <div class="container">
            <section class="row">
                <div class="col-12 col-md-4">
                    <img src="@/assets/tmdb-logo.svg" alt="The Movie Database" style="float:left;width:75px;vertical-align:top;">
                    This SPA was built as a proof-of-skill
                </div>
                <div class="col-12 col-md-6">
                </div>
            </section>
        </div>
    </footer>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({})
    export default class Navbar extends Vue {}
</script>