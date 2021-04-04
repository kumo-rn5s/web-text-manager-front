<template>
  <div id = 'edittask'>
    <Hamburger_menu style="z-index: 10"></Hamburger_menu>
    <Date_time ref="timer" @sendtimer="GetTime"></Date_time>
    <div id="taskdata">
      <a>EditTask</a>
      <a> last save at {{modified_data}}</a>
    </div>
    <mavon-editor style="z-index: 5" ref="md" v-model="Task.task" language="en" @save="SendText"
                  :ishljs="ishljs"
                  :codeStyle="mycodestyle"
    />
  </div>
</template>

<script>
import Hamburger_menu from "@/components/hamburger_menu.vue"
import Date_time from "@/components/date_time.vue"
export default {
  name: "EditTask.vue",
  components: {Hamburger_menu, Date_time},
  data() {
    return {
      markdownText: '',
      mycodestyle: 'atom-one-dark',
      ishljs:'true',
      modified_data:'[ no saved ]',
      TimerID: 0,
      Task: {
        task: '# Edit task Yeah',
      },
    }
  },
  created() {
    this.axios.get('/task')
        .then(response => {
          if (response.data.redirect){
            this.$router.push('/')
          }
          this.Task = response.data;
          this.Task.task = atob(this.Task.task)
        })
        .catch(error => {
          console.log(error);
        })
    ////////////////////////////////////////////////////////////
    this.TimerID = setInterval(this.SendText, 120000)
    ///////////////////////////////////////////////////////////
  },
  methods: {
    SendText: function (value) {
      this.$refs.timer.gettime()
      this.markdownText = value;
      this.axios.post('/task', {
        "fileName-js": "task.md",
        "dataStream-js": this.markdownText,
      })
      .then(response => {
        if (response.data.redirect){
          this.$router.push('/')
        }
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
    },
    GetTime(timer){
      this.modified_data = timer
    }
  }
}
</script>

<style scoped>
div#edittask{
  color: aliceblue;
}
div#edittask>div#taskdata>a{
  font-size: x-large;
}
div#edittask>div#taskdata{
  display: flex;
  justify-content: space-between;
}
</style>
