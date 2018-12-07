<template>
  <div id="app">
    <Navbar/>
    <section class="main">
      <router-view>Nothing loaded</router-view>
    </section>
    <Footer/>
  </div>
</template>

<style lang="scss">
// $teal: #01d277;
// .btn-teal{
//   background-color:$teal;
//   color:white;
//   &:hover{
//     background-color: darken($teal, 5%);
//   }
// }
// a.btn-teal:hover{
//   text-decoration:underline;
//   color:white;
// }

html,body{
  height:100%;
}
body.default{
  #app{
    height:100%;
    display:flex;
    flex-direction: column;
    > section.main{
      flex:1 1 80%;
    }
    > footer{
      @extend .pt-4;
      flex:0 1 150px;
    }
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@components/Navbar.vue';
import Footer from '@components/Footer.vue';
@Component({
  components:{
    Navbar,
    Footer
  }
})
export default class Home extends Vue {}
</script>
