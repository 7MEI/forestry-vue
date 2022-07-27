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
          <el-button type="success" icon="el-icon-plus" @click="AddApply">添加</el-button>
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
                <el-button type="primary" icon="el-icon-loading"  :disabled="quanxian" @click="updateShow(apply)">状态审核>>></el-button>
                <el-button type="warning" icon="el-icon-view" @click="SeeShow(apply)">查看详情>>></el-button>
              </template>
            </div>
            <el-button style="float: right; padding: 3px 0;color: crimson;margin-top: 3px;margin-right: 7px" type="text" icon="el-icon-delete" @click="deleteApply(apply)"></el-button>
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
<!-- 状态审核页面-->
  <el-dialog v-bind="$attrs" :visible.sync="updateDialog" v-on="$listeners"  title="状态审核" >
    <div style="background-color: #a066ac;color: #FFFFFF;font-size: 30px;margin-top: -20px;font-family: 楷体">活动详情 Detail</div>
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
            <div>
              <span >申请人：{{Wacthapplys.applyper}}</span>
              <span style="float: right">申请时间：{{Wacthapplys.starttime}}</span>
            </div>
            <el-divider></el-divider>
            <div>
              <span>联系方式：{{Wacthapplys.telephone}}</span>
              <span style="float: right">活动开始时间：{{Wacthapplys.starttime}}</span>
            </div>
            <el-divider></el-divider>
            <div class="">
              <img :src="Wacthapplys.picture" class="picture-container">
            </div>

          </div>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <div style="background-color: #a066ac;color: #FFFFFF;font-size: 30px;font-family: 楷体">审核状态 Audit Status</div>
      <el-form ref="elForm">
            <el-col :gutter="15">
                <el-form-item label="审核:" prop="status">
                  <el-radio-group v-model="Wacthapplys.status" size="medium" style="margin-top: 10px">
                    <el-radio v-for="(item, indexx) in statusOptions" :key="indexx" :label="item.value"
                              :disabled="item.disabled">{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>

            <el-col :gutter="15">
              <el-form-item label="可参与活动人数:" style="font-size: 12px" prop="applynum">
                <el-input v-model="Wacthapplys.applynum" onkeyup="value=value.replace(/[^\d]/g,0)" placeholder="" clearable :style="{width: '100%'}">
                </el-input></el-form-item>
            </el-col>

            <el-col :gutter="15">
                <el-form-item label="不通过理由:" style="font-size: 12px" prop="reason">
                  <el-input  type="textarea" v-model="Wacthapplys.reason" placeholder="请填写不通过理由" clearable :style="{width: '100%'}">
                  </el-input></el-form-item>
            </el-col>
          </el-form>
    </el-card>
    <span slot="footer">
        <el-button type="primary" plain @click="update" style="width: 100%">提交</el-button>
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
    <!--    添加活动申请-->
    <el-dialog v-bind="$attrs" :visible.sync="AddDialog" v-on="$listeners" title="活动申请">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="ShowAddApply" :rules="AddApplyRules" size="medium" label-width="100px">
          <el-col :span="24">
            <el-form-item label="活动主题" prop="subject">
              <el-input v-model="ShowAddApply.subject" placeholder="请输入活动主题" clearable
                        prefix-icon='el-icon-picture' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="活动内容：" prop="content">
              <el-input v-model="ShowAddApply.content" type="textarea" placeholder="请输入活动内容："
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请部门" prop="applydep">
              <el-select v-model="ShowAddApply.applydep" placeholder="请选择申请部门" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in depars"
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
            <el-form-item label="联系电话" prop="telephone">
              <el-input v-model="ShowAddApply.telephone" placeholder="请输入联系电话" clearable
                        prefix-icon='el-icon-s-platform' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="结束时间" prop="endtime">
              <el-date-picker v-model="ShowAddApply.endtime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择结束时间" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人" prop="applyper">
              <el-input v-model="ShowAddApply.applyper" placeholder="请输入申请人" clearable
                        prefix-icon='el-icon-video-camera-solid' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与人数" prop="applynum">
              <el-input v-model="ShowAddApply.applynum" onkeyup="value=value.replace(/[^\d]/g,0)" placeholder="请输入参与人数" clearable
                        prefix-icon='el-icon-s-cooperation' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开始时间" prop="starttime">
              <el-date-picker v-model="ShowAddApply.starttime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择开始时间" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地点" prop="place">
              <el-input v-model="ShowAddApply.place" type="textarea" placeholder="请输入地点"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-upload
                class="upload-demo"
                :key="imagecropperKey"
                :http-request="handleloadImg"
                :on-remove="handleRemove"
                action="string"
                list-type="picture">
              <div slot="tip" class="el-upload__tip">
                <img  v-if="" :src=ShowAddApply.picture alt="" style="width: 300px;height: 300px;">
                <div>注：只能上传jpg/png文件，且不超过500kb</div>
              </div>
              <div style="margin-left: 10px;margin-top: 8px">
                <el-button  type="warning" plain>上传图片</el-button>
              </div>
            </el-upload>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="warning"  @click="toAddApply" style="width: 100%">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ActApply",
  data(){
    return {
      depars:[],
      ShowAddApply: {
        subject: undefined,
        content: undefined,
        applydep: undefined,
        applyper: undefined,
        applynum: undefined,
        telephone: undefined,
        starttime: null,
        endtime: null,
        place: undefined,
        picture: undefined
      },
      AddApplyRules: {
        subject: [{
          required: true,
          message: '请输入活动主题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入活动内容：',
          trigger: 'blur'
        }],
        applydep: [{
          required: true,
          message: '请选择申请部门',
          trigger: 'change'
        }],
        applyper: [{
          required: true,
          message: '请输入申请人',
          trigger: 'blur'
        }],
        applynum: [{
          required: true,
          message: '请输入参与人数',
          trigger: 'blur'
        }],
        telephone: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        starttime: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        }],
        endtime: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'change'
        }],
        place: [{
          required: true,
          message: '请输入地点',
          trigger: 'blur'
        }],
      },
      user: JSON.parse(window.sessionStorage.getItem('user')),
      quanxian: '',
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
        id: '',
        reason: '',
        status: '',
        applynum: '',
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
      statusOptions: [{
        "label": "通过",
        "value": 1
      }, {
        "label": "不通过",
        "value": 2
      },{
        "label": "等待审核",
        "value": 0
      }],
      showDialog:false,
      updateDialog:false,
      orderDialog:false,
      AddDialog: false,
      imagecropperKey: 0, // 上传组件id
    }
  },
  //点进页面自动查询所有申请信息
  mounted() {
    this.initApply();
  },
  methods:{
    //活动申请
    toAddApply(){
      this.$refs.elForm.validate((valid) => {
        if (valid) {
          this.postRequest('/act/apply/addApply', this.ShowAddApply).then(resp=> {
            if (resp) {
              this.initApply()
              this.AddDialog = false
            }
          })
        }else{
          this.$message.error('有必填项为空！')
        }
      })
    },
    //打开申请页面
    AddApply(){
      this.AddDialog=true
      this.ShowAddApply.applyper =this.user.name
      this.ShowAddApply.telephone =this.user.phone
      this.restDialog()
      this.getRequest('/department/deps/AllDep').then(resp=>{
        if(resp){
          this.depars = resp.data
        }
      })
    },
    //清空dialog
    restDialog(){
      this.ShowAddApply.content=null
      this.ShowAddApply.applynum=null
      this.ShowAddApply.endtime=null
      this.ShowAddApply.picture=null
      this.ShowAddApply.place=null
      this.ShowAddApply.starttime=null
      this.ShowAddApply.subject=null
      this.ShowAddApply.applydep=null
    },
    //预约活动
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
    //修改状态
    update(){
      if(this.Wacthapplys.status==2 && this.Wacthapplys.reason==null){
        this.$message.error('请填写理由！')
      }else if(this.Wacthapplys.status==0){
        this.$message.error('请修改审核状态！')
      }else if(this.Wacthapplys.applynum==null){
        this.$message.error('请填写活动人数！')
      }else {
       this.putRequest('/act/apply/updateApply',this.Wacthapplys).then(resp=>{
         if(resp){
           this.initApply()
           console.log("到这")
           this.updateDialog = false
           console.log(resp)
         }
       })
      }
    },
    //查看详情
    SeeShow(index){
      console.log(index)
      this.Wacthapplys=index
      this.showDialog = true
},
    //状态审核
    updateShow(index){
      Object.assign(this.Wacthapplys,index)
      this.updateDialog = true
    },
    initApply(type){
      if (this.user.employee[0].minister == 0){
        this.quanxian = false
      }else {
        this.quanxian = true
      }
        //把后端的currentPage，size传过来
        let url = '/act/apply/AllApply?'
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
    //删除用户
    deleteApply(apply) {
      this.$confirm('此操作将永久删除该['+apply.subject+']主题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/act/apply/'+apply.id).then(resp=>{
          if (resp){
            this.initApply()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //上传头像
    handleloadImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.ShowAddApply.picture=resp.data.url;
        }
      })
    },
    //删除图片
    handleRemove() {
      let formData = new FormData()
      formData.append('file',  this.ShowAddApply.picture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.ShowAddApply.picture=''
        }
      })
    },
  },

}
</script>

<style scoped>
.main_container{
  background-image: url("http://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/11/08/dcc5699f46a54cd19e89275619be1662.jpg");
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
.el-upload__tip{
  margin-left: 150px;
  /*float: right;*/
  margin-top: -45px;
  margin-bottom: 18px;
}
</style>