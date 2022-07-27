<template>
  <div>

    <!--  用户列表卡片v-if="foo"-->
    <el-card class="box-card">
      <el-form :inline="true" :model="sortVO"  class="demo-form-inline">
        <el-form-item label="植物种类" label-width="70px">
          <el-select v-model="sortVO.sort" placeholder="请选择">
            <el-option
                v-for="item in sort"
                :key="item.sort"
                :label="item.sort"
                :value="item.sort">
              <span style="float: left">{{ item.sort }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.applyNum}}
                </span></span>
            </el-option>
          </el-select>
        </el-form-item>
        <!--      按钮:disabled="multipleSelection.length==0"-->
        <el-form-item style="margin-left: 10px">
          <el-button icon="el-icon-refresh" @click="resetUserVo">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="initSort('advanced')">查询</el-button>
          <el-button type="warning" icon="el-icon-download" @click="">导出</el-button>
          <el-button type="success" icon="el-icon-bicycle">导入</el-button>
          <el-button type="danger" icon="el-icon-delete" :disabled="multipleSelection.length==0" @click="deletemany" >批量删除</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
          v-if="Sorts"
          :data="Sorts"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          :cell-style="{padding: '0'}"
      >
        <el-table-column
            type="selection"
            width="80">
        </el-table-column>
        <el-table-column type="expand" style="background-color: #af2eaa" width="80">
          <template #default="props" >
            <p style="font-size: 19px;font-family: 楷体;color: #61c091; font-weight: 600;">植物名称: {{ props.row.plant.plantname}}</p>
          </template>
        </el-table-column>
        <el-table-column
            prop="id"
            fixed
            label="#"
            width="100">
        </el-table-column>
        <el-table-column
            prop="sort"
            sortable
            label="种类"
            width="200">
          <template slot-scope="scope">
            <span class="el-tag el-tag--success el-tag--mini el-tag--light">{{scope.row.sort}}</span>
          </template>
        </el-table-column>

        <el-table-column
            label="操作"
            fixed="right"
            width=""
        >
          <template slot-scope="scope">
            <el-button type="success" @click="updateShow(scope.$index, scope.row,true)" icon="el-icon-edit" plain></el-button>
            <el-button type="danger"  @click="deleteUser(scope.$index, scope.row)" icon="el-icon-delete" plain ></el-button>
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
    </el-card>

  </div>
</template>

<script>



export default {
  name: "PlantSort",

  data() {
    return {
      multipleSelection: [],
      Sorts: [],
      sort: [],
      total: 0,
      currentPage: 1,
      size: 4,
      sortVO: {
        sort: ''
      },
    }
  },

  mounted() {
    this.initSort();
  },
  methods: {
    //删除用户
    deleteUser(index,data) {
      this.$confirm('此操作将永久删除该['+data.sort+']种类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/sort/'+data.id).then(resp=>{
          if (resp){
            this.initSort();
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
        this.deleteRequest('/system/sort/'+ ids).then(resp=>{
          if (resp){
            this.initSort();
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
    },
    initSort(type){
      //把后端的currentPage，size传过来
      let url = '/system/sort/AllAdmin?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'advanced'){
        if (this.sortVO.sort){
          url +='&sort=' +this.sortVO.sort;
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.Sorts = resp.data;
          this.total=resp.total
        }
      })
      this.getRequest('/system/sort/AllAdmin').then(resp => {
        if (resp) {
          this.sort = resp.data
        }
      })
    },
    //  重置表单
    resetUserVo(){
      this.sortVO.sort = ''
      this.initSort()
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initSort();
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initSort();
    },
  },

}
</script>

<style scoped>
.table-td-thumb{
  width: 200px;
  height: 200px;
}
</style>