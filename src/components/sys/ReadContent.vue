<template>
  <div>
    <el-table :data="read"
              :show-header="false"
              style="width: 100%">
      <el-table-column property="title" width="180">
        <template #default="scope">
          【{{scope.row.title}}】
        </template>
      </el-table-column>
      <el-table-column property="message" ></el-table-column>
      <el-table-column property="createDate"width="240"></el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button type="danger" plain size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'readContent',
    data(){
      return{
        read:[],
        user:JSON.parse(window.sessionStorage.getItem('user')),
        msg:[],
      }
    },
    mounted () {
      this.initTable();
    },
    methods: {
      // 删除通知
      handleDelete(index,data){
        if(data.title==='私信'){
          this.deleteRequest('/system/cfg/deleteMsg/'+data.id+'?uid='+this.user.id).then(resp => {
            if (resp) {
              console.log(resp)
            }
          })
        }else{
          this.$notify.warning({ title: '警告', message:'不能删除系统通知'});
        }
      },
      //查询全部数据
      initTable () {
        this.postRequest('/system/cfg/my_msg/'+this.user.id+'?state='+1).then(resp => {
          if (resp) {
            this.msg = resp
            console.log(resp)
            for(let i = 0; i < this.msg.length; i++) {
              // let number = parseInt(this.msg[i].mid)
              console.log("哈喽")
              this.getRequest('/system/cfg/my_content/'+this.msg[i].mid).then(resp => {
                if (resp) {
                  // let parse = JSON.parse(resp)
                  this.read.push(resp)
                }
              })
            }
            console.log(this.read)
          }
        })

      },

    }
  }
</script>

<style scoped>
</style>
