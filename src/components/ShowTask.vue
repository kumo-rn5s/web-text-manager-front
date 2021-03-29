<template>
  <div id = "showtask">
    <div id="showtaskhead">
      <h1>Task</h1>
      <button type="button" v-on:click="MoveEditTask()">EditTask</button>
    </div>
    <div  id= "showtaskarea" v-html="task" ></div>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  name: "ShowTask",
  props:['task'],
  /*
  created() {
    this.axios.get('/task')
        .then(response => {
          console.log(response);
          this.Task = response.data;
          console.log("before")
          console.log(this.Task.task)
          this.Task.task = atob(this.Task.task)
          console.log("after")
          console.log(this.Task.task)
        })
        .catch(error => {
          console.log(error);
        })
  },*/
  methods: {
    MoveEditTask() {
      this.$router.push('/edittask')
    },
    bin2string(array) {
      return String.fromCharCode.apply(String, array);
    },
  },
  computed:{
    CompileMarkdownText:function (){
      return marked(this.Task.task)
    }
  },
}
</script>

<style scoped>

div#showtask > div#showtaskarea{
  background-color: aliceblue;
  color: black;
  height: 300px;
}
div#showtask > div#showtaskhead{
  display: flex;
  justify-content: space-between;
  top: 50%;
  align-items: flex-end;

}
div#showtask > div#showtaskhead > button{
  height: 50px;
  width: 200px;
  background-color: dimgray;
  color: aliceblue;
  font-size: x-large;
}

</style>
