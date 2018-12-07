<template>
  <div class="home">
    <Discover/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Discover from "@components/Discover.vue";

@Component({
  components: {
    Discover
  }
})
export default class Home extends Vue {}
</script>
