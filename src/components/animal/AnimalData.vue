<template>
  <div>
    <el-form :inline="true" :model="AnimalsVo"  class="demo-form-inline">
      <el-form-item label="负责人Id：" label-width="100px" prop="mainper">
        <el-input v-model="AnimalsVo.mainper" :disabled="true" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="动物名称：" label-width="100px" prop="chinesename">
        <el-input v-model="AnimalsVo.chinesename" placeholder=""></el-input>
      </el-form-item>
      <!--      按钮-->
      <el-form-item style="margin-left: 10px">
        <el-button type="warning" icon="el-icon-refresh" @click="">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="initAnimal">查询</el-button>
        <el-button type="success" icon="el-icon-add" @click="toAddAnimal(false)">添加动物</el-button>
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
          <div class="right-left">
            <img :src="animal.picture" class="right-picture">
          </div>
          <div slot="header" class="right-right">

            <div style="float: right;margin-right: -10px">
              <el-button style=" padding: 3px 0;color: crimson;margin-top: 3px;margin-right: 7px" type="text" icon="el-icon-delete" @click="deleteAnimal(animal)"></el-button>
              <template>
                <el-button type="warning" icon="el-icon-plus" size="mini" @click="WriteDetail(animal)">填写监测信息>>></el-button>
              </template>
            </div>
            <el-divider class="fengexian"></el-divider>
            <div style="font-family:华文行楷;font-size:28px;color: #272c33; text-align: center;font-weight: 400;margin-left: 80px;margin-bottom: 15px"><span>{{animal.chinesename}}</span></div>

            <div style="font-family:楷体;font-size:22px;color: #272c33; text-align: center;font-weight: 400;margin-bottom: 10px">
              外文名：<span>{{animal.foreignname}}</span></div>
            <div style="font-family:楷体;font-size:22px;color: #272c33; text-align: center;font-weight: 400;margin-bottom: 10px">
              所在位置：<span>{{animal.location}}</span></div>

            <div style="font-family:楷体;font-size:22px;color: #272c33; text-align: center;font-weight: 400">
              负责人：<span>{{animal.mainper}}</span></div>
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
    <el-dialog  :visible.sync="detailDialog"   title="动物详情" >
      <div>
        <div class="onedialog">
          <div class="onedialog-name"><span>{{AniDeail.chinesename}}</span>
            <span>{{AniDeail.foreignname}}</span></div>
          <div>
            <div  class="left-picture">
              <img :src="AniDeail.picture" class="detail-gif">
            </div>
            <div  class="right-text">
              <div><span>界：动物界 Animalia</span></div>
              <div><span>门：脊索动物门 chordata</span></div>
              <div><span>纲：哺乳动物纲 Mammalia</span></div>
              <div><span>目：食肉目 Carnivora</span></div>
              <div><span>分布：{{AniDeail.distribution}}</span></div>
            </div>
          </div>
        </div>
        <div class="dialog_text">
          <div class="card-container">
            <el-card>
              <div><span>中文名：{{AniDeail.chinesename}}</span></div>
              <div><span>外文名：{{AniDeail.foreignname}}</span></div>
              <div><span>所属分类：{{AniDeail.sort.chinesename}}</span></div>
              <div><span>简要：{{AniDeail.jianjie}}</span></div>
            </el-card>
            <div>
            </div>
          </div>
          <div style="margin-top: 49px;font-size: 19px">
            <div style="margin-left: 50px"><span>体长：{{AniDeail.length}}厘米</span>
              <div style="float: right;margin-right: 145px"><span>身高：{{AniDeail.height}}</span></div></div>
            <el-divider></el-divider>
            <div style="margin-left: 50px"><span>体重：{{AniDeail.weight}}公斤</span><div style="float: right;margin-right: 145px"><span>食性：{{AniDeail.feeding}}</span></div></div>
            <el-divider></el-divider>
            <div style="margin-left: 50px"><span>繁殖：{{AniDeail.breed}}</span>  <div style="float: right;margin-right: 145px"><span>习性：{{AniDeail.habit}}</span></div></div>
            <el-divider></el-divider>
            <div style="margin-left: 50px"><span>位置：{{AniDeail.location}}</span></div>
          </div>
          <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 30px;margin-top: 20px;font-family: 楷体">外形特征 Description</div>
          <div><p class="p-feature">{{AniDeail.feature}}</p></div>
          <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 30px;margin-top: 20px;font-family: 楷体">生态习性 EcologicaHabit</div>
          <div><p class="p-feature">{{AniDeail.ecohabit}}</p></div>
          <div style="background-color: #adc9d2;color: #FFFFFF;font-size: 30px;margin-top: 20px;font-family: 楷体">地理分布 Distribution</div>
          <div><p class="p-feature">{{AniDeail.distribution}}</p></div>
        </div>
      </div>

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
              <el-select v-model="AnimalApply.mainper" placeholder="请输入负责人" clearable :style="{width: '100%'}">
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
    <el-dialog v-bind="$attrs" v-on="$listeners"   :visible.sync="AniDataDialog" title="动物数据监测">
      <el-row :gutter="15">
        <el-form ref="aniDataForm" :model="AniDataApply" :rules="AniDataRules" size="medium" label-width="100px">
          <el-upload
              class="upload-demo"
              :key="imagecropperKey1"
              :http-request="uploadDataImg"
              :on-remove="deleteDataRemove"
              action="string"
              list-type="picture">
            <div slot="tip" class="el-upload__tip">
              <img  v-if="" :src=AnimalApply.picturedata alt="" style="width: 300px;height: 200px;">
              <div>注：只能上传jpg/png文件，且不超过500kb</div>
            </div>
            <div style="margin-left: 180px;">
              <el-button  type="warning" plain>上传图片</el-button>
            </div>
          </el-upload>
          <el-col :span="8">
            <el-form-item label="动物编号" prop="animalid">
              <el-input v-model="AniDataApply.animalid" :disabled="true" placeholder="请输入动物编号" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="动物名称" prop="chinesename">
              <el-input v-model="AniDataApply.chinesename" :disabled="true" placeholder="请输入动物名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记录人" prop="writeper">
              <el-input v-model="AniDataApply.writeper" :disabled="true" placeholder="请输入记录人" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体长:" prop="lengthdata">
              <el-input v-model="AniDataApply.lengthdata" placeholder="请输入体长" clearable  oninput="value=value.replace(/[^\d]/g,'')"
                        prefix-icon='el-icon-platform-eleme' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体重:" prop="weigthdata">
              <el-input v-model="AniDataApply.weigthdata" placeholder="请输入体重" clearable  oninput="value=value.replace(/[^\d]/g,'')"
                        prefix-icon='el-icon-star-on' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身高:" prop="height">
              <el-input v-model="AniDataApply.height" placeholder="请输入身高" clearable prefix-icon='el-icon-warning'
                        oninput="value=value.replace(/[^\d]/g,'')"  :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="繁殖情况" prop="breedsituation">
              <el-input v-model="AniDataApply.breedsituation" type="textarea" placeholder="请输入繁殖情况"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="生长状态" prop="growdata">
              <el-input v-model="AniDataApply.growdata" type="textarea" placeholder="请输入生长状态"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="健康情况" prop="health">
              <el-input v-model="AniDataApply.health" type="textarea" placeholder="请输入健康情况"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="其他" prop="reset">
              <el-input v-model="AniDataApply.reset" type="textarea" placeholder="请输入其他"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button type="warning" plain @click="AddData" style="width: 100%">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
