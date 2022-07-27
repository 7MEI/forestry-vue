<template>
  <div>
    <!--  用户列表卡片-->
    <el-card class="box-card">
      <el-form :inline="true" :model="userVo"  class="demo-form-inline">
        <el-form-item label="部门" label-width="70px">
          <el-select v-model="userVo.name" placeholder="请选择">
            <el-option
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{item.deptCount}}
                </span></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" label-width="70px">
          <el-input v-model="userVo.phone" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!--      按钮-->
        <el-form-item style="margin-left: 10px">
          <el-button icon="el-icon-refresh" @click="resetUserVo" >重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="initDepartment('advanced')">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="showAddView" >添加</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
          <el-button type="danger" icon="el-icon-delete" :disabled="multipleSelection.length==0" @click="deletemany" >批量删除</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
          :data="departments"
          border
          max-height="600"
          @selection-change="handleSelectionChange"
          style="width: 100%;">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            fixed
            prop="id"
            label="id"
            width="70">
        </el-table-column>
        <el-table-column
            prop="name"
            label="部门名"
            width="250">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="250">
        </el-table-column>
        <el-table-column
            prop="create_time"
            sortable
            label="创建时间"
            width="250">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="showEditView(scope.$index, scope.row)" icon="el-icon-edit" plain></el-button>
            <el-button type="danger"  @click="deleteDep(scope.$index, scope.row)" icon="el-icon-delete" plain ></el-button>
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
    <el-dialog
        title="编辑部门"
        :visible.sync="dialogVisible"
        width="50%"
        background-color="#61c091"
    >
      <div style="margin-bottom: 105px;font-size: 32px">
        <el-form ref="elForm"  size="medium" label-width="100px">
          <el-col :span="18">
            <el-form-item label="部门名" prop="name">
              <el-input v-model="updatePos.name" placeholder="请输入部门名" clearable
                        prefix-icon='el-icon-s-marketing' :style="{width: '554px;font-family: 华文行楷;font-size: 32px'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="updatePos.phone" placeholder="请输入联系电话" clearable
                        prefix-icon='el-icon-phone' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" style="background-color: #eaeaea ">取 消</el-button>
    <el-button type="primary" @click="toUpdate" style="background-color: #61c091">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="添加部门"
        :visible.sync="dialogAdd"
        width="50%"
        background-color="#61c091"
    >
      <div style="margin-bottom: 105px;font-size: 32px">
        <el-form ref="elForm"  size="medium" label-width="100px">
          <el-col :span="18">
            <el-form-item label="部门名" prop="name">
              <el-input v-model="addPos.name" placeholder="请输入部门名" clearable
                        prefix-icon='el-icon-s-marketing' :style="{width: '554px;font-family: 华文行楷;font-size: 32px'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="addPos.phone" placeholder="请输入联系电话" clearable
                        prefix-icon='el-icon-phone' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogAdd = false" style="background-color: #eaeaea ">取 消</el-button>
    <el-button type="primary" @click="toAdd" style="background-color: #61c091">确 定</el-button>
  </span>
    </el-dialog>
    <!--    <UserAdd :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></UserAdd>-->
  </div>
</template>

<script>
export default {
  name: "DepInfo",
  data() {
    return {
      multipleSelection: [],
      total: 0,
      currentPage:1,
      size:4,
      pos: {
        name: ''
      },
      dialogVisible: false,
      dialogAdd: false,
      updatePos: {
        name: '',
        phone: ''
      },
      addPos: {
        name: '',
        phone: ''
      },
      departments: [],
      userVo: {
        name: '',
        phone: '',
      },
    }
  },

  // 使用子组件
  components: {

    // UserAdd,,
  },
  mounted() {
    this.initDepartment();
  },
  methods: {
    //  重置表单
    resetUserVo(){
      this.userVo.name = ''
      this.userVo.phone= ''
      this.initDepartment()
    },
    deletemany() {
      this.$confirm('此操作将永久删除该['+this.multipleSelection.length+']个部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获得所有id，ids
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest('/department/deps/'+ ids).then(resp=>{
          if (resp){
            this.initDepartment();
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
      // console.log(val);
    },
    toAdd(){
      if (this.addPos.name && this.addPos.phone){
        this.postRequest('/department/deps/addDep',this.addPos).then(resp=>{
          if (resp){
            this.initDepartment();
            this.dialogAdd = false;
            this.addPos.phone='';
            this.addPos.name='';
          }
        })
      }else {
        this.$message.error('有必填项为空！')
      }

    },
    toUpdate(){
      this.putRequest('/department/deps/updateDep',this.updatePos).then(resp=>{
        if (resp){
          this.initDepartment();
          this.dialogVisible = false;
        }
      })
    },
    showEditView(index,data){
      Object.assign(this.updatePos,data);
      this.updatePos.createDate = '';
      this.dialogVisible = true;
    },
    showAddView(index,data){
      this.dialogAdd = true;
    },
    initDepartment(type) {
      //把后端的currentPage，size传过来
      let url = '/department/deps/AllDep?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'advanced') {
        if (this.userVo.name) {
          url += '&name=' + this.userVo.name;
        }
        if (this.userVo.phone) {
          url += '&phone=' + this.userVo.phone;
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.departments = resp.data;
          this.total=resp.total;
        }
      })
    },
    deleteDep(index,data) {
      this.$confirm('此操作将永久删除该['+data.name+']部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/department/deps/'+data.id).then(resp=>{
          if (resp){
            this.initDepartment();
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
      this.initDepartment();
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initDepartment();
    }

  }
}
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
</style>