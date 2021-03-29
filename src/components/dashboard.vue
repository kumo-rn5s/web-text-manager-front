<template>
  <div id="dashboard">
    <Hamburger_menu></Hamburger_menu>
    <div id="taskandbutton">
      <ShowTask id="showtask" :task=CompileMarkdownText></ShowTask>
      <div id="Button">
        <button type="button" v-on:click="MoveFileEditor()">Create New File</button>
        <button type="button" v-on:click="MoveShowAllFiles()">Show All Files</button>
        <button type="button" v-on:click="MoveShowAllFiles()">Upload file</button>
        <button type="button" v-on:click="MoveShowAllFiles()">Download file</button>
      </div>
    </div>
  </div>
</template>

<script>
import ShowTask from '@/components/ShowTask'
import Hamburger_menu from"@/components/hamburger_menu"
import marked from "marked";
export default {
  name: "MainVue.vue",
  components: { ShowTask,Hamburger_menu},
  data:function () {
    return {
      JSONData:{
        "username" : '',
        "profile_pic" : '',
        "last_login" : '',
        "task_list" : '',
      },
      errors: [],


    }
  },
  created: function () {
    this.axios.get('/dashboard').then(response => {
      console.log(response);
      this.JSONData = response.data
      // this.JSONData.task_list = this.CompileMarkdownText()
    }).catch(error => {
      this.errors.push(error);
      console.log(error);
    })
  },
  computed:{
    CompileMarkdownText:function (){
      var mdData = atob(this.JSONData.task_list)
      return marked(mdData)
    },
  },
  methods:{
    MoveFileEditor(){
      this.$store.commit('SetAccessFilePath', '')
      this.$router.push('/createfile')
    },
    MoveShowAllFiles(){
      this.$router.push('/showallfiles')
    },
  }
}
</script>

<style scoped>
div#dashboard{
  color:#E6E6E6;
}
div#dashboard>div#taskandbutton{
  width: 80%;
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  margin-right: auto;
}

div#dashboard>div#taskandbutton>#showtask{
  width: 50%;
}
div#dashboard>div#taskandbutton>#Button{
  display: flex;
  flex-flow: column;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
}
div#dashboard>div#taskandbutton>#Button>button{
  height: auto;
  background-color: dimgray;
  color: aliceblue;
  width: 400px;
  height: 75px;
  font-size: x-large;
}
</style>
