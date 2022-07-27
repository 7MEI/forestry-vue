<template>
  <div style="background-color: #f3f6fa">
    <div>
      <Userheader></Userheader>
    </div>
    <div >
      <el-carousel :interval="1500" indicator-position="outside" height="450px" ref="carousel">
        <el-carousel-item v-for="(item,index) in AllSlide" :key="item.id">
          <v-touch :swipe-options="{direction: 'horizontal'}" v-on:swipeleft="" v-on:swiperight="" class="wrapper">
            <div class="menu-container" ref="menuContainer">
              <img v-lazy="item.url" class="ii"><img>
            </div>
          </v-touch>
        </el-carousel-item>
      </el-carousel>
    </div>
<div>
  <div style="margin: 12px 136px 0 136px;background-color: #FFFFFF">
    <!--  用户列表卡片v-if="foo"-->
    <!--    <el-card class="box-card">-->
    <el-form :inline="true" :model="plantVo"  style="text-align: center;padding-top: 20px">
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
      </el-form-item>
    </el-form>
    <!--卡片-->
    <div class="User-container">
      <el-card class="card-container" v-for="(plant,index) in Plants" :key="index">
        <div slot="header"  style="font-family:华文行楷;font-size:25px">
          <span>{{plant.plantname}}</span>
        </div>
        <div>
          <div>
            <div class="img-container" @click="showPage(plant)">
              <img :src="plant.plantpicture" :alt="plant.plantname" :title="plant.plantname" class="picture-container">
            </div>
            <div class="Info-container">
              <div>
                <div style="float: left; width: 250px;">
                  <div>国家保护级别：{{plant.plantgrade}}</div>
                  <div>负责人：{{plant.employee.name}}
                  </div>
                </div>
                <div style="float: right;width: 65px;height: 50px;"  @click="show_qrcode(plant)">
                  <vue-qr :logoSrc="config.logo"
                          :text="plant.plantqr"
                          :size="55"
                          :margin="0"
                          property="ll"
                          trigger="hover"
                          ref="Qrcode"
                          class="vue-qr-img">
                    <!--                      <vue_qr :config='config' :downloadButton='downloadButton' ></vue_qr>-->
                    <!--                      <img slot="reference" :src="ll" :alt="ll" style="max-height: 50px;max-width: 130px">-->
                    <i class="iconfont gw-icon-erweima" slot="reference" @mouseenter.navive="show_qrcode(plant)" ></i>
                  </vue-qr>
                </div>
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
  </div>
</div>
    <div style="width: 100%;background-color: #555d65;margin-top: 30px">
      <div style="padding: 3px 120px 3px 290px;color: #FFFFFF;font-size: 19px;font-family: 楷体;opacity: 59%">
        <p style="font-size: 21px">友情链接:</p>
        <p>http://xxx.com</p>
        <div>
          <span>关于我们</span>  |
          <span>联系我们</span>  |
          <span>帮助我们</span>  |
          <span>帮助中心</span>  |
          <span>资源下载</span>
        </div>
        <!--            <p>服务热线：077154689(梧州) Email:Seven@qq.com</p>-->

      </div>
    </div>



    <!--    二维码-->
    <el-dialog :visible.sync="qrDialog" style="width: 680px;height: 1000px;margin-left: 460px;margin-top: 50px">
      <div>
        <p style="margin-top: -10px;font-size: 15px;float: left">扫一扫查看</p>
        <p style="color: #409EFF;float: left;margin-top: -10px;font-size: 15px;">{{this.qrUrl.plantname}}</p>
        <p style="margin-top: -10px;font-size: 15px;float: left">详情信息</p>
      </div>
      <vue-qr :logoSrc="config.logo"
              :text="this.qrUrl.plantqr"
              :size="285"
              :margin="0"
              ref="Qrcode"
              class="vue-qr-img">
        <!--                      <img slot="reference" :src="plant.picture" :alt="plant.picture" style="max-height: 50px;max-width: 130px">-->
        <!--        <i class="iconfont gw-icon-erweima" slot="reference" @mouseenter.navive="show_qrcode(plant.plantpicture)" ></i>-->
      </vue-qr>
      <el-button style="width: 290px;margin-top: 20px" type="success" plain :href="exportLink" @click="downloadImg" :download="downloadFilename">下载二维码</el-button>
    </el-dialog>
    <!--  查出详情页面-->


  </div>
</template>

