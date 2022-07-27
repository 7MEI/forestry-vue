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
          <el-badge is-dot class="item">
            <el-button class="share-button" size="small" @click="handleRead(scope.$index, scope.row)">标为已读</el-button>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'NoReadContent',
    data(){
      return{
        user:JSON.parse(window.sessionStorage.getItem('user')),
        msg:[],
        read:[],
      }
    },
    mounted () {
      this.initTable();
    },
    methods: {
      // 标为已读
      handleRead(index,data){
        this.getRequest('/system/cfg/update/'+data.id+'?uid='+this.user.id).then(resp => {
          if (resp) {
            this.$notify.success({ title: '成功',message:'通知已读'});
            this.initTable()

          }
        })
      },
      //查询全部数据
      initTable () {
        // 刷新数据时清空
        if (this.read){
          this.read=[]
        }
        // 根据用户名查询未读通知列表
        this.postRequest('/system/cfg/my_msg/'+this.user.id+'?state='+0).then(resp => {
          if (resp) {
            console.log(resp)
            this.msg = resp
            for(let i = 0; i < this.msg.length; i++) {
              console.log("哈喽")
              // 根据通知id循环查询通知添加到数组对象中
              this.getRequest('/system/cfg/my_content/'+this.msg[i].mid).then(resp => {
                if (resp) {
                  console.log(resp)
                  this.read.push(resp)
                }
              })
            }
            console.log('this.read='+this.read)
          }
        })

      },

    }
  }
</script>

<style scoped>
  .item {
    margin-top: 5px;
  }
</style>
