<template>
  <div class="main_container">
    <!--  用户列表卡片v-if="foo"-->
    <el-card class="box-card">
      <el-form :inline="true" :model="userVo"  class="demo-form-inline">
        <el-form-item label="申请人:" label-width="70px">
          <el-input v-model="userVo.applyper" placeholder="请输入申请人姓名"></el-input>
        </el-form-item>
        <el-form-item label="审核人:" label-width="70px">
          <el-input v-model="userVo.checkname" placeholder="请输入审核人姓名"></el-input>
        </el-form-item>
        <!--      按钮-->
        <el-form-item style="margin-left: 10px">
          <el-button icon="el-icon-refresh" @click="resetUserVo">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="initApply('advanced')">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="">添加</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
          <!--          <el-button type="danger" icon="el-icon-delete" :disabled="multipleSelection.length==0" @click="deletemany" >批量删除</el-button>-->
        </el-form-item>
      </el-form>
    </el-card>
    <!--卡片-->
    <div class="User-container" >
      <el-card class="box-card" v-for="(apply,index) in Applys" :key="index">
        <div slot="header"  style="font-family:华文行楷;font-size:25px; color: #af2eaa;text-align: center">
          <span>{{apply.subject}}</span>
          <div style="float: right;">
            <template>
              <el-button type="warning" icon="el-icon-plus" size="mini" @click="SeeShow(apply)">查看详情>>></el-button>
            </template>
          </div>
        </div>
        <div>
          <div>
            <div class="Info-container">
              <div style="height: min-content;">活动内容：{{apply.content}}</div>

              <div>活动地点：{{apply.place}}</div>

              <div>可报名人数：{{apply.applynum}}</div>

              <div>结束报名时间：{{apply.endtime}}</div>
              <div>活动开始时间：{{apply.starttime}}</div>
              <div class="">
                <img :src="apply.picture" class="picture-container">
              </div>

              <div style="float: right">
                <span>申请人：{{apply.applyper}}     </span>
                <span>  |  {{apply.starttime}}</span>
              </div>
              <div style="background-color: #61c091;height: 3px;">
                <el-divider><i class="el-icon-star-on"></i></el-divider>
              </div>
            </div>
          </div>
        </div>
        <!--          -->
      </el-card>
      <div class="dialog_container">
        <!--  查出详情页面-->
        <el-dialog  :visible.sync="showDialog"   title="查看详情" >
          <el-row :gutter="15">
            <el-card class="">
              <div slot="header"  style="font-family:华文行楷;font-size:25px; color: #af2eaa;text-align: center;font-weight: 600">
                <span>{{Wacthapplys.subject}}</span>
              </div>
              <div>
                <div class="dialog_text">
                  <div class="Info-container">
                    <div style="height: min-content;">活动内容：{{Wacthapplys.content}}</div>
                    <el-divider></el-divider>
                    <div>活动地点：{{Wacthapplys.place}}</div>
                    <el-divider></el-divider>
                    <div>可报名人数：{{Wacthapplys.applynum}}</div>
                    <el-divider></el-divider>
                    <div>联系方式：{{Wacthapplys.telephone}}</div>
                    <el-divider></el-divider>
                    <div>结束报名时间：{{Wacthapplys.endtime}}</div>
                    <div>活动开始时间：{{Wacthapplys.starttime}}</div>
                    <div class="">
                      <img :src="Wacthapplys.picture" class="picture-container">
                    </div>
                    <div style="float: right">
                      <span>申请人：{{Wacthapplys.applyper}}     </span>
                      <span>  |  {{Wacthapplys.starttime}}</span>
                    </div>
                    <div style="background-color: #61c091;height: 3px;">
                      <el-divider><i class="el-icon-star-on"></i></el-divider>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-row>
          <span slot="footer">
        <el-button type="success" plain @click="orderInfo(Wacthapplys)" style="width: 100%">去报名</el-button>
      </span>
        </el-dialog>
        <!--  报名信息-->
        <el-dialog v-bind="$attrs" :visible.sync="orderDialog" v-on="$listeners"   title="填写报名信息">
          <el-row :gutter="15">
            <el-form ref="orderForm" :model="orders" :rules="orderRules" size="medium" label-width="100px">
              <el-col :span="12">
                <el-form-item label="真实姓名" prop="name">
                  <el-input v-model="orders.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="idnumeber">
                  <el-input v-model="orders.idnumeber" placeholder="请输入用户名"  clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="活动编号" prop="applyid">
                  <el-input v-model="orders.applyid" disabled placeholder="请输入手机" clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="telephone">
                  <el-input v-model="orders.telephone" onkeyup="value=value.replace(/[^\d]/g,0)" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div slot="footer">
            <el-button type="danger" plain @click="toCancel">取消</el-button>
            <el-button type="success" plain @click="toAdd">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  name: "ActUser",
  data(){
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      oderApplys: {
        id: null,
      },
      orders: {
        applyid: null,
        name: null,
        telephone: null,
        idnumeber: null,
      },
      orderRules: {
        applyid: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        telephone: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        idnumeber: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
      },
      Wacthapplys: {
        reason: undefined,
        status: undefined,
        applynum: undefined,
      },
      rules: {
        reason: [{
          required: true,
          message: '请输入理由',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: '请修改状态',
          trigger: 'blur'
        }],
        applynum: [{
          required: true,
          message: '请修改状态',
          trigger: 'blur'
        }]
      },
      Applys: [],
      userVo: {
        applyper: '',
        checkname: ''
      },
      showDialog:false,
      orderDialog:false
    }
  },
  //点进页面自动查询所有申请信息
  mounted() {
    this.initApply();
  },
  methods:{
    toAdd(){
      this.$refs.orderForm.validate((valid)=>{
        if(valid){
          this.postRequest('/or/info/addOrd',this.orders).then(resp=>{
            if(resp) {
              this.orderDialog = false
              this.$message.success("报名成功")
            }
          })
        }
      })
    },
    orderInfo(index,data){
      Object.assign(this.oderApplys,index)
      this.orders.applyid = this.oderApplys.id
      this.orders.name = this.user.name
      this.showDialog = false
      this.orderDialog = true
    },
    //查看详情
    SeeShow(index,data){
      console.log(index)
      this.Wacthapplys=index
      this.showDialog = true
    },
    initApply(type){
      //把后端的currentPage，size传过来
      let url = '/act/user/AllApply?'
      if (type && type == 'advanced') {
        if (this.userVo.applyper) {
          url += '&applyper=' + this.userVo.applyper;
        }
        if (this.userVo.checkname) {
          url += '&checkname=' + this.userVo.checkname;
        }
        console.log(url);
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.Applys = resp.data
          this.total = resp.total

        }
      })

    },
    //  重置表单
    resetUserVo(){
      this.userVo.applyper = ''
      this.userVo.checkname= ''
      this.initApply()
    },
    //取消添加或修改
    toCancel(){
      this.orderDialog = false
    },
  },
}
</script>

<style scoped>
.main_container{
  background-image: url("https://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/11/08/QQ%E5%9B%BE%E7%89%8720211110125040%20%282%29.jpg");
  opacity: 0.86;
}
.box-card{
  margin-top: 40px;
  opacity: 0.85;
  font-size: 20px;
  font-family: 楷体;
  font-weight: 750;
  /*color: #af2eaa;*/
}
.demo-form-inline{
  font-size: 18px;
  font-family: 楷体;
  font-weight: 750;
}
.Info-container{
}
.picture-container{
  opacity: 2.5;
  width: 200px;
  height: 200px;
}
.dialog_text{
  font-size: 18px;
  font-family: 楷体;
  font-weight: 750;
  /*color: #ffa124;*/
}
.dialog_container{
  background-image: url("https://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/11/08/QQ%E5%9B%BE%E7%89%8720211108140029.jpg");
  /*opacity: 0.86;*/
}
</style>