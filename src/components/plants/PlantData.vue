<template>
  <div>
    <!--  用户列表卡片v-if="foo "-->
    <!--    <el-card class="box-card">-->
    <el-form :inline="true" :model="plantVo"  class="demo-form-inline">
      <el-form-item label="编号" label-width="70px" prop="mainper">
        <el-input v-model="plantVo.mainper" :disabled="true" placeholder="请输入植物编号"></el-input>
      </el-form-item>
      <el-form-item label="植物名称" label-width="70px">
        <el-input v-model="plantVo.plantname" placeholder="请输入植物名称"></el-input>
      </el-form-item>
      <el-form-item label="所属种类" label-width="70px">
        <el-select v-model="plantVo.plantsort" placeholder="请选择">
          <el-option
              v-for="item in sorts"
              :key="item.id"
              :label="item.sort"
              :value="item.id">
            <span style="float: left">{{ item.sort }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.deptCount}}
                </span></span>
          </el-option>
        </el-select>
      </el-form-item>
      <!--      按钮-->
      <el-form-item style="margin-left: 10px">
        <el-button icon="el-icon-refresh" @click="resetUserVo">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="initPlant('advanced')">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="addShow">添加</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
      </el-form-item>
    </el-form>
    <!--卡片-->
    <div class="User-container">
      <el-card class="card-container" v-for="(plant,index) in Plants" :key="index">
        <div slot="header"  style="font-family:华文行楷;font-size:25px">
          <span>{{plant.plantname}}</span>
          <el-button style="float: right; padding: 3px 0;color: crimson" type="text" icon="el-icon-delete" @click="deleteUser(plant)"></el-button>
        </div>
        <div>
          <div>
            <div class="img-container">
              <img :src="plant.plantpicture" :alt="plant.plantname" :title="plant.plantname" class="picture-container">
            </div>
            <div class="Info-container">
              <div>国家保护级别：{{plant.plantgrade}}</div>
              <div style="float: left;">
                <template>
                  <el-button type="success" icon="el-icon-plus" size="mini" @click="ShowAddDate(plant)">生长状态监测>>></el-button>
                  <el-button type="warning" icon="el-icon-plus" size="mini" @click="OneHistory(plant,'true')">历史监测数据>>></el-button>
                </template>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!--          分页-->
    <div style="display: flex;justify-content: flex-end;margin-top: 8px">
      <el-pagination
          background
          @current-change="currentChange"
          layout="sizes, prev, pager, next, jumper, ->, total"
          @size-change="handleSizeChange"
          :page-sizes="[6, 9, 12, 20]"
          :total=total>
      </el-pagination>
    </div>
    <!--    </el-card>-->
    <!--  查出详情页面-->
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="DateDialog" title="填写数据监测结果">
      <el-row :gutter="15">
        <el-form ref="dateForm" :model="DateApply" :rules="DateRules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="植物编号" prop="plantid">
              <el-input v-model="DateApply.plantid" :disabled="true" placeholder="请输入植物名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="大棚温度" prop="temperature">
              <el-input v-model="DateApply.temperature" placeholder="请输入大棚温度" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记录人" prop="writeper">
              <el-input v-model="DateApply.writeper" :disabled="true" placeholder="请输入记录人" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高度" prop="height">
              <el-input v-model="DateApply.height" placeholder="请输入高度" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="茎叶情况" prop="stemleaf">
              <el-input v-model="DateApply.stemleaf" type="textarea" placeholder="请输入茎叶情况"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-upload
                class="upload-demo"
                :key="imagecropperKey1"
                :http-request="stemloadImg"
                :on-remove="stemRemove"
                action="string"
                list-type="picture">
              <div>
                <div slot="tip" class="el-upload__tip">
                  <img  v-if="" :src=DateApply.stempicture alt="" style="width: 200px;height: 200px;float: right;margin-top: 20px;margin-left: -190px;margin-bottom: 10px">
                </div>
                <div style="margin-left: 1px;float: left;margin-top: 70px">
                  <el-button  type="warning" plain>茎叶图片</el-button>
                </div></div>
            </el-upload>
          </el-col>
          <el-col :span="24">
            <el-form-item label="病虫情况" prop="diseases">
              <el-input v-model="DateApply.diseases" type="textarea" placeholder="请输入病虫情况"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-upload
              class="upload-demo"
              :key="imagecropperKey2"
              :http-request="disealoadImg"
              :on-remove="diseaRemove"
              action="string"
              list-type="picture">
            <div>
              <div slot="tip" class="el-upload__tip">
                <img  v-if="" :src=DateApply.diseapicture alt="" style="width: 200px;height: 200px;float: right;margin-top: 20px;margin-left: -190px;margin-bottom: 10px">
              </div>
              <div style="margin-left: 1px;float: left;margin-top: 70px">
                <el-button  type="warning" plain>病虫图片</el-button>
              </div></div>
          </el-upload>
          <el-col :span="24">
            <el-form-item label="生长状态" prop="status">
              <el-input v-model="DateApply.status" type="textarea" placeholder="请输入生长状态"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="其他" prop="rests">
              <el-input v-model="DateApply.rests" type="textarea" placeholder="请输入其他"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-upload
              class="upload-demo"
              :key="imagecropperKey3"
              :http-request="statusloadImg"
              :on-remove="statusRemove"
              action="string"
              list-type="picture">
            <div>
            <div slot="tip" class="el-upload__tip">
              <img  v-if="" :src=DateApply.statuspicture alt="" style="width: 300px;height: 200px;float: right;margin-top: 50px;">
