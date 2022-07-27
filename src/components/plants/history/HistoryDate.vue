<template>
  <div>
      <el-form :inline="true" :model="historyVo"  class="demo-form-inline">
        <el-form-item label="记录人编号：" label-width="100px" prop="writeper">
          <el-input v-model="historyVo.writeper" :disabled="true" placeholder="请输入植物编号"></el-input>
        </el-form-item>
        <el-form-item label="植物名称：" label-width="100px">
          <el-select v-model="historyVo.plantid" placeholder="请选择">
            <el-option
                v-for="item in Plants"
                :key="item.id"
                :label="item.plantname"
                :value="item.id">
              <span style="float: left">{{ item.plantname }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.deptCount}}
                </span></span>
            </el-option>
          </el-select>
        </el-form-item>
        <!--      按钮-->
        <el-form-item style="margin-left: 10px">
          <el-button icon="el-icon-refresh" @click="resetHistoryVo">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="initDate('advanced')">查询</el-button>
          <el-button type="warning" icon="el-icon-download" @click="exportHistory">导出</el-button>
          <el-button type="danger" icon="el-icon-delete" :disabled="multipleSelection.length==0" @click="deletemany" >批量删除</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
          v-if="PlantDate"
          :data="PlantDate"
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
            <p style="font-size: 21px;font-family: 楷体;color: #e8ba2b; font-weight: 600;">其他: {{ props.row.rests}}</p>
            <el-image class="extend-img" :src="props.row.statuspicture" :preview-src-list="[props.row.statuspicture]">
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
            prop="plant.plantname"
            label="植物名称"
            width="100">
        </el-table-column>
        <el-table-column
            prop="plant.location"
            label="种植地区"
            width="80">
        </el-table-column>
        <el-table-column
            prop="height"
            label="高度"
            width="100">
          <template slot-scope="scope">
            <span class="el-tag el-tag--success el-tag--mini el-tag--light">{{scope.row.height}}cm</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="temperature"
            label="温度"
            width="100">
          <template slot-scope="scope">
            <span class="el-tag el-tag--warning el-tag--mini el-tag--light">{{scope.row.temperature}}摄氏度</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="stemleaf"
            label="茎叶情况"
            width="180">
        </el-table-column>
        <el-table-column
            prop="stemPicture"
            label="茎叶图片"
            height="86"
            width="86">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.stempicture" :preview-src-list="[scope.row.stempicture]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="diseases"
            label="病虫情况"
            width="180">
        </el-table-column>
        <el-table-column
            property="diseaPicture"
            label="病虫图片"
            height="86"
            width="86">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.diseapicture" :preview-src-list="[scope.row.diseapicture]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="生长状态"
            width="180">
        </el-table-column>
        <el-table-column
            property="statusPicture"
            label="全局图片"
            height="86"
            width="86">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.statuspicture" :preview-src-list="[scope.row.statuspicture]">
            </el-image>
          </template>
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
  name: "HistoryDate",
  data(){
    return{
      user: JSON.parse(window.sessionStorage.getItem('user')),
      PlantDate: [],
      multipleSelection: [],
      Plants: [],
      total:0,
      currentPage:1,
      size:4,
      historyVo: {
        plantid: '',
        writeper: '',
      },
    }
  },
  //点进页面自动查询所有用户信息
  mounted() {
    this.initDate('advanced');
  },
  methods: {
    //导出
    exportHistory(){
      this.downloadRequest('/plant/info/export');
    },
    initDate(type){
      if(this.user.employee[0].minister !=0){
        this.historyVo.writeper = this.user.name
      }
      //把后端的currentPage，size传过来
      let url = '/plant/info/AllDate?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'advanced'){
        if (this.historyVo.writeper){
          url +='&writeper=' +this.historyVo.writeper
        }
        if (this.historyVo.plantid){
          console.log(this.historyVo.plantid)
          url +='&plantid=' +this.historyVo.plantid
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.PlantDate = resp.data;
          this.total=resp.total
        }
      })
      this.getRequest('/plant/info/All/Plant').then(resp => {
        if (resp) {
          this.Plants = resp;
        }
      })
    },
    //重置表单
    resetHistoryVo(){
      this.historyVo.plantname=null
      this.initDate('advanced')
    },
    //删除
    deleteDate(index,data) {
      this.$confirm('此操作将永久删除该['+data.plant.plantname+']数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/plant/info/Date/'+data.id).then(resp=>{
          if (resp){
            this.initDate();
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
      this.$confirm('此操作将永久删除该['+this.multipleSelection.length+']个数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获得所有id，ids
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest('/plant/info/'+ ids).then(resp=>{
          if (resp){
            this.initDate();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initDate();
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initDate();
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(val);
    },
  },

}
</script>

<style scoped>
.extend-img{
  width: 200px;
  height: 200px;
}
</style>