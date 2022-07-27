<template>
    <div>
      <div>
        <el-input
          size="medium"
          class="selectInput"
          placeholder="输入关键字查询"
          v-model="good.selectKey"
          suffix-icon="el-icon-circle-plus-outline">
        </el-input>
        <el-button
          size="medium" icon="el-icon-circle-plus-outline" type="success"
          @click="handleSelectKey">查询
        </el-button>
        <el-button
          type="primary" size="medium" icon="el-icon-plus" plain
          @click="showAddView(false)">添加
        </el-button>
      </div>
      <div>
        <el-table
          border
          height="480"
          ref="singleTable"
          :data="tableData"
          :cell-style="{padding: '0'}"
          highlight-current-row
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品品牌">
                  <span>{{ props.row.brand }}</span>
                </el-form-item>
                <el-form-item label="新旧程度">
                  <span class="el-tag el-tag--success el-tag--mini el-tag--light">
                    {{props.row.goodNewold+"成新"}}
                  </span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="使用须知">
                  <i class="el-icon-warning" style="margin-right: 2px"></i>
                  <span>{{ props.row.usedKnow }}</span>
                </el-form-item>
                <el-form-item label="上传时间">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            property="goodId"
            label="编号"
            width="60">
          </el-table-column>
          <el-table-column
            property="goodName"
            label="商品名称"
            width="480">
          </el-table-column>
          <el-table-column
            property="category"
            label="商品类型"
            width="100">
          </el-table-column>
          <el-table-column
            property="imgurl"
            label="商品图"
            width="70">
            <template #default="scope">
              <el-image class="table-td-thumb" :src="scope.row.imgurl" :preview-src-list="[scope.row.imgurl]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            property="rentPriceHour"
            label="价格/小时"
            width="90">
          </el-table-column>
          <el-table-column
            property="rentPriceDay"
            label="价格/天"
            width="80">
          </el-table-column>
          <el-table-column
            label="上传时间"
            width="130">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            property="status"
            label="审核状态"
            width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status==1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary" size="mini"icon="el-icon-edit" plain
                @click="showEditView(scope.$index, scope.row,true)">
              </el-button>
              <el-button
                type="danger" size="mini" icon="el-icon-delete" plain
                @click="handleDelete(scope.$index, scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--弹出框-->
      <el-dialog
            :title="isEdit ? '编辑商品' : '添加商品'"
            :visible.sync="dialogFormVisible">
        <el-row :gutter="15">
          <el-form ref="elForm" :model="good" :rules="rules" size="medium" label-width="100px">
            <el-col :span="23">
              <el-form-item label="上传图片" prop="imgurl" required>
                <el-upload
                  class="upload-demo"
                  action="string"
                  :http-request="uploadImg"
                  :on-remove="handleRemove"
                  list-type="picture">
                  <el-button v-if="hiddenadd" size="small" type="primary">点击上传</el-button>
                  <el-button v-if="hiddenupdate" size="small" type="warning">重新上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    <img v-if="hidden" :src=good.imgurl alt="" style="width: 80px;height: 80px">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品名称" prop="goodName">
                <el-input v-model="good.goodName" placeholder="请输入商品名称" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品类型" prop="category">
                <el-select v-model="good.category" placeholder="请选择商品类型" clearable :style="{width: '100%'}">
                  <el-option v-for="item in categoryOptions" :key="item.id" :label="item.categoryName" :value="item.categoryName"
                             :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品品牌" prop="brand">
                <el-input v-model="good.brand" placeholder="请输入商品品牌" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="新旧程度" prop="goodNewold">
                <el-select v-model="good.goodNewold" placeholder="请选择新旧程度" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in goodNewoldOptions" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="价格/小时" prop="rentPriceHour">
                <el-input-number v-model="good.rentPriceHour" placeholder="价格/小时" :step='1'></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="价格/天" prop="rentPriceDay">
                <el-input-number v-model="good.rentPriceDay" placeholder="价格/天" :step='1'></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户须知" prop="usedKnow">
                <el-input v-model="good.usedKnow" type="textarea" placeholder="请输入用户须知"
                          :autosize="{minRows: 2, maxRows: 2}" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品描述" prop="description">
                <el-input v-model="good.description" type="textarea" placeholder="请输入商品描述"
                          :autosize="{minRows: 3, maxRows: 3}" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer">
          <el-button @click="doCancel" type="danger">取消</el-button>
          <el-button type="success" @click="doAddorupdate(edit)">确定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'GoodManage',
    data () {
      return {
        hiddenadd:true,
        hiddenupdate:false,
        hidden:false,
        tableData: [],
        dialogFormVisible:false,
        isEdit:'',
        good: {
          goodId:null,
          userId:null,
          imgurl: null,
          goodName: undefined,
          category: undefined,
          brand: undefined,
          goodNewold: undefined,
          rentPriceHour: undefined,
          rentPriceDay: 0,
          usedKnow: undefined,
          description: undefined,
          updateTime:undefined,
          selectKey:''
        },
        rules: {
          goodName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
          category: [{ required: true, message: '请选择商品类型', trigger: 'change' }],
          brand: [],
          goodNewold: [{ required: true, message: '请选择新旧程度', trigger: 'change' }],
          rentPriceHour: [{ required: true, message: '价格/小时', trigger: 'blur' }],
          rentPriceDay: [{ required: true, message: '价格/天', trigger: 'blur' }],
          usedKnow: [],
          description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        },
        //下拉列表
        categoryOptions: [],
        goodNewoldOptions: [{
          "label": "9",
          "value": 9
        }, {
          "label": "8",
          "value": 8
        }, {
          "label": "7",
          "value": 7
        }, {
          "label": "6",
          "value": 6
        }, {
          "label": "5",
          "value": 5
        }, {
          "label": "4",
          "value": 4
        }, {
          "label": "3",
          "value": 3
        }, {
          "label": "2",
          "value": 2
        }, {
          "label": "1",
          "value": 1
        }],
      }
    },
    mounted () {
      this.initTable();
    },
    methods: {
      //查询全部数据
      initTable () {
        const user = JSON.parse(window.sessionStorage.getItem('user'));
        let userId = parseInt(user.userId);
        this.good.userId=userId;
        this.postRequest('/good/data/rent/' + userId).then(resp => {
          if (resp) {
            this.tableData = resp;
          }
        })
      },
      //打开添加页面
      showAddView(edit){
        this.resetView();
        this.hiddenadd=true;
        this.hidden=false;
        this.hiddenupdate=false;
        this.isEdit=edit;
        this.dialogFormVisible=true;
        //查询所有商品类型到下拉列表
        this.getRequest('/system/category/kind/').then(resp => {
          if (resp) {
            console.log(resp);
            this.categoryOptions = resp;
          }
        })
      },
      //显示弹出框赋值
      showEditView(index,data,edit){
        this.hiddenadd=false;
        this.hidden=true;
        this.hiddenupdate=true;
        this.isEdit=edit;
        this.dialogFormVisible=true;
        Object.assign(this.good,data);
        this.good.imgurl=data.imgurl;
      },
      //清空表单内容
      resetView () {
          this.good.imgurl='',
          this.good.goodName='',
          this.good.category='',
          this.good.brand='',
          this.good.goodNewold='',
          this.good.rentPriceHour='',
          this.good.rentPriceDay='',
          this.good.usedKnow='',
          this.good.description=''
      },
      //上传图片
    uploadImg(item) {
        console.log(item);
      let formData = new FormData()
      formData.append('file', item.file)
      this.hidden=false;
      this.postRequest('/good/data/uploadImgFile',formData).then(resp => {
        if (resp) {
          this.good.imgurl=resp.obj;
        }
      })
    },
      //删除图片
      handleRemove() {
        let formData = new FormData()
        formData.append('file', this.good.imgurl)
        this.postRequest('/good/data/deleteImgFile',formData).then(resp => {
          if (resp) {
            console.log(resp);
          }
        })
      },
      //添加事件
      doAddorupdate(edit){
        this.isEdit=edit;
        if (this.isEdit=false) {
          if (this.good.imgurl=='') {this.good.imgurl='http://equipment-rent.oss-cn-hangzhou.aliyuncs.com/2021/10/15/c657a57214c848dcbabe2d690b8871d0.jpg';}
          if (this.good.usedKnow==''){this.good.usedKnow='此人很懒，什么也没留下'}
          if (this.good.brand==''){this.good.brand='无'}
          this.postRequest('/good/data/rent/',this.good).then(resp=>{
            if (resp){
              console.log(resp);
              this.dialogFormVisible=false;
              this.$message.success('添加成功');
              this.initTable();
            }
          })
        }else {
          this.putRequest('/good/data/rent/',this.good).then(resp=>{
            if (resp){
              this.good.updateTime=this.getCurrentTime();
              this.dialogFormVisible=false;
              this.$message.success('修改成功');
              this.initTable();
            }
          })
        }

      },
      //取消添加事件
      doCancel(){
        this.dialogFormVisible = false;
        this.$message.info('操作已取消');
      },
      //查询
      handleSelectKey(){
        if (this.good.selectKey){
          this.postRequest('/good/data/rent/some/'+this.good.selectKey).then(resp=> {
            if (resp) {
              this.tableData=resp;
              this.good.selectKey='';
              this.$message.success('查询成功');
            }
          })
        }else {
          this.initTable();
        }
      },
      //删除事件
      handleDelete(index,data){
        this.$confirm('此操作将删除"'+data.goodName+'"商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/good/data/rent/'+data.goodId).then(resp=>{
            this.initTable();
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>

<style scoped>
  .selectInput{
    width: 220px;
    margin: 10px 10px 10px 15px;
  }
  .table-td-thumb{
    width: 40px;
    margin: 4px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-left: 120px;
    margin-bottom: 0;
    width: 50%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

</style>
