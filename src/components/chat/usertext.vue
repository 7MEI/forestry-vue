<template>
  <div id="uesrtext">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'usertext',
  data () {
    return {
      content:''
    }
  },
  computed: mapState([
    'currentSession'
  ]),
  methods: {
    addMessage (e) {
      if (e.ctrlKey && e.keyCode ===13 && this.content.length) {
        let msgObj = new Object();
        console.log(e)
        msgObj.to = this.currentSession.username
        console.log("运行到这")
        console.log(this.currentSession.username)
        msgObj.content = this.content;
        console.log(msgObj.content)
        this.$store.state.stomp.send('/ws/chat',{},JSON.stringify(msgObj));

        this.$store.commit('addMessage',msgObj);
        this.content='';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#uesrtext {
	position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;
  > textarea {
  	padding: 10px;
  	width: 100%;
  	height: 100%;
  	border: none;
  	outline: none;
  }
}
</style>
