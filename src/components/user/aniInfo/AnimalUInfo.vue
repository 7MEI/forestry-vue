<template>
  <div>
    <el-form :inline="true" :model="AnimalsVo"  class="demo-form-inline">
      <el-form-item label="动物名称：" label-width="100px" prop="chinesename">
        <el-input v-model="AnimalsVo.chinesename" placeholder=""></el-input>
      </el-form-item>
      <!--      按钮-->
      <el-form-item style="margin-left: 10px">
        <el-button type="warning" icon="el-icon-refresh" @click="">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="initAnimal()">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="left">
      <div >
        <div class="left-f">
          <p class="left-one">动物</p></div>
        <div class="left-tow">
          <p >Animals</p></div>
      </div>
      <el-button type="primary" plain icon="el-icon-info" @click="initAnimal()" class="left-button">全部动物</el-button>
      <el-button type="primary" plain icon="el-icon-platform-eleme" @click="initAnimal(1)" class="left-button">陆生动物</el-button>
      <el-button type="primary" plain icon="el-icon-picture" @click="initAnimal(2)" class="left-button">水生动物</el-button>
      <el-button type="primary" plain icon="el-icon-s-marketing" @click="initAnimal(3)" class="left-button">两栖动物</el-button>
    </div>
    <div class="right">
      <el-card class="box-card" v-for="(animal,index) in Animals" :key="index">
        <div>
          <div class="right-left"  @click="showDetail(animal)">
            <img :src="animal.picture" class="right-picture">
          </div>
          <div slot="header" class="right-right">

            <div style="float: right;margin-right: -10px">
              <template>
                <el-button type="warning" icon="el-icon-plus" size="mini" @click="showDetail(animal)">查看详情>>></el-button>
              </template>
            </div>
            <el-divider class="fengexian"></el-divider>
            <div style="font-family:华文行楷;font-size:28px;color: #272c33; text-align: center;font-weight: 400;margin-left: 80px;margin-bottom: 15px"><span>{{animal.chinesename}}</span></div>

            <div>
              <div style="float: left;width: 400px;margin-left: 160px" @click="showDetail(animal)">
                <div style="font-family:楷体;font-size:22px;color: #272c33; text-align: center;font-weight: 400;margin-bottom: 10px">
                  外文名：<span>{{animal.foreignname}}</span></div>
                <div style="font-family:楷体;font-size:22px;color: #272c33; text-align: center;font-weight: 400;margin-bottom: 10px">
                  所在位置：<span>{{animal.location}}</span></div>

                <div style="font-family:楷体;font-size:22px;color: #272c33; text-align: center;font-weight: 400">
                  负责人：<span>{{animal.employee.name}}</span>
                  <el-popover
                      style="margin-left: 9px"
                      placement="right"
                      title="部门员列表"
                      width="200"
                      trigger="click">
                    <el-select v-model="AnimalApply.mainper"  multiple placeholder="请选择">
                      <el-option
                          :disabled="quanxian"
                          v-for="item in allAniEmps"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                </span></span>
                      </el-option>
                    </el-select>
                    <template #reference>
                      <el-button style="color: #409EFF" type="text" icon="el-icon-more"></el-button>
                    </template>
                  </el-popover>
                </div>
              </div>
              <div style="float: left;width: 60px;height: 60px;margin-top: 40px" @click="show_qrcode(animal)">
                <vue-qr :logoSrc="config.logo"
                        :text="animal.qr"
                        :size="60"
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
          </div>
          <!--            <div style="height: min-content;">活动内容：{{apply.content}}</div>-->

        </div>

      </el-card>
      <div style="display: flex;justify-content: flex-end;margin-top: 8px">
        <el-pagination
            background
            @current-change="currentChange"
            layout="sizes, prev, pager, next, jumper, ->, total"
            @size-change="handleSizeChange"
            :page-sizes="[3, 6, 15, 20]"
            :total=total>
        </el-pagination>
      </div>
    </div>
    <!--  二维码-->
    <!--    二维码-->
    <!--    </el-card>-->
    <el-dialog :visible.sync="qrDialog" style="width: 680px;height: 1000px;margin-left: 460px;margin-top: 50px">
      <div>
        <p style="margin-top: -10px;font-size: 15px;float: left">扫一扫查看</p>
        <p style="color: #409EFF;float: left;margin-top: -10px;font-size: 15px;">{{this.qrUrl.chinesename}}</p>
        <p style="margin-top: -10px;font-size: 15px;float: left">详情信息</p>
      </div>
      <vue-qr :logoSrc="config.logo"
              :text="this.qrUrl.qr"
              :size="285"
              :margin="0"
              ref="Qrcode"
              class="vue-qr-img">
        <!--                      <img slot="reference" :src="plant.picture" :alt="plant.picture" style="max-height: 50px;max-width: 130px">-->
        <!--        <i class="iconfont gw-icon-erweima" slot="reference" @mouseenter.navive="show_qrcode(plant.plantpicture)" ></i>-->
      </vue-qr>
      <el-button style="width: 290px;margin-top: 20px" type="success" plain :href="exportLink" @click="downloadImg" :download="downloadFilename">下载二维码</el-button>
    </el-dialog>

    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="AddAnimalDialog" :title="isAniEdit?'编辑动物信息':'添加动物信息'">
      <el-row :gutter="15">
        <el-form ref="animalForm" :model="AnimalApply" :rules="AnimalRules" size="medium" label-width="100px">
          <el-upload
              class="upload-demo"
              :key="imagecropperKey"
              :http-request="uploasdImg"
              :on-remove="deleteRemove"
              action="string"
              list-type="picture">
            <div slot="tip" class="el-upload__tip">
              <img  v-if="" :src=AnimalApply.picture alt="" style="width: 300px;height: 200px;">
              <div>注：只能上传jpg/png文件，且不超过500kb</div>
            </div>
            <div style="margin-left: 180px;">
              <el-button  type="warning" plain>上传图片</el-button>
            </div>
          </el-upload>
          <el-col :span="12">
            <el-form-item label="负责人" prop="mainper">
              <el-select v-model="AnimalApply.mainper" placeholder="请选择负责人" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in allAniEmps"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                </span></span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="中文名：" prop="chinesename">
              <el-input v-model="AnimalApply.chinesename" placeholder="请输入中文名：" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="体长：" prop="length">
              <el-input v-model="AnimalApply.length" placeholder="请输入体长：" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="身高：" prop="height">
              <el-input v-model="AnimalApply.height" placeholder="请输入身高：" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="繁殖：" prop="breed">
              <el-input v-model="AnimalApply.breed" placeholder="请输入繁殖：" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="位置:" prop="location">
              <el-input v-model="AnimalApply.location" placeholder="请输入位置:" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="动物分类" prop="anisortid">
              <el-select v-model="AnimalApply.anisortid" placeholder="请选择部门" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in allSort"
                    :key="item.id"
                    :label="item.chinesename"
                    :value="item.id">
                  <span style="float: left">{{ item.chinesename }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.deptCount}}
                </span></span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="英文名：" prop="foreignname">
              <el-input v-model="AnimalApply.foreignname" placeholder="请输入英文名：" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="数量：" prop="number">
              <el-input v-model="AnimalApply.number" placeholder="请输入中文名：" clearable onkeyup="value=value.replace(/[^\d]/g,0)"
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="体重：" prop="weight">
              <el-input v-model="AnimalApply.weight" placeholder="请输入体重：" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="食性：" prop="feeding">
              <el-input v-model="AnimalApply.feeding" placeholder="请输入食性：" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动习性" prop="habit">
              <el-input v-model="AnimalApply.habit" placeholder="请输入活动习性" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介:" prop="jianjie">
              <el-input v-model="AnimalApply.jianjie" type="textarea" placeholder="请输入简介:"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="特征:" prop="feature">
              <el-input v-model="AnimalApply.feature" type="textarea" placeholder="请输入特征:"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地理分布:" prop="distribution">
              <el-input v-model="AnimalApply.distribution" type="textarea" placeholder="请输入地理分布:"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="生态习性:" prop="ecohabit">
              <el-input v-model="AnimalApply.ecohabit" type="textarea" placeholder="请输入生态习性:"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="warning" plain @click="AddAnimal(edit)" style="width: 100%">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import VueQr from 'vue-qr' //生成二维码