<!--              <div>注：只能上传jpg/png文件，且不超过500kb</div>-->
            </div>
            <div style="margin-left: 120px;float: left;margin-top: 150px">
              <el-button  type="warning" plain>主要图片</el-button>
            </div></div>
          </el-upload>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="warning" @click="AddDate" style="width: 100%">确定</el-button>
      </div>
    </el-dialog>

    <!--    添加植物-->
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="AddDialog" title="添加植物">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="plant" :rules="rules" size="medium" label-width="100px">
          <el-upload
              class="upload-demo"
              :key="imagecropperKey"
              :http-request="uploasdImg"
              :on-remove="deleteRemove"
              action="string"
              list-type="picture">
            <div slot="tip" class="el-upload__tip">
              <img  v-if="" :src=plant.plantpicture alt="" style="width: 300px;height: 200px;">
              <div>注：只能上传jpg/png文件，且不超过500kb</div>
            </div>
            <div style="margin-left: 180px;">
              <el-button  type="warning" plain>上传头像</el-button>
            </div>
          </el-upload>
          <el-col :span="12">
            <el-form-item label="植物名称:" prop="plantname">
              <el-input v-model="plant.plantname"  placeholder="请输入植物名称" clearable
                        prefix-icon='el-icon-medal-1' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量:" prop="plantnumber">
              <el-input v-model="plant.plantnumber" onkeyup="value=value.replace(/[^\d]/g,0)" placeholder="请输入数量" clearable
                        prefix-icon='el-icon-postcard' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属种类:" prop="plantsort">
              <el-select v-model="plant.plantsort" placeholder="请选择所属种类" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in sorts"
                    :key="item.id"
                    :label="item.sort"
                    :value="item.id">
                  <span style="float: left">{{ item.sort }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.deptCount}}
                </span></span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保护级别:" prop="plantgrade">
              <el-select v-model="plant.plantgrade" placeholder="请选择保护级别" clearable :style="{width: '100%'}">
                <el-option v-for="(item, indexg) in plantGradeOptions" :key="indexg" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="植物形态:" prop="plantintroduce">
              <el-input v-model="plant.plantintroduce" type="textarea" placeholder="请输入植物形态"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="植物价值:" prop="plantvalue">
              <el-input v-model="plant.plantvalue" type="textarea" placeholder="请输入植物价值"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="措施:" prop="measure">
              <el-input v-model="plant.measure" type="textarea" placeholder="请输入措施"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label=" 种植位置:" prop="location">
              <el-input v-model="plant.location" type="textarea" placeholder="请输入 种植位置"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="warning" plain @click="toAdd" style="width: 100%">确定</el-button>
      </div>
    </el-dialog>
