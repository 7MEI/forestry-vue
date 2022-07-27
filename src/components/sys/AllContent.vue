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
      <el-table-column property="message"></el-table-column>
      <el-table-column property="createDate"width="240"></el-table-column>
      <el-table-column width="240">
        <template #default="scope">
          <el-button type="primary" size="mini" plain @click="selectSend(scope.$index, scope.row)">推送</el-button>
          <el-button type="warning" size="mini" plain @click="addOrUpdate(scope.$index, scope.row,true)">修改</el-button>
          <el-button type="danger" size="mini" plain @click="deleteMessage(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="handle-row">
      <el-button type="primary" plain
                 @click="addMessage">
        添加消息</el-button>
    </div>
    <!--消息推送弹框-->
    <el-dialog title="消息推送" :visible.sync="dialogVisible"
               style="width: 1300px;margin: auto">
      <div>
        <span>选择推送范围:</span>
        <el-select size="small" v-model="content" placeholder="请选择" style="margin-left: 10px">
          <el-option
            v-for="item in selectAll"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="lookUser" size="small" style="margin-left: 10px"
                   :disabled="this.content===''?true:false">查看</el-button>
        <br>
        <span style="font-size: 12px;color: #999999;margin-left: 100px">推送的范围可以是全部用户或者单个用户</span>
        <div v-if="this.content===1&&this.hidden===true">
          <el-card class="box-card" style="color: red;font-size: 12px;margin-top: 10px;margin-bottom: 20px">
            该条通知已经推送给{{look.length}}个用户：{{look}}
          </el-card>
        </div>
        <!--穿梭框-->
        <el-transfer v-if="this.content===1" v-model="checked" :data="transferData" style="margin-top: 10px"
                     :titles="['未选中用户', '选中用户']" @change="getObject">
  <span slot-scope="{ option }">【{{ option.key }}】-{{ option.label }}
  </span>
        </el-transfer>
      </div>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureSend">确 定</el-button>
        </div>

    </el-dialog>
    <!--修改通知弹框-->
    <el-dialog :title="this.edit===true?'修改通知':'添加通知'" style="width: 1300px;margin: auto"
               :visible.sync="addOrUpdateDialogVisible">
      <span>消息类型:</span>
      <el-select size="small" v-model="message.title" placeholder="请选择" style="margin-left: 10px;margin-bottom: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <br>
      <span>通知内容:</span>
      <el-input
        style="margin-left: 10px;width: 500px"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="message.message">
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addOrUpdateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureAddUpdate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AllContent',
    data(){
      return{
        // 查看按钮按下时
        hidden:false,
        look:{},
        alwaysUser:[],
        content:'',
        read:[],
        dialogVisible: false,
        addOrUpdateDialogVisible:false,
        // 穿梭框左侧的数据
        transferData: [],
        // 穿梭框绑定的数据，选定到右侧框中的数据项的value组成的数组
        checked: [],
        message:{
          message:'',
          title: ''
        },
        msg:{
          mid:'',
          type:'',
          uid:'',
          state:0
        },
        edit:false,
        selectAll: [{
          value: 0,
          label: '全部用户'
        },{
          value: 1,
          label: '私信'
        }],
        options: [{
          value: '系统通知',
          label: '系统通知'
        }, {
          value: '公告',
          label: '公告'
        }, {
          value: '警报',
          label: '警报'
        },{
          value: '私信',
          label: '私信'
        }],
      }
    },
    mounted () {
      this.initTable();
    },
    methods: {
      // 确认推送
      sureSend(){
        if (this.content===1){
          this.msg.type=''
          // 循环将消息推送给用户
          for(let i = 0; i < this.checked.length; i++) {
            console.log('选中的用户为'+this.checked[i]);
            this.msg.uid=this.checked[i];
            console.log(this.msg)
            this.postRequest('/system/cfg/send',this.msg).then(resp => {
              if (resp) {
                console.log("1")
                this.$notify.success({ title: '成功', message: '消息推送成功' });
              }
            })
          }
        }else{
          this.msg.type=this.content;
          this.postRequest('/system/cfg/send',this.msg).then(resp => {
            if (resp) {
              console.log("2")
              this.$notify.success({ title: '成功', message: '消息推送成功' });
            }
          })
        }
        this.dialogVisible=false;
      },
      //查询全部数据
      initTable () {
        this.postRequest('/system/cfg/list').then(resp => {
          if (resp) {
            this.read = resp
            console.log(resp)
          }
        })
      },
      lookUser(){
        this.hidden=true
        if(this.alwaysUser[0].type===0){
          this.$notify.warning({ title: '警告', message: '已推送给了全部用户' });
        }else if(this.content===''){
          this.$notify.info({ title: '消息', message: '该条通知未推送' });
        }else{
          let arrayPush = []
          for(let i = 0; i < this.alwaysUser.length; i++) {
            // 根据id查出用户名
            console.log("换行",this.alwaysUser[i].uid)
            this.postRequest('/system/cfg/userById/'+this.alwaysUser[i].uid).then(resp => {
              if (resp) {
                arrayPush.push(resp)
                // console.log(this.alwaysUser[i].uid+"——用户名为——"+resp)
                // let temp = JSON.parse(resp)
                // this.$set(this.look, this.alwaysUser[i].uid, temp);
              }
            })
          }
          this.look=arrayPush
          console.log(this.look)
        }
      },
      selectSend(index,data){
        // 存放通知过的用户
        this.look=''
        // 消息表
        this.alwaysUser=''
        // 在推送之前查出全部已经推送的用户
        this.postRequest('/system/cfg/send/'+data.id).then(resp => {
          if (resp) {
            this.alwaysUser = resp
            // 推送给了全部用户
            if (this.alwaysUser[0].type===0) {
              this.content=0
              // 推送给了部分用户
            }else if(this.alwaysUser[0].uid){
              this.content=1
            }else{
              // 未推送过
              this.content=''
            }
            console.log(resp)
          }
        })
        this.dialogVisible=true;
        this.msg.mid=data.id;
        console.log(this.msg.mid)
        this.getList();
      },
      addOrUpdate(index,data,edit){
        this.addOrUpdateDialogVisible=true
        if (edit=true){
          this.edit=true;
        }
        console.log(data)
        Object.assign(this.message,data);
      },
      addMessage(){
        this.message={},
        this.addOrUpdateDialogVisible=true
      },
      sureAddUpdate(){
        if(this.edit===true){
          // 修改
          this.putRequest('/system/cfg/update',this.message).then(resp => {
            if (resp) {
              this.initTable()
              this.addOrUpdateDialogVisible=false
              this.$notify.success({ title: '成功', message: '修改通知成功' });
            }
          })
        }else {
          // 添加
          this.postRequest('/system/cfg/add',this.message).then(resp => {
            if (resp) {
              this.initTable()
              this.addOrUpdateDialogVisible=false
              this.$notify.success({ title: '成功', message: '添加通知成功' });
            }
          })
        }
      },
      // 删除
      deleteMessage(index,data){
        this.$confirm('确定删除该条通知吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/cfg/delete/'+data.id).then(resp => {
            if (resp) {
              this.initTable()
            }
          })
          this.$notify.success({ title: '成功', message: '删除通知成功' });
        }).catch(() => {
          this.$notify.info({ title: '消息', message: '已取消删除' });
        });
      },
      // 查询列表数据
      getList() {
        this.getRequest('/chat/admin').then(response => {
          if (response){
            // 有数据
            const allData = response
            const data = []
            for(let i = 0; i < allData.length; i++) {
              data.push({
                key: allData[i].id,
                label: allData[i].name,
              })
            }
            this.transferData = data
          }else {
            // 无数据
          }
        }).catch(() => {
        })
      },
      // 右侧列表元素变化时触发
      getObject(value, direction, movedKeys) {
        console.log(value, direction, movedKeys, '********')
        console.log('选中的数据有:' + this.checked)
      },
    }
  }
</script>

<style scoped>

  .handle-row {
    margin-top: 30px;
  }
  .dialog-footer{
    margin-top: 20px;
    margin-left: 350px;
  }
</style>
