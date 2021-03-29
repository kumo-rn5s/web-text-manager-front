<template>
  <div id="timer">
    {{timer}}
  </div>
</template>

<script>
export default {
name: "date_time.vue",
  data(){
    return{
      timer:'',
      timerID:0
    }
  },
  created(){
    this.timerID = setInterval(this.updateTime, 500)
  },
  methods:{
    updateTime:function (){
      let currentdate = new Date()
      var month = currentdate.getMonth()+1
      this.timer = currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds() + ' ' + currentdate.getDate() + '/' + month + '/' + currentdate.getFullYear()
    },
    gettime(){
      this.$emit('sendtimer',this.timer)
    }
  },
}
</script>

<style scoped>
div#timer{
  color: aliceblue;
  border: 1px double;
  width: 180px;
  font-size: x-large;
  text-align: right;
  margin-left: auto;
}
</style>
