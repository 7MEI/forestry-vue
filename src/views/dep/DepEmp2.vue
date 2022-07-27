
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
      <!--表格-->
      <el-table
          v-if="Users"
          :data="Users"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          :cell-style="{padding: '0'}"
      >
        <el-table-column
            type="selection"
            width="80">
        </el-table-column>
        <el-table-column
            prop="id"
            fixed
            label="#"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            sortable
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="department.name"
            label="部门"
            width="110">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="60">
          <template slot-scope="scope">
            <span class="el-tag el-tag--success el-tag--mini el-tag--light">{{scope.row.sex==0?'男':(scope.row.sex==1?'女':'保密')}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="150">
        </el-table-column>
        <el-table-column
            sortable
            prop="telephone"
            label="邮箱"
            width="180">
        </el-table-column>
        <el-table-column
            sortable
            prop="address"
            label="地址"
            width="300">
        </el-table-column>
        <el-table-column
            property="picture"
            label="头像"
            height="60"
            width="60">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.picture" :preview-src-list="[scope.row.picture]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="enabled"
            label="是否启用"
            width="70">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.enabled==1"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="210"
        >
          <template slot-scope="scope">
            <el-button type="success" @click="updateShow(scope.$index, scope.row,true)" icon="el-icon-edit" plain></el-button>
            <el-button type="danger"  @click="deleteUser(scope.$index, scope.row)" icon="el-icon-delete" plain ></el-button>
            <el-button type="warning"  icon="el-icon-s-tools" plain></el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-card>
    <!--          分页-->
    <div style="display: flex;justify-content: flex-end;margin-top: 8px">
      <el-pagination
          background
          @current-change="currentChange"
          layout="sizes, prev, pager, next, jumper, ->, total"
          @size-change="handleSizeChange"
          :page-sizes="[4, 8, 15, 20]"
          :total=total>
      </el-pagination>
    </div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners"   :title="isEdit?'编辑用户信息':'添加用户信息'">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="user" :rules="rules" size="medium" label-width="100px">
          <el-upload
              class="upload-demo"
              :key="imagecropperKey"
              :http-request="handleloadImg"
              :on-remove="handleRemove"
              action="string"
              list-type="picture">
            <div slot="tip" class="el-upload__tip">
              <img  v-if="" :src=user.picture alt="" style="width: 120px;height: 120px;border-radius: 50%;">
              <div>注：只能上传jpg/png文件，且不超过500kb</div>
            </div>
            <div style="margin-left: 200px;margin-bottom: 12px">
              <el-button size="small" type="success" plain>上传头像</el-button>
            </div>
          </el-upload>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="user.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username" placeholder="请输入用户名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="">
              <el-input type="password" v-model="user.password" placeholder="请输入密码" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="user.sex" size="medium" style="margin-top: 10px">
                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="departmentI">
              <el-select v-model="user.departmentI" placeholder="请选择部门" clearable
                         :style="{width: '100%'}">
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
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="user.phone" placeholder="请输入手机" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="user.address" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="家庭联系方式" prop="telephone">
              <el-input v-model="user.telephone" placeholder="请输入家庭联系方式" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="danger" plain @click="toCancel">取消</el-button>
        <el-button type="success" plain @click="toAddOrUpdate(edit)">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "DepEmp",
  data() {
    return {
      id:'',
      isEdit:'',
      multipleSelection: [],
      Users: [],
      departments: [],
      total:0,
      currentPage:1,
      size:4,
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
      this.restDialog()
      this.user.picture='http://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/10/25/ac35b7be28ee465fabe1a9350a4b810a.jpg'
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
    deleteUser(index,data) {
      this.$confirm('此操作将永久删除该['+data.name+']用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/user/info/'+data.id).then(resp=>{
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
      let url = '/user/info/AllAdmin?currentPage='+this.currentPage + '&size=' +this.size;
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
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initUser();
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
</style>
