<template>
  <div>
    <!--  用户列表卡片v-if="foo"-->
    <el-card class="box-card">
      <el-form :inline="true" :model="userVo"  class="demo-form-inline">
        <el-form-item label="活动主题" label-width="70px">
          <el-select v-model="userVo.applyid" placeholder="请选择">
            <el-option
                v-for="item in applys"
                :key="item.id"
                :label="item.subject"
                :value="item.id">
              <span style="float: left">{{ item.subject }}</span>
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
          <el-button type="primary" icon="el-icon-search" @click="initOrder('advanced')">查询</el-button>
          <el-button type="warning" icon="el-icon-download" @click="downloadInfo">导出</el-button>
          <el-button type="success" icon="el-icon-bicycle">导入</el-button>
          <el-button type="danger" icon="el-icon-delete"  @click="" >批量删除</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table
          v-if="Orders"
          :data="Orders"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          :cell-style="{padding: '0'}"
      >
        <el-table-column
            type="selection"
            width="30">
        </el-table-column>
        <el-table-column type="expand" style="background-color: #af2eaa">
          <template #default="props" >
            <p style="font-size: 19px;font-family: 楷体;color: #61c091; font-weight: 600;">活动内容: {{ props.row.applys.content}}</p>
            <p style="font-size: 19px;font-family: 楷体;color: #61c091;font-weight: 600;">地址: {{ props.row.applys.place }}</p>
              <el-image class="table-td-thumb" :src="props.row.applys.picture" :preview-src-list="[props.row.applys.picture]">
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
            prop="name"
            sortable
            label="姓名"
            width="110">
        </el-table-column>
        <el-table-column
            prop="idnumeber"
            label="身份证号码"
            width="180">
        </el-table-column>
        <el-table-column
            prop="telephone"
            label="联系方式"
            width="140">
        </el-table-column>
        <el-table-column
            prop="applys.subject"
            label="活动主题"
            width="120">
        </el-table-column>
        <el-table-column
            prop="applys.starttime"
            label="活动开始时间"
            width="140">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="100">
            <template slot-scope="scope">
              <span class="el-tag el-tag--primary el-tag--mini el-tag--light">{{scope.row.status==0?'预约成功':(scope.row.status==1?'取消预约成功':'预约失败')}}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="applys.applyper"
            label="活动负责人"
            width="140">
        </el-table-column>
        <el-table-column
            prop="applys.telephone"
            label="负责人联系方式"
            width="140">
        </el-table-column>

        <el-table-column
            label="操作"
            fixed="right"
            width="210"
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
import VueQr from 'vue-qr' //生成二维码
export default {
  name: "ActInfo",
  data() {
    return {
      Orders: [],
      applys: [],
      handleSelectionChange: [],
      total: 0,
      currentPage: 1,
      size: 4,
      userVo: {
        applyid: ''
      },
    }
  },
  mounted() {
    this.initOrder();
  },
  methods: {
    //导出
    downloadInfo(){
      this.downloadRequest('/or/info/export');
    },
    initOrder(type){
      //把后端的currentPage，size传过来
      let url = '/or/info/AllInfo?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'advanced'){
        if (this.userVo.applyid){
          url +='&applyid=' +this.userVo.applyid;
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.Orders = resp.data;
          this.total=resp.total
          console.log(resp);
        }
      })
      this.getRequest('/act/apply/AllApply').then(resp => {
        if (resp) {
          this.applys = resp.data
        }
      })
    },
    //  重置表单
    resetUserVo(){
      this.userVo.applyid = ''
      this.initOrder()
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initOrder();
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initOrder();
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