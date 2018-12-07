import Tmdb from '@lib/tmdb/tmdb';

declare module "vue/types/vue" {
  interface Vue {
    $tmdb: Tmdb;
  }
}

declare module '*.vue' {
  import Vue from 'vue/types/vue';
  export default Vue;
}