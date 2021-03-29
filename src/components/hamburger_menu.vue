<template>
  <div id="Hamburger_menu">
    <Slide noOverlay="true">
      <a id = "dashboard">
        <span><router-link to="/dashboard">dashboard</router-link></span>
      </a>
      <a id = "edittask">
        <span><router-link to="/edittask">EditTask</router-link></span>
      </a>
      <a id = "showallfiles">
        <span><router-link to="/showallfiles">ShowAllFiles</router-link></span>
      </a>
      <a id = "login">
        <span><router-link to="/login">Logout</router-link></span>
      </a>
      <a id="userinfo">
        <span><router-link to="/userinfo">UserInfo</router-link></span>
      </a>
      <router-view></router-view>
    </Slide>
  </div>
</template>

<script>
import {Slide} from 'vue-burger-menu'
export default {
  name: "hamburger_menu.vue",
  components:{
    Slide,
  },
}
</script>

<style>
body{
  color:#E6E6E6;
}
a{
  color: #E6E6E6;
}
a:hover{
  color: #6495ed;
}
</style>