<!--历史监测信息-->
<el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="HistorysDialog" title="历史监测数据">
  <el-card class="box-card" v-for="(historys,indexsh) in Historys" :key="indexsh">
    <div slot="header"  style="font-family:华文行楷;font-size:25px;text-align: center">
      <span>{{historys.plant.plantname}}</span>
      <el-button style="float: right; padding: 3px 0;color: crimson;margin-top: 3px;margin-right: 7px" type="text" icon="el-icon-delete" @click=""></el-button>
    </div>
    <div>
      <div>
        <div class="Info-container">
          <div>高度：{{historys.height}}cm
            <div style="float: right;margin-right: 120px">气候：{{historys.temperature}}摄氏度</div></div>
          <el-divider></el-divider>
          <div >茎叶状态：{{historys.stemleaf}}</div>
          <div class="">
            <img :src="historys.stempicture" class="picture-container">
          </div>
          <el-divider></el-divider>
          <div>病虫状态：{{historys.diseases}}</div>
          <div class="">
            <img :src="historys.diseapicture" class="picture-container">
          </div>
          <el-divider></el-divider>
          <div style="height: min-content;">生长状态：{{historys.status}}</div>
          <el-divider></el-divider>
          <div style="height: min-content;">其他：{{historys.reset}}</div>
          <el-divider></el-divider>
          <div class="">
            <img :src="historys.statuspicture" class="picture-container">
          </div>
          <div style="float: right">
            <span>记录人：{{user.name}}     </span>
            <span>  |  {{historys.writetime}}</span>
          </div>
          <el-divider></el-divider>
          <div style="background-color: #dbb919;height: 3px;">
            <el-divider><i class="el-icon-star-on"></i></el-divider>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "PlantData",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      multipleSelection: [],
      Plants: [],
      OnePlant: [],
      sorts: [],
      Historys:[],
      total:0,
      currentPage:1,
      size:6,
      DateApply: {
        stempicture: undefined,
        diseapicture: undefined,
        plantid: undefined,
        writeper: undefined,
        height: undefined,
        temperature: undefined,
        stemleaf: undefined,
        diseases: undefined,
        status: undefined,
        rests: undefined,
        statuspicture: undefined
      },
      DateRules: {
        plantid: [{
          required: true,
          message: '请输入植物名称',
          trigger: 'blur'
        }],
        writeper: [{
          required: true,
          message: '请输入记录人',
          trigger: 'blur'
        }],
        stemleaf: [{
          required: true,
          message: '请输入茎叶情况',
          trigger: 'blur'
        }],
        diseases: [{
          required: true,
          message: '请输入病虫情况',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: '请输入生长状态',
          trigger: 'blur'
        }],
        statuspicture: [{
          required: true,
          message: '请上传主要图片',
          trigger: 'blur'
        }
        ]
      },
      plantVo: {
        plantname: '',
        plantsort: '',
        mainper: '',
      },
      oneVo:{
        plantid: '',
        writeper: '',
      },
      plant:{
        plantname: undefined,
        plantnumber: undefined,
        plantsort: undefined,
        plantgrade: undefined,
        plantintroduce: undefined,
        plantvalue: undefined,
        measure: undefined,
        location:undefined,
        plantpicture: undefined
      },
      plantGradeOptions: [{
        "label": "一级",
        "value": "一级"
      }, {
        "label": "二级",
        "value": "二级"
      }, {
        "label": "三级",
        "value": "三级"
      }],
      rules: {
        plantname: [{
          required: true,
          message: '请输入植物名称',
          trigger: 'blur'
        }],
        plantnumber: [{
          required: true,
          message: '请输入数量',
          trigger: 'blur'
        }],
        plantsort: [{
          required: true,
          message: '请选择所属种类',
          trigger: 'change'
        }],
        plantgrade: [{
          required: true,
          message: '请选择保护级别',
          trigger: 'blur'
        }],
        location: [{
          required: true,
          message: '请输入种植位置',
          trigger: 'blur'
        }],
      },
      showDialog: false,
      AddDialog: false,
      DateDialog: false,
      HistorysDialog: false,
      imagecropperKey: 0, // 上传组件id
      imagecropperKey1: 1, // 上传组件id
      imagecropperKey2: 2, // 上传组件id
      imagecropperKey3: 3, // 上传组件id
    }
  },
  //点进页面自动查询所有用户信息
  mounted() {
    this.initPlant('advanced');
  },
  methods: {
    OneHistory(plant,type){
      this.oneVo.plantid = plant.id
      this.oneVo.writeper = this.user.name
      this.HistorysDialog = true
      let url = '/plant/info/AllDate?'
      if(type && type == 'true'){
        if (this.oneVo.writeper){
          url +='&writeper=' +this.oneVo.writeper
        }
        if (this.oneVo.plantid){
          url +='&plantid=' +this.oneVo.plantid
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.Historys = resp.data
        }
      })
    },
    //添加监测信息
    AddDate(){
      this.$refs.dateForm.validate((valid) => {
        if (valid) {
          this.postRequest('/plant/info/addDate', this.DateApply).then(resp=> {
            if (resp) {
              this.DateDialog = false
            }
          })
        }else{
          this.$message.error('有必填项为空！')
        }
      })
    },
    //填写数据信息
    ShowAddDate(plant){
      this.DateApply.plantid = plant.id
      this.DateApply.writeper = this.user.name
      this.DateDialog = true
      this.RestAddDate()
    },
    RestAddDate(){
      this.DateApply.stempicture=null
      this.DateApply.diseapicture=null
      this.DateApply.diseases=null
      this.DateApply.height=null
      this.DateApply.rests=null
      this.DateApply.status=null
      this.DateApply.statuspicture=null
      this.DateApply.stemleaf=null
      this.DateApply.temperature=null
    },
    //查看详情
    showPage(index,data){
      // console.log(index)
      Object.assign(this.OnePlant,index)
      console.log(this.OnePlant)
      this.showDialog = true
    },
    //确认添加
    toAdd(){
      this.$refs.elForm.validate((valid) => {
        if (valid) {
          this.postRequest('/plant/info/addAdmin', this.plant).then(resp=> {
            if (resp) {
              this.initPlant()
              this.AddDialog = false
            }
          })
        }else{
          this.$message.error('有必填项为空！')
        }
      })
    },
    //取消添加或修改
    toCancel(){
      this.showDialog = false
    },
    //打开添加弹窗
    addShow(){
      this.AddDialog = true
      this.restDialog()
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
      this.plant.plantgrade=null
      this.plant.plantintroduce=null
      this.plant.plantname=null
      this.plant.plantnumber=null
      this.plant.plantsort=null
      this.plant.plantvalue=null
      this.plant.location=null
      this.plant.measure=null
    },
    //删除用户
    deleteUser(admin) {
      this.$confirm('此操作将永久删除该['+admin.name+']用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/user/info/'+admin.id).then(resp=>{
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
    //  重置表单
    resetUserVo(){
      this.plantVo.plantname = ''
      this.plantVo.plantsort= ''
      this.initPlant('advanced')
    },
    initPlant(type) {
      //把后端的currentPage，size传过来
      let url = '/plant/info/AllAdmin?currentPage='+this.currentPage + '&size=' +this.size;
      this.plantVo.mainper = this.user.employee[0].id
      if(type && type == 'advanced'){
        if (this.plantVo.mainper){
          url +='&mainper=' +this.plantVo.mainper;
        }
        if (this.plantVo.plantname){
          url +='&plantname=' +this.plantVo.plantname;
        }
        if (this.plantVo.plantsort){
          url +='&plantsort=' +this.plantVo.plantsort;
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.Plants = resp.data
          this.total=resp.total
        }
      })
      this.getRequest('/system/sort/AllAdmin').then(resp => {
        if (resp) {
          this.sorts = resp.data;
        }
      })
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initPlant();
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initPlant();
    },
    //上传茎叶图
    stemloadImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.DateApply.stempicture=resp.data.url;
        }
      })
    },
    //删除茎叶图
    stemRemove() {
      let formData = new FormData()
      formData.append('file',  this.DateApply.stempicture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.DateApply.stempicture=''
        }
      })
    },
    //上传病虫图
    disealoadImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.DateApply.diseapicture=resp.data.url;
        }
      })
    },
    //删除病虫图statusloadImg
    diseaRemove() {
      let formData = new FormData()
      formData.append('file',  this.DateApply.diseapicture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.DateApply.diseapicture=''
        }
      })
    },
    //上传病虫图
    statusloadImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.DateApply.statuspicture=resp.data.url;
        }
      })
    },
    //删除病虫图
    statusRemove() {
      let formData = new FormData()
      formData.append('file',  this.DateApply.statuspicture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.DateApply.statuspicture=''
        }
      })
    },
    //上传头像
    uploasdImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.plant.plantpicture=resp.data.url;
        }
      })
    },
    //删除图片
    deleteRemove() {
      let formData = new FormData()
      formData.append('file', this.plant.plantpicture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.plant.plantpicture=''
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
.card-container{
  width: 400px;
  height: 400px;
}
.img-container{
  width: 100px;
  display: flex;
  /*justify-content: center;*/
  margin-left: 5px;
  margin-top: 1px;

}
.picture-container{
  margin-left: 1px;
  width: 350px;
  height: 250px;
}
.Info-container{
  font-size: 19px;
  font-family: 楷体;
  font-weight: 600;
  padding-bottom: 5px;
  margin-top: 8px;
}
.show-picture{
  /*opacity: 2.5;*/
  width: 300px;
  height: 300px;
}
.show-container{
  font-size: 19px;
  font-family: 楷体;
  font-weight: 600;
}
.card-info{
  margin-top: -15px;
}
</style>