export default {
  name: "AnimalUInfo",
  components: {
    VueQr
  },
  data(){
    return{
      config: {  //二维码参数
        value: 'http://forestrys.oss-cn-guangzhou.aliyuncs.com/2021/10/19/7668065d7cbf4057b36d5acecc36760f.jpg',//显示的值、跳转的地址
        logo: require('../../../assets/img/2.jpg'),//中间logo的地址
      },
      qrUrl:'',
      exportLink: '',
      downloadFilename: '',
      user: JSON.parse(window.sessionStorage.getItem('user')),
      quanxian: '',
      Animals: [],
      AniDeail: [],
      allSort: [],
      total:0,
      currentPage:1,
      size:3,
      isAniEdit: '',
      edit:'',
      allAniEmps: '',
      AnimalsVo:{
        mainper: undefined,
        AnnimalSort: undefined,
        chinesename:undefined
      },
      detailDialog: false,
      qrDialog:false,
      AddAnimalDialog: false,
      imagecropperKey: 0, // 上传组件id
      allDepEmp:{
        departmentId: ''
      },
      AnimalApply: {
        chinesename: undefined,
        foreignname: undefined,
        mainper: undefined,
        length: undefined,
        weight: undefined,
        height: undefined,
        feeding: undefined,
        breed: undefined,
        habit: undefined,
        location: undefined,
        jianjie: undefined,
        feature: undefined,
        distribution: undefined,
        ecohabit: undefined,
        operator: undefined,
        number: undefined,
        anisortid: undefined
      },
      AnimalRules: {
        anisortid:[{
          required: true,
          message: '请选择动物种类：',
          trigger: 'blur'
        }],
        ChineseName: [{
          required: true,
          message: '请输入中文名：',
          trigger: 'blur'
        }],
        ForeignName: [{
          required: true,
          message: '请输入英文名：',
          trigger: 'blur'
        }],
        picture: [{
          required: true,
          message: '请上传图片：',
          trigger: 'blur'
        }],
        // mainper: [{
        //   required: true,
        //   message: '请输入负责人',
        //   trigger: 'change'
        // }],
        length: [{
          required: true,
          message: '请输入体长：',
          trigger: 'blur'
        }],
        weight: [{
          required: true,
          message: '请输入体重：',
          trigger: 'blur'
        }],
        height: [{
          required: true,
          message: '请输入身高：',
          trigger: 'blur'
        }],
        feeding: [{
          required: true,
          message: '请输入食性：',
          trigger: 'blur'
        }],
        breed: [{
          required: true,
          message: '请输入繁殖：',
          trigger: 'blur'
        }],
        habit: [{
          required: true,
          message: '请输入活动习性',
          trigger: 'blur'
        }],
        location: [{
          required: true,
          message: '请输入位置:',
          trigger: 'blur'
        }],
        jianjie: [{
          required: true,
          message: '请输入简介:',
          trigger: 'blur'
        }],
        feature: [{
          required: true,
          message: '请输入特征:',
          trigger: 'blur'
        }],
        distribution: [{
          required: true,
          message: '请输入地理分布:',
          trigger: 'blur'
        }],
        ecoHabit: [{
          required: true,
          message: '请输入生态习性:',
          trigger: 'blur'
        }],
      },
    }
  },
  //点进页面自动查询所有申请信息
  mounted() {
    this.initAnimal();
  },
  methods:{
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
    // 添加and修改动物
    AddAnimal(edit){
      console.log(this.isAniEdit)
      this.AnimalApply.operator =this.user.name
      if (this.isAniEdit == false){
        this.$refs.animalForm.validate((valid) => {
          if (valid) {
            this.postRequest('/animals/basic/addAnimal', this.AnimalApply).then(resp=> {
              if (resp) {
                this.initAnimal()
                this.AddAnimalDialog = false
              }
            })
          }else{
            this.$message.error('有必填项为空！')
          }
        })
      }
      else {
        this.$refs.animalForm.validate((valid) => {
          if (valid) {
            this.putRequest('/animals/basic/updateAdmin',this.AnimalApply).then(resp=>{
              if (resp) {
                this.initAnimal()
                this.AddAnimalDialog = false
              }
            })
          }else {
            this.$message.error('有必填项为空！')
          }
        })
      }
    },
    toAddAnimal(edit){
      this.isAniEdit = edit
      this.AddAnimalDialog = true
      this.restAddDialog()
      this.getRequest('/animals/basic/AnimalSort').then(resp=>{
        if (resp){
          this.allSort = resp
        }
      })
    },
    //打开编辑窗口
    toUpdateAnimal(index,edit){
      this.isAniEdit = edit
      this.AddAnimalDialog = true
      console.log(index)
      Object.assign(this.AnimalApply,index)
      this.AnimalApply.picture= index.picture
    },
    restAddDialog(){
      this.AnimalApply.chinesename=null
      this.AnimalApply.habit=null
      this.AnimalApply.foreignname=null
      this.AnimalApply.mainper=null
      this.AnimalApply.length=null
      this.AnimalApply.weight=null
      this.AnimalApply.height=null
      this.AnimalApply.feeding=null
      this.AnimalApply.breed=null
      this.AnimalApply.location=null
      this.AnimalApply.jianjie=null
      this.AnimalApply.feature=null
      this.AnimalApply.distribution=null
      this.AnimalApply.ecohabit=null
      this.AnimalApply.number=null
      this.AnimalApply.anisortid=null
      this.AnimalApply.picture=null
    },
    showDetail(index){
      this.$router.push({
        path: '/InfoShow',
        name: 'InfoShow',
        params: {
          name: index,
        }
      })
    },
    deleteAnimal(animal){
      this.$confirm('此操作将永久删除该['+animal.chinesename+']主题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/animals/basic/animals/'+animal.id).then(resp=>{
          if (resp){
            this.initAnimal()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initAnimal(type){
      //获得本部门所有员工 allDepEmp
      let url2 = '/employee/basic/list?'
      this.allDepEmp.departmentId= this.user.employee[0].departmentId
      if(this.allDepEmp.departmentId) {
        url2 += '&departmentId=' + this.allDepEmp.departmentId;
      }
      this.getRequest(url2).then(resp => {
        if (resp) {
          this.allAniEmps = resp.data
        }
      })
      console.log(this.user.employee[0].departmentId)
      if (this.user.employee[0].departmentId != 7 || (this.user.employee[0].departmentId =7 && this.user.employee[0].minister != 0)){
        this.quanxian = true
      }else {
        this.quanxian = false
      }
      let url = '/animals/basic/AllAdmin?currentPage='+this.currentPage + '&size=' +this.size;
      this.AnimalsVo.anisortid = type
      console.log( this.AnimalsVo.anisortid)
      if(type){
        url += '&anisortid=' + this.AnimalsVo.anisortid
        // if(type==0 && this.AnimalsVo.chinesename) {
        //   url += '&chinesename=' + this.AnimalsVo.chinesename
        // }
      }
      this.getRequest(url).then(resp=>{
        if (resp){
          this.total = resp.total
          this.Animals = resp.data
        }
      })

    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initAnimal();
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initAnimal();
    },
    //上传头像
    uploasdImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          console.log(resp)
          this.AnimalApply.picture=resp.data.url;
          console.log( this.AnimalApply.picture)
        }
      })
    },
    //删除图片
    deleteRemove() {
      let formData = new FormData()
      formData.append('file', this.AnimalApply.picture)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.AnimalApply.picture=''
        }
      })
    },
  }
}
</script>

