<template>
<div>
  <el-form :inline="true" :model="historyVo"  class="demo-form-inline">
    <el-form-item label="记录人编号：" label-width="100px" prop="writeper">
      <el-input v-model="historyVo.writeper" :disabled="true" placeholder="请输入植物编号"></el-input>
    </el-form-item>
    <el-form-item label="植物名称：" label-width="100px">
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
      <el-button type="warning" icon="el-icon-download" @click="exportHistory">导出</el-button>
    </el-form-item>
  </el-form>
  <el-table
      v-if="allData"
      :data="allData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      :cell-style="{padding: '0'}"
  >
    <el-table-column
        type="selection"
        width="80">
    </el-table-column>
    <el-table-column type="expand" style="background-color: #af2eaa">
      <template #default="props" >
        <p style="font-size: 21px;font-family: 楷体;color: #e8ba2b; font-weight: 600;">生长状态: {{ props.row.growdata}}</p>
        <p style="font-size: 21px;font-family: 楷体;color: #e8ba2b; font-weight: 600;">健康情况: {{ props.row.health}}</p>
        <p style="font-size: 21px;font-family: 楷体;color: #e8ba2b; font-weight: 600;">其他: {{ props.row.reset}}</p>
        <el-image class="extend-img" :src="props.row.picturedata" :preview-src-list="[props.row.picturedata]">
        </el-image>
      </template>
    </el-table-column>
    <el-table-column
        prop="id"
        fixed
        label="#"
        width="50">
    </el-table-column>
    <el-table-column
        prop="writeper"
        label="记录人"
        width="110">
    </el-table-column>
    <el-table-column
        prop="writetime"
        label="记录时间"
        width="110">
    </el-table-column>
    <el-table-column
        prop="animals.chinesename"
        label="植物名称"
        width="100">
    </el-table-column>
    <el-table-column
        prop="animals.location"
        label="所在地区"
        width="80">
    </el-table-column>
    <el-table-column
        prop="lengthdata"
        label="体长"
        width="100">
      <template slot-scope="scope">
        <span class="el-tag el-tag--success el-tag--mini el-tag--light">{{scope.row.lengthdata}}厘米</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="weigthdata"
        label="体重"
        width="100">
      <template slot-scope="scope">
        <span class="el-tag el-tag--warning el-tag--mini el-tag--light">{{scope.row.weigthdata}}公斤</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="height"
        label="身高"
        width="100">
      <template slot-scope="scope">
        <span class="el-tag el-tag--warning el-tag--mini el-tag--light">{{scope.row.height}}厘米</span>
      </template>
    </el-table-column>
    <el-table-column
        property="picturedata"
        label="全局图片"
        height="86"
        width="86">
      <template #default="scope">
        <el-image class="table-td-thumb" :src="scope.row.picturedata" :preview-src-list="[scope.row.picturedata]">
        </el-image>
      </template>
    </el-table-column>
    <el-table-column
        prop="breedsituation"
        label="繁殖情况"
        width="180">
    </el-table-column>
    <el-table-column
        prop="growdata"
        label="生长状态"
        width="180">
    </el-table-column>
    <el-table-column
        prop="health"
        label="健康情况"
        width="180">
    </el-table-column>
    <el-table-column
        label="操作"
        fixed="right"
        width="210"
    >
      <template slot-scope="scope">
        <el-button type="success" @click="" icon="el-icon-edit" plain></el-button>
        <el-button type="danger"  @click="deleteDate(scope.$index, scope.row)" icon="el-icon-delete" plain ></el-button>
        <el-button type="warning"  icon="el-icon-s-tools" plain></el-button>
      </template>
    </el-table-column>

  </el-table>
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
  name: "TableData",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      allData:[],
      allAnimal:[],
      total:0,
      currentPage:1,
      size:4,
      multipleSelection: [],
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
    //删除
    deleteDate(index,data) {
      this.$confirm('此操作将永久删除该['+data.animals.chinesename+']数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/animals/basic/Data/'+data.id).then(resp=>{
          if (resp){
            this.initAniData();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //导出
    exportHistory(){
      this.downloadRequest('/animals/basic/export');
    },
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
    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(val);
    },
  }
}
</script>

<style scoped>
.extend-img{
  width: 200px;
  height: 200px;
}
</style>