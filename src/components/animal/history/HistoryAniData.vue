<template>
  <div>
  <el-form :inline="true" :model="historyVo"  class="demo-form-inline">
    <el-form-item label="记录人编号：" label-width="100px" prop="writeper">
      <el-input v-model="historyVo.writeper" :disabled="true" placeholder="请输入动物编号"></el-input>
    </el-form-item>
    <el-form-item label="动物名称：" label-width="100px">
      <el-select v-model="historyVo.animalid" placeholder="请选择">
        <el-option
            v-for="item in allAnimal"
            :key="item.id"
            :label="item.chinesename"
            :value="item.id">
          <span style="float: left">{{ item.chinesename }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">

                </span></span>
        </el-option>
      </el-select>
    </el-form-item>
    <!--      按钮-->
    <el-form-item style="margin-left: 10px">
      <el-button icon="el-icon-refresh" @click="resetHistoryVo">重置</el-button>
      <el-button type="primary" icon="el-icon-search" @click="initAniData('advanced')">查询</el-button>
    </el-form-item>
  </el-form>
    <el-card class="box-card" v-for="(data,index) in allData" :key="index">
      <div slot="header"  style="font-family:华文行楷;font-size:30px; color: #af2eaa;margin-left: 620px">
        <span>{{data.animals.chinesename}}</span>
        <div style="float: right;">
          <template>
            <el-button type="warning" icon="el-icon-plus" @click="">查看详情>>></el-button>
          </template>
        </div>
      </div>
      <div>
        <div style="float: left;width: 210px;margin-bottom: 10px;margin-left: 30px">
          <img :src="data.picturedata" class="picture-container">
        </div>
        <div style=" float: right;width: 980px;margin-right: 10px;font-family: 楷体;font-weight: 550;font-size: 23px">
          <div>
          <div style="width: 980px">
            <div style="float: left;margin-left: 6px"><p>记录人：{{data.writeper}}</p></div>
            <div style="float: left;margin-left: 70px"><p>体长：{{data.lengthdata}}厘米</p></div>
            <div style="float: left;margin-left: 70px"><p>体重：{{data.weigthdata}}公斤</p></div>
            <div style="float: left;margin-left: 70px;width: 260px"><p>身高：{{data.height}}厘米</p></div>
          </div>

          </div>
          <el-divider class="fengexian"></el-divider>
          <div style="width: 100%"><p class="right-span">繁殖情况：{{data.breedsituation}}</p></div>
          <el-divider class="fengexian2"></el-divider>
          <div><p class="right-span">生长状态：{{data.growdata}}</p></div>
          <el-divider class="fengexian2"></el-divider>
          <div><p class="right-span">健康情况：{{data.health}}</p></div>
          <el-divider class="fengexian2"></el-divider>
          <div><p class="right-span">其他：{{data.reset}}</p></div>
          <el-divider class="fengexian2"></el-divider>
          <div style="float: right;margin-bottom: 9px">
            <span>记录人：{{data.writeper}}</span>
            <span>  |  {{data.writetime}}</span>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
export default {
  name: "HistoryAniData",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      allData:[],
      allAnimal:[],
      total:0,
      currentPage:1,
      size:4,
      historyVo: {
        animalid: '',
        writeper: '',
      },

    }
  },
  //点进页面自动查询所有用户信息
  mounted() {
    this.initAniData('advanced')
  },
  methods:{
    initAniData(type){
      if(this.user.employee[0].minister !=0){
        this.historyVo.writeper = this.user.name
      }

      //把后端的currentPage，size传过来
      let url = '/animals/basic/AllData?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'advanced'){
        if (this.historyVo.writeper){
          url +='&writeper=' +this.historyVo.writeper
        }
        if (this.historyVo.animalid){
          url +='&animalid=' +this.historyVo.animalid
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.allData = resp.data;
          this.total=resp.total
        }
      })
      this.getRequest('/animals/basic/allAnimalData').then(resp => {
        if (resp) {
          this.allAnimal = resp;
        }
      })
    },
    //重置表单
    resetHistoryVo(){
      this.historyVo.animalid=null
      this.initAniData('advanced')
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initAniData('advanced');
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initAniData('advanced');
    },
  },
}
</script>

<style scoped>
.fengexian{
  width: 100%;
  margin-top: 53px;
}
.box-card{
  width: 100%;
  margin-top: 15px;
}
.picture-container{
  width: 270px;
  height: 270px;
  border-radius: 270px;
}
</style>