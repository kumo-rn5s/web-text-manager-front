<template>
  <div id="CreateFile">
    <Hamburger_menu style="z-index: 10"></Hamburger_menu>
    <Date_time ref="timer" @sendtimer="GetTime"></Date_time>
    <div id="filedata">
      <div id="filetitle">
        <input type="text" id="titleName" v-model="titleName">
        <a>.md</a>
      </div>
      <a>last save at {{modified_data}}</a>
    </div>
    <mavon-editor style="z-index: 5" ref="md" v-model="Content" language="en" @save="SendText"
                  :ishljs="ishljs"
                  :codeStyle="mycodestyle"
    />
  </div>
</template>

<script>

import Hamburger_menu from"@/components/hamburger_menu"
import Date_time from "@/components/date_time.vue"
export default {
  name: "Createfile.vue",
  data(){
    return{
      mycodestyle: 'atom-one-dark',
      ishljs:'true',
      markdownText: '',
      markdownName: '',
      modified_data:'[ no saved ]',
      Content:"",
      TimerID:0,
      titleName:this.$store.getters.GetAccessFilePath,
      dataStream:{
        "fileName-js":'',
        "dataStream-js":'',
      },
    }
  },
  components: {Date_time, Hamburger_menu},
  created:function(){
    this.TimerID = setInterval(this.TimerID)
    console.log(this.$store.getters.GetAccessFilePath)
    this.axios.get('/getFile', {
        params: {
          // ここにクエリパラメータを指定する
          // FileName: "tes2.md"
          FileName:this.$store.getters.GetAccessFilePath
        }
    }).then(response => {
      if (response.data.redirect){
        this.$router.push('/')
      }
      console.log(response.data)
      if (!(response.data.isNew)) {
        this.dataStream = response.data.JSONData
        this.Content = this.dataStream["dataStream-js"]
        this.titleName = this.dataStream["fileName-js"]
      }
    }).catch(error => {
        console.log(error);
    })
  },
  methods:{
    SendText:function (value){
      console.log(value)
      if(this.titleName != "") {
        this.markdownName = this.titleName + ".md"
        this.markdownText = value;
        console.log(this.titleName)
        this.axios.post('/saveFile', {
          "fileName-js": this.markdownName,
          "dataStream-js": this.markdownText,
        }).then(response => {
          if (response.data.result) {
            this.$refs.timer.gettime()
          } else {
            console.log("save failed")
          }
          if (response.data.redirect){
            this.$router.push('/')
          }
        }).catch(error => {
          console.log(error);
        })
      }
    },
    GetTime(timer){
      this.modified_data = timer
    }
  }
}
</script>

<style scoped>
div#CreateFile >div#filedata>div#filetitle> input{
  width: 40%;
  height: 30px;
  font-size: x-large;
}
div#CreateFile >div#filedata>div#filetitle{
  width: 50%;
}
div#CreateFile>div#filedata{
  display: flex;
  justify-content: space-between;
  font-size: x-large;
  width: auto;
}
div#CreateFile{
  color: aliceblue;
}
</style>