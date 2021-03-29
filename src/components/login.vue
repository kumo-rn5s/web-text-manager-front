<template>
  <div id="login">
    <h3><font color="#FF0706"> {{error_message}}</font></h3>
    <div id="form">
      <input style="height: 50px;width:250px;font-size: x-large" type="text" name="username" v-model="input.username" placeholder="Username" />
      <input style="height: 50px;width:250px;font-size: x-large" type="password" name="password" v-model="input.password" placeholder="Password" />
      <button style="height: 50px;width:260px;font-size: x-large" type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login.vue",
  data:function () {
    return {
      error_message:"",
      input: {
        username: "",
        password: ""
      },
    }
  },
  computed:{
    UserName() {
      return this.$store.state.UserName
    }
  },
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        this.axios.post('/login',{
          "username":this.input.username,
          "password":this.input.password
        }, {
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.result) {
            // use response.data to allocate JSON
            // response.data { result: true/false }
            this.error_message = 'clear!!!!!!'
            this.$router.push('/dashboard')
          }
          else{
            this.error_message = 'username or password not found'
          }
        })
        .catch(error => {
          this.error_message = 'username or password not found'
          console.log(error);
        })
      }else {
        this.error_message = "plese filled username or password"
      }
    },
  },
}
</script>

<style scoped>
#login {
  width: 500px;
  height: 200px;
  border: 1px solid #777777;
  background-color: #141920;
  color: #E6E6E6;
  margin-right:auto;
  margin-left:auto;
  margin-top: 50px;
  padding: 20px;
}
#form{
  display: flex;
  flex-flow: column;
  width:200px;
  margin-right:auto;
  margin-left:auto;
  align-items: center;
}
</style>