export default {
  name: "AnimalData",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      Animals: [],
      AniDeail: [],
      allSort: [],
      total:0,
      currentPage:1,
      size:3,
      isAniEdit: '',
      edit:'',
      AniDataApply: {
        animalid: undefined,
        writeper: undefined,
        lengthdata: undefined,
        weigthdata: undefined,
        height: undefined,
        breedsituation: "",
        growdata: undefined,
        health: undefined,
        reset: undefined,
        chinesename: undefined,
        picturedata: undefined,
      },
      AnimalsVo:{
        mainper: undefined,
        AnnimalSort: undefined,
        chinesename:undefined
      },
      detailDialog: false,
      AddAnimalDialog: false,
      AniDataDialog: false,
      imagecropperKey: 0, // 上传组件id
      imagecropperKey1: 1, // 上传组件id
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
        anisortid: undefined,
        picturedata: undefined
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
      AniDataRules: {
        animalid: [{
          required: true,
          message: '请输入动物编号',
          trigger: 'blur'
        }],
        writeper: [{
          required: true,
          message: '请输入记录人',
          trigger: 'blur'
        }],
        lengthdata: [],
        weigthdata: [],
        height: [],
        breedsituation: [],
        growdata: [],
        health: [{
          required: true,
          message: '请输入健康情况',
          trigger: 'blur'
        }],
        reset: [],
      },
    }
  },
  //点进页面自动查询所有申请信息
  mounted() {
    this.initAnimal();
  },
  methods:{
    //添加动物数据
    AddData(){
      this.$refs.aniDataForm.validate((valid) => {
        if (valid) {
          this.postRequest('/animals/basic/addAnimalData', this.AniDataApply).then(resp=> {
            if (resp) {
              this.initAnimal()
              this.AniDataDialog = false
            }
          })
        }else{
          this.$message.error('有必填项为空！')
        }
      })
    },
    WriteDetail(index){
      this.AniDataApply.animalid = index.id
      this.AniDataApply.writeper = this.user.name
      this.AniDataApply.chinesename = index.chinesename
       this.AniDataDialog = true
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
      this.detailDialog = true
      this.AniDeail = index
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
      this.AnimalsVo.mainper = this.user.employee[0].id
      console.log(this.AnimalsVo.mainper)
      let url = '/animals/basic/AllAdmin?currentPage='+this.currentPage + '&size=' +this.size;
      if(1){
        if(type) {
          this.AnimalsVo.anisortid = type
          url += '&anisortid=' + this.AnimalsVo.anisortid
        }
        if(this.AnimalsVo.chinesename) {
          url += '&chinesename=' + this.AnimalsVo.chinesename
        }
        if(this.AnimalsVo.mainper) {
          console.log(this.AnimalsVo.mainper)
          console.log("scdcd哈哈哈哈")
          url += '&mainper=' + this.AnimalsVo.mainper
        }
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
    //上传头像
    uploadDataImg(item) {
      let formData = new FormData()
      formData.append('file', item.file)
      this.postRequest('/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.AnimalApply.picturedata=resp.data.url
        }
      })
    },
    //删除图片
    deleteDataRemove() {
      let formData = new FormData()
      formData.append('file', this.AnimalApply.picturedata)
      this.postRequest('/deleteImgFile',formData).then(resp => {
        if (resp) {
          this.AnimalApply.picturedata=''
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
  width: 380px;
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
}
.right{
  float: left;
  /*background-color: #af2eaa;*/
  /*height: 500px;*/
  width: 1000px;
}
.demo-form-inline{
  margin-left: 170px;
}
.el-upload__tip{
  margin-left: 300px;
  /*float: right;*/
  margin-top: -45px;
  margin-bottom: 18px;
}
</style>