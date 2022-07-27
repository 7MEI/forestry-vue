<template>
  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="消息推送" name="AllContent" >
        <AllContent></AllContent>
      </el-tab-pane>
      <el-tab-pane label="未读消息" name="NoReadContent">
        <NoReadContent></NoReadContent>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="ReadContent">
        <ReadContent></ReadContent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NoReadContent from '../../components/sys/NoReadContent'
import ReadContent from '../../components/sys/ReadContent'
import AllContent from '../../components/sys/AllContent'
export default {
  name: 'SysLog',
  data(){
    return{
      activeName:'AllContent',
      user:JSON.parse(window.sessionStorage.getItem('user')),
    }
  },
  mounted () {
  },
  methods: {
  },
  components:{
    NoReadContent,
    ReadContent,
    AllContent
  }
}
</script>

<style scoped>
</style>