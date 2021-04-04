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
      <a id="logout">
        <span><router-link to="/dashboard" @click.native="Logout()">Logout</router-link></span>
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
  methods:{
    Logout(){
      this.axios.get('/logout').then(response => {
        if (response.data.redirect){
          this.$router.push('/')
        }
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    }
  }
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
