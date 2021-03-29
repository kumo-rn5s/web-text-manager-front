<template>
  <div id="app">
      <Header></Header>
      <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
#app{
  top:0px
}
 body{
   background-color: #23282F
 }
</style>
