<template>
  <div>
    <!--  用户列表卡片v-if="foo"-->
    <el-card class="box-card">
      <el-form :inline="true" :model="userVo"  class="demo-form-inline">
        <el-form-item label="姓名:" label-width="70px">
          <el-input v-model="userVo.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" label-width="70px">
          <el-select v-model="userVo.departmentI" placeholder="请选择">
            <el-option
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.deptCount}}
                </span></span>
            </el-option>
          </el-select>
        </el-form-item>
        <!--      地址-->
        <el-form-item label="地址:" label-width="70px">
          <el-input v-model="userVo.address" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!--      性别-->
        <el-form-item label-width="70px" label="性别:">
          <el-radio v-model="userVo.sex" label="1">女</el-radio>
          <el-radio v-model="userVo.sex" label="0">男</el-radio>
        </el-form-item>
        <!--      昵称-->
        <el-form-item label="用户名:" label-width="70px">
          <el-input clearable v-model="userVo.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <!--      按钮-->
        <el-form-item style="margin-left: 10px">
          <el-button icon="el-icon-refresh" @click="resetUserVo">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="initUser('advanced')">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addShow(false)">添加</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
          <el-button type="danger" icon="el-icon-delete" :disabled="multipleSelection.length==0" @click="deletemany" >批量删除</el-button>
        </el-form-item>
      </el-form>
      <!--卡片-->
      <div class="User-container">
            <el-card class="cardInfo-container" v-for="(admin,index) in Users" :key="index">
              <div slot="header"  style="font-family:华文行楷;font-size:25px">
                <span>{{admin.name}}</span>
                <el-button style="float: right; padding: 3px 0;color: crimson" type="text" icon="el-icon-delete" @click="deleteUser(admin)"></el-button>
              </div>
              <div>
                <div>
                  <div class="img-container">
                    <img :src="admin.picture" :alt="admin.name" :title="admin.name" class="picture-container">
                  </div>
                  <div class="Info-container">
                    <div>用户名：{{admin.name}}</div>
                    <div>手机号码：{{admin.phone}}</div>
                    <div>邮箱：{{admin.telephone}}</div>
                    <div>地址：{{admin.address}}</div>
                    <div>用户状态：
                      <el-switch
                      v-model="admin.enabled"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      @change="enabledChange(admin)"
                      active-text="启用"
                      inactive-text="禁用">
                      </el-switch>
                    </div>
                    <div>
                      所属部门：
                      <el-tag style="margin-right: 5px;" size="mini" type="success" v-for="(dep,indexd) in admin.departments" :key="indexd" >
                        {{dep.name}}
                      </el-tag>
                      <el-popover
                          placement="right"
                          title="部门列表"
                          width="200"
                          @show="showDeps(admin)"
                          @hide=""
                          trigger="click">
                        <el-select v-model="selectDep" multiple placeholder="请选择">
                          <el-option
                              v-for="(d,indexde) in AllDep"
                              :key="indexde"
                              :label="d.name"
                              :value="d.id">
                          </el-option>
                        </el-select>
                        <template #reference>
                          <el-button style="color: red" type="text" icon="el-icon-more"></el-button>
                        </template>
                      </el-popover>
                    </div>
                    <div>
                      用户角色：
                      <el-tag style="margin-right: 5px;" size="mini" type="success" v-for="(role,indexj) in admin.roles" :key="indexj" >
                        {{role.nameZh}}
                      </el-tag>
                      <el-popover
                          placement="right"
                          title="角色列表"
                          width="200"
                          @show="showRoles(admin)"
                          @hide="hideRoles(admin)"
                          trigger="click">
                        <el-select v-model="selectRoles" multiple placeholder="请选择">
                          <el-option
                           v-for="(ro,indexxj) in AllRoles"
                          :key="indexxj"
                          :label="ro.nameZh"
                          :value="ro.id">
                          </el-option>
                        </el-select>
                        <template #reference>
                          <el-button style="color: red" type="text" icon="el-icon-more"></el-button>
                        </template>
                      </el-popover>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </el-card>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      id:'',
      isEdit:'',
      multipleSelection: [],
      Users: [],
      AllRoles: [],
      AllDep: [],
      selectRoles: [],
      selectDep:[],
      departments: [],
      user: {
        picture: null,
        username: undefined,
        name: undefined,
        sex: undefined,
        password: undefined,
        phone: undefined,
        telephone: undefined,
        address: null,
        departmentI: null,
      },
      userVo: {
        departmentI: '',
        username: '',
        address: '',
        sex: '',
        name: '',
      },
      edit: '',
      showDialog: false,
      imagecropperKey: 0, // 上传组件id
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }],
        sex: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入地址',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        telephone: [{
          required: true,
          message: '请输入家庭联系电话',
          trigger: 'blur'
        }],
      },
      sexOptions: [{
        "label": "男",
        "value": 0
      }, {
        "label": "女",
        "value": 1
      }],
    }
  },

  created(){
  },
  //点进页面自动查询所有用户信息
  mounted() {
  this.initUser();
  },
  methods: {
    //弹出框是展示所有部门
    showDeps(admin){
      this.initDep()
      let departments = admin.departments
      //初始化selectRoles
      this.selectDep=[]
      //循环已有角色并显示在选择框
      departments.forEach(dd=>{
        this.selectDep.push(dd.id)
      })
    },
    //隐藏时更新修改角色
    hideRoles(admin){
      let url = '/user/info/updateRole?adminId='+admin.id
      this.selectRoles.forEach(sr =>{
        url +='&rids=' +sr
      })
      this.putRequest(url).then(resp=>{
        if (resp){
          this.initUser()
        }
      })
    },
    //弹出框是展示所有角色
    showRoles(admin){
      this.initAllRoles()
      let roles = admin.roles
      //初始化selectRoles
      this.selectRoles=[]
      //循环已有角色并显示在选择框
      roles.forEach(ro=>{
        this.selectRoles.push(ro.id)
      })
    },
    //初始化所有部门
    initDep(){
      this.getRequest('/department/deps/AllDep').then(resp=>{
        if (resp){
          this.AllDep = resp;
        }
      })
    },
    //初始化所有角色
    initAllRoles(){
      this.getRequest('/user/info/roles').then(resp=>{
        if (resp){
          this.AllRoles = resp;
        }
      })

    },

    //用户启动与禁用
    enabledChange(admin){
      this.putRequest('/user/info/updateAdmin',admin).then(resp=>{
        if (resp){
          this.initUser();
        }
      })
    },
    //确认添加或者修改
    toAddOrUpdate(edit){
      console.log(this.isEdit)
      if(this.isEdit==false) {
        this.$refs.elForm.validate((valid) => {
          if (valid) {
            this.postRequest('/user/info/addAdmin', this.user).then(resp=> {
              if (resp) {
                this.initUser()
                this.showDialog = false
              }
            })
          }else{
            this.$message.error('有必填项为空！')
          }
        })
      }
      else{
        this.$refs.elForm.validate((valid) => {
              if (valid) {
                this.putRequest('/user/info/updateAdmin',this.user).then(resp=>{
                  if (resp) {
                    this.initUser()
                    this.showDialog = false
                  }
                })
              }else {
                this.$message.error('有必填项为空！')
              }
              })
              }
    },
    //取消添加或修改
    toCancel(){
      this.showDialog = false
    },
    //打开添加弹窗
    addShow(edit){
      this.showDialog = true
      this.isEdit=edit
      console.log(this.isEdit)
      console.log("打开添加时输出edit值")
      this.restDialog()
      this.user.picture='https://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/10/22/9031c44e733747f39cb63f45443e61b1.jpg'
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    updateShow(index,data,edit){
      this.isEdit=edit;
      console.log(this.isEdit)
      this.showDialog = true
      Object.assign(this.user,data);
      this.Users.picture = data.picture
    },
    //清空dialog
    restDialog(){
          this.user.picture=''
          this.user.telephone=''
          this.user.sex=''
          this.user.password=''
          this.user.address=''
          this.user.name=''
          this.user.phone=''
          this.user.username=''
          this.user.departmentI=''
    },
    //显示弹出框赋值
    addUpdate(index,data,edit){
      //显示头像
      // this.hidden=true;
      // if (edit){
      //   this.id=id;
      // }
      this.isEdit=edit;
      this.addOrUpdateVisible=true;
      this.Userdata=Object.assign(this.user,data);
      // this.user.picture=data.picture;
    },


    // 监听 子组件弹窗关闭后触发，有子组件调用
    showUpdate(data){
      if(data === 'false'){
        this.UpdateVisible = false
      }else{
        this.UpdateVisible = true
        // Object.assign(this.user,data);
      }
    },
    showAddOrUpdate(data){
      if(data === 'false'){
        this.addOrUpdateVisible = false
      }else{
        this.addOrUpdateVisible = true
      }
    },
    //删除用户
    deleteUser(admin) {
      this.$confirm('此操作将永久删除该['+admin.name+']用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/user/info/' +admin.id).then(resp=>{
          if (resp){
            this.initUser();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //批量删除
    deletemany() {
      this.$confirm('此操作将永久删除该['+this.multipleSelection.length+']个用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获得所有id，ids
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest('/user/info/'+ ids).then(resp=>{
          if (resp){
            this.initUser();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(val);
    },
    //  重置表单
    resetUserVo(){
      this.userVo.departmentI = ''
      this.userVo.username= ''
      this.userVo.address= ''
      this.userVo.name= ''
      this.userVo.sex= ''
      this.initUser()
    },
    initUser(type) {
      //把后端的currentPage，size传过来
      let url = '/user/info/AllAdmin?'
      if(type && type == 'advanced'){
        if (this.userVo.departmentI){
          url +='&departmentI=' +this.userVo.departmentI;
        }
        if (this.userVo.username){
          url +='&username=' +this.userVo.username;
        }
        if (this.userVo.name){
          url +='&name=' +this.userVo.name;
        }
        if (this.userVo.address){
          url +='&address=' +this.userVo.address;
        }
        if (this.userVo.sex){
          url +='&sex=' +this.userVo.sex;
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.Users = resp.data;
          this.total=resp.total
          console.log(resp);
        }
      })
      this.getRequest('/department/deps/AllDep').then(resp => {
        if (resp) {
          this.departments = resp.data;
        }
      })
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initUser();
    },
    //上传头像
    handleloadImg(item) {
      console.log(item);
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.user.picture=resp.data.url;
        }
      })
    },
    //删除图片
    handleRemove() {
      let formData = new FormData()
      formData.append('file', this.user.picture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.user.picture=''
        }
      })
    },
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
.table-td-thumb{
  width: 40px;
  margin: 4px;
}
.el-upload__tip{
  margin-left: 300px;
  /*float: right;*/
  margin-top: -45px;
  margin-bottom: 18px;
}
.User-container{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 12px;
}
.img-container{
  width: 100px;
  display: flex;
  /*justify-content: center;*/
  margin-left: 50px;
  margin-bottom: 5px;

}
.picture-container{
  width: 72px;
  height: 72px;
  border-radius: 72px;

}
.Info-container{
  font-size: 15px;
  font-family: 楷体;
  color: #61c091;
  padding-bottom: 5px;
}
.cardInfo-container{
  width: 400px;
  height: 400px;
}

</style>