<script>
import VueQr from 'vue-qr' //生成二维码
import Userheader from "@/components/user/Userheader";
export default {
  name: "PlantView",
  components: {
    VueQr,
    Userheader
  },
  data() {
    return {
      AllSlide: [
        {
          url: 'https://forestrys.oss-cn-guangzhou.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720211201201734.jpg'
        },
        {
          url: 'https://forestrys.oss-cn-guangzhou.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720211201201740.jpg'
        },
        {
          url: 'https://forestrys.oss-cn-guangzhou.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720211201201705.jpg'
        },
      ],

      config: {  //二维码参数
        value: 'http://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/10/19/7668065d7cbf4057b36d5acecc36760f.jpg',//显示的值、跳转的地址
        logo: require('../../assets/img/2.jpg'),//中间logo的地址
      },
      qrUrl:'',
      exportLink: '',
      downloadFilename: '',
      user: JSON.parse(window.sessionStorage.getItem('user')),
      quanxian: '',
      isPlantEdie: '',
      edit: '',
      multipleSelection: [],
      Plants: [],
      OnePlant: [],
      sorts: [],
      total:0,
      currentPage:1,
      size: 6,
      allDepEmps: [],
      allDepEmp:{
        departmentId:'',
      },
      plantVo: {
        plantname: '',
        plantsort: '',
      },
      plantOne:{
        plantname: '',
        plantnumber: '',
        plantsort: '',
        plantgrade: '',
        plantintroduce: '',
        plantvalue: '',
        measure: '',
        location:'',
        plantpicture: '',
        mainper: ''
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
      qrDialog: false,
      imagecropperKey: 0, // 上传组件id
    }
  },
  //点进页面自动查询所有用户信息
  mounted() {
    this.initPlant()
  },
  methods: {
    // 下载二维码图片
    downloadImg () {
      let Qrcode = this.$refs.Qrcode
      this.exportLink = Qrcode.$el.currentSrc
      this.downloadFilename = '二维码'
    },
    show_qrcode(index){
      this.qrDialog = true
      this.qrUrl=index
    },
    //查看详情
    showPage(index){
      this.$router.push({
        path: '/PlantShow',
        name: 'PlantShow',
        params: {
          name: index,
        }
      })

    },
    //确认添加或者修改
    toAdd(edit){
      if(this.isPlantEdie == false) {
        this.$refs.elForm.validate((valid) => {
          if (valid) {
            this.postRequest('/plant/info/addAdmin', this.plantOne).then(resp=> {
              if (resp) {
                this.initPlant()
                this.AddDialog = false
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
            this.putRequest('/plant/info/updateAdmin',this.plantOne).then(resp=>{
              if (resp) {
                this.initPlant()
                this.AddDialog = false
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
    //打开编辑弹窗
    showupdate(index,edit){
      this.isPlantEdie = edit
      console.log(this.isPlantEdie)
      this.AddDialog = true
      Object.assign(this.plantOne,index)
      console.log(this.plantOne.employee.name)
      console.log("onessonsssssssssseone")
    },
    //打开添加弹窗
    addShow(edit){
      this.isPlantEdie = edit
      console.log(this.isPlantEdie)
      this.AddDialog = true
      this.restDialog()
      this.plantOne.plantpicture='https://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/11/08/QQ%E5%9B%BE%E7%89%8720211108101625.jpg'
    },
    //清空dialog
    restDialog(){
      this.plantOne.plantgrade=null
      this.plantOne.plantintroduce=null
      this.plantOne.plantname=null
      this.plantOne.plantnumber=null
      this.plantOne.plantsort=null
      this.plantOne.plantvalue=null
      this.plantOne.location=null
      this.plantOne.measure=null
      this.plantOne.mainper=null
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
    deleteUser(plant) {
      this.$confirm('此操作将永久删除该['+plant.plantname+']植物, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/plant/info/'+plant.id).then(resp=>{
          if (resp){
            this.initPlant();
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
      this.initPlant()
    },
    initPlant(type) {
      console.log(this.user.employee[0].minister)
      if (this.user.employee[0].departmentId != 6 || (this.user.employee[0].departmentId =6 && this.user.employee[0].minister != 0)){
        this.quanxian = true
      }else {
        this.quanxian = false
      }
      //把后端的currentPage，size传过来
      let url = '/plant/info/AllAdmin?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'advanced'){
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
      //获得本部门所有员工 allDepEmp
      let url2 = '/employee/basic/list?'
      this.allDepEmp.departmentId= this.user.employee[0].departmentId
      if(this.allDepEmp.departmentId) {
        url2 += '&departmentId=' + this.allDepEmp.departmentId;
      }
      this.getRequest(url2).then(resp => {
        if (resp) {
          this.allDepEmps = resp.data
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
  }
}
</script>

<style scoped>
.text-sh{
  line-height: 32px;
  text-indent:2em;
}
.plant_button{
  margin-top: 5px;
  width: 160px;
  margin-left: 7px;
}
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
  height: 410px;
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
  color: #409EFF;
  padding-bottom: 5px;
  margin-top: 8px;
  margin-left: 14px;
}
.show-picture{
  /*opacity: 2.5;*/
  width: 600px;
  height: 320px;
}
.show-container{
  font-size: 19px;
  font-family: 楷体;
  font-weight: 600;
}
.card-info{
  margin-top: -15px;
}
.detail-gif{
  width: 350px;
  height: 230px;
}
.left-picture{
  margin-left: 20px;
  margin-top: 13px;
  float: left;
}
.right-text{
  margin-left: 40px;
  margin-top: 13px;
  float: left;
  width: 300px;
  height: 150px;
  color: #FFFFFF;
  line-height: 29px;
  font-size: 15px;
}
</style>