<style scoped>
.p-feature{
  margin-top: 30px;
  line-height: 32px;
  text-indent:2em;
  font-size: 16px;
}
.card-container{
  margin-top: 30px;
  line-height: 32px;
  /*height: 700px;*/
  /*font-size: 17px;*/
  /*font-family: 楷体;*/
  font-size: 14px;
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
.onedialog-name{
  width: 100%;
  height: 40px;
  background-color: #656768;
  text-align: center;
  font-family: 微软雅黑;
  font-size: 22px;
  color: #FFFFFF;
}
.onedialog{
  width: 100%;
  height: 300px;
  background-color: #464849;
}
.fengexian{
  width: 655px;
  margin-top: 33px;
}
.right-picture{
  width: 300px;
  height: 200px;
}
.right-right{
  float: left;
  font-family:华文行楷;
  font-size:25px;
  color: #af2eaa;
  text-align: center
}
.right-left{
  float: left;
  width: 300px;
  height: 220px;
}
.left-button{
  font-size: 20px;
  font-family: 行楷;
  width: 100%;
  height: 80px;
  margin-left: 0;
  /*background-color: #9ab5bd;*/
  /*//9ab5bd*/
}
.left-tow{
  margin-top: -20px;
  width: 400px;
  height: 50px;
  background-color: #fac258;
  font-size:20px;
  font-family: 行楷;
  color: #FFFFFF;
  text-align: center;
}
.left-f{
  width: 400px;
  height: 50px;
  background-color: #fac258;
}
.left-one{
  margin-top: 0px;
  font-family:华文行楷;
  font-size:55px;
  color: #FFFFFF;
  text-align: center;

}
.left{
  background-color: #adc9d2;
  float: left;
  width: 400px;
  height: 800px;
  margin-left: -20px;
}
.right{
  float: right;
  /*background-color: #af2eaa;*/
  /*height: 500px;*/
  width: 1000px;
  margin-right: -20px;
}
.demo-form-inline{
  margin-left: 370px;
}
.el-upload__tip{
  margin-left: 300px;
  /*float: right;*/
  margin-top: -45px;
  margin-bottom: 18px;
}
</style>