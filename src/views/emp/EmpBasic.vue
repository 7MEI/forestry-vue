<template>
  <div>
    <el-card>
      <div style="display: flex;justify-content: space-around">
        <div>
          <el-form :inline="true" :model="empVo"  class="demo-form-inline">
            <el-form-item label="申请人:" label-width="70px">
              <el-input style="width: 300px;margin-right: 10px" prefix-icon="el-icon-search" clearable @clear="initEmp               "
                        placeholder="请输入员工名进行查询.." v-model="empVo.name" :disabled="showSearch"></el-input>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" :disabled="showSearch" @click="initEmp('change')">搜索</el-button>
            <el-button type="primary" @click="showSearch = !showSearch"><i :class="showSearch?'fa fa-angle-double-up ':'fa fa-angle-double-down'" aria-hidden="true">
            </i>高级搜索</el-button>
          </el-form>
        </div>
        <div>
          <el-button type="success" icon="el-icon-plus" @click="showAdd(false)">添加员工</el-button>
          <el-button type="warning" icon="el-icon-download" @click="downloadInfo">导出</el-button>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-show="showSearch" style="border: 1px solid #409EFF;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0">
          <el-row>
            <el-col :span="5">
              政治面貌：
              <el-select v-model="empDataApply.politicId" placeholder="请选择政治面貌:" clearable
                         style="width: 130px">
                <el-option
                    v-for="item in allStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                </span></span>
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </transition>
      <!--表格-->
      <el-table
          v-if="allEmp"
          :data="allEmp"
          style="width: 100%;margin-top: 19px"
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
            <p style="font-size: 20px;font-family: 楷体;color: #272c33; font-weight: 600;">最高学历: {{ props.row.tiptopDegree}}</p>
            <p style="font-size: 20px;font-family: 楷体;color: #272c33; font-weight: 600;">毕业学校: {{ props.row.school}}</p>
            <p style="font-size: 20px;font-family: 楷体;color: #272c33;font-weight: 600;">就读专业: {{ props.row.specialty }}</p>
          </template>
        </el-table-column>
        <el-table-column
            prop="id"

            label="#"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            sortable
            fixed
            label="姓名"
            width="110">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="60">
          <template slot-scope="scope">
            <el-tag>{{scope.row.gender}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生年月日"
            width="140">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="身份证号码"
            width="120">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻状况"
            width="140">
          <template slot-scope="scope">
            <el-tag>{{scope.row.wedlock}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="nation.name"
            label="民族"
            width="100">
          <template slot-scope="scope">
            <el-tag>{{scope.row.nation.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="nativePlace"
            label="籍贯"
            width="140">
        </el-table-column>
        <el-table-column
            prop="politicsStatus.name"
            label="政治面貌"
            width="140">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="140">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="联系电话"
            width="140">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="140">
        </el-table-column>
        <el-table-column
            prop="department.name"
            label="部门"
            width="140">
        </el-table-column>
        <el-table-column
            prop="minister"
            label="职位"
            width="140">
          <template slot-scope="scope">
            <span class="el-tag el-tag--success el-tag--mini el-tag--light">{{scope.row.minister==0?'部长':(scope.row.gender==1?'员工':'员工')}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="engageForm"
            label="劳动合同"
            width="140">
        </el-table-column>
        <el-table-column
            label="合同期限"
            width="100">
          <template slot-scope="scope">
            <el-tag>{{scope.row.contractTerm}}年</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            width="140">
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            width="140">
        </el-table-column>
        <el-table-column
            prop="workState"
            label="状态"
            width="140">
        </el-table-column>
        <el-table-column
            prop="workID"
            label="工号"
            width="140">
        </el-table-column>
        <el-table-column
            prop="conversionTime"
            label="转正日期"
            width="140">
        </el-table-column>
        <el-table-column
            prop="notWorkDate"
            label="离职日期"
            width="140">
        </el-table-column>
        <el-table-column
            prop="beginContract"
            label="合同起始日期"
            width="140">
        </el-table-column>
        <el-table-column
            prop="endContract"
            label="合同结束日期"
            width="140">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="210"
        >
          <template slot-scope="scope">
            <el-button type="success" @click="showUpdata(scope.$index, scope.row,true)" icon="el-icon-edit" plain></el-button>
            <el-button type="danger"  @click="deleteEmp(scope.$index, scope.row)" icon="el-icon-delete" plain ></el-button>
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
    <el-dialog style="width: 2200px;margin-left: -230px" v-bind="$attrs" v-on="$listeners" :visible.sync="empDialog" :title="this.isEmpEdit?'编辑员工信息':'添加员工信息'">
      <el-row :gutter="15">
        <el-form ref="empDataForm" :model="empDataApply" :rules="empDataRules" size="medium" label-width="100px">
          <el-col :span="6">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="empDataApply.name" placeholder="请输入单行文本姓名：" clearable prefix-icon='el-icon-user'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="empDataApply.idCard" placeholder="请输入身份证号：" clearable prefix-icon='el-icon-eleme'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="empDataApply.email" placeholder="请输入电子邮箱：" clearable
                        prefix-icon='el-icon-s-goods' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校：" prop="school">
              <el-input v-model="empDataApply.school" placeholder="请输入毕业院校：" clearable
                        prefix-icon='el-icon-shopping-cart-1' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="部门职位：" prop="minister">
              <el-select v-model="empDataApply.minister" placeholder="请选择部门职位" clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in ministerOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职日期：" prop="beginDate">
              <el-date-picker v-model="empDataApply.beginDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择入职日期：" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="性别：" prop="gender">
              <el-radio-group v-model="empDataApply.gender" size="medium">
                <el-radio v-for="(item, index) in genderOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker v-model="empDataApply.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择出生日期：" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="民族：" prop="nationId">
              <el-select v-model="empDataApply.nationId" placeholder="请选择民族:" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in allNation"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                <span class="el-tag el-tag--success el-tag--mini el-tag--plain">
                  {{}}
                </span></span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="empDataApply.phone" placeholder="请输入联系电话：" clearable
                        prefix-icon='el-icon-s-comment' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="专业名称:" prop="specialty">
              <el-input v-model="empDataApply.specialty" placeholder="请输入专业名称" clearable
                        prefix-icon='el-icon-no-smoking' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="转正日期：" prop="conversionTime">
              <el-date-picker v-model="empDataApply.conversionTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择转正日期：" clearable></el-date-picker>
            </el-form-item>
            <el-form-item label="婚姻状况：" prop="wedlock">
              <el-radio-group v-model="empDataApply.wedlock" size="medium">
                <el-radio v-for="(item, index) in wedlockOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="政治面貌：" prop="politicId">
              <el-select v-model="empDataApply.politicId" placeholder="请选择政治面貌:" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in allStatus"
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
            <el-form-item label="联系地址：" prop="address">
              <el-input v-model="empDataApply.address" placeholder="请输入联系地址：" clearable
                        prefix-icon='el-icon-s-custom' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="工号:" prop="workID">
              <el-input v-model="empDataApply.workID" placeholder="请输入工号" :disabled='true' clearable
                        prefix-icon='el-icon-school' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="合同起始：" prop="beginContract">
              <el-date-picker v-model="empDataApply.beginContract" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择合同起始：" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="籍贯：" prop="nativePlace">
              <el-input v-model="empDataApply.nativePlace" placeholder="请输入籍贯：" clearable
                        prefix-icon='el-icon-star-on' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="最高学历" prop="tiptopDegree">
              <el-select v-model="empDataApply.tiptopDegree" placeholder="请选择最高学历" clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in tiptopDegreeOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：" prop="departmentId">
              <el-select v-model="empDataApply.departmentId" placeholder="请选择部门:" clearable
                         :style="{width: '100%'}">
                <el-option
                    v-for="item in allDep"
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
            <el-form-item label="合同终止：" prop="endContract">
              <el-date-picker v-model="empDataApply.endContract" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              :style="{width: '100%'}" placeholder="请选择合同终止：" clearable></el-date-picker>
            </el-form-item>
            <el-col :span="13">
              <el-form-item label="聘用形式：" prop="engageForm">
                <el-radio-group v-model="empDataApply.engageForm" size="medium">
                  <el-radio v-for="(item, index) in engageFormOptions" :key="index" :label="item.value"
                            :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="9">

          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button style="width: 100%" type="primary"  plain @click="toAddOrEdit(edit)">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data(){
    return {
      showSearch: false,
      allEmp: [],
      allNation: [],
      allStatus: [],
      allDep: [],
      isEmpEdit:'',
      edit:[],
      total: 0,
      currentPage: 1,
      size: 10,
      multipleSelection: [],
      handleSelectionChange: [],
      empVo:{
        name
      },
      empDataApply: {
        name: undefined,
        gender: undefined,
        birthday: null,
        idCard: undefined,
        nationId: undefined,
        politicId: undefined,
        nativePlace: undefined,
        email: undefined,
        phone: undefined,
        address: undefined,
        tiptopDegree: undefined,
        school: undefined,
        specialty: undefined,
        workID: undefined,
        departmentId: undefined,
        beginDate: null,
        conversionTime: null,
        beginContract: null,
        endContract: null,
        engageForm: undefined,
        wedlock: undefined,
      },
      empDataRules: {
        name: [{
          required: true,
          message: '请输入姓名：',
          trigger: 'blur'
        }],
        gender: [{
          required: true,
          message: '性别：不能为空',
          trigger: 'change'
        }],
        birthday: [{
          required: true,
          message: '请选择出生日期：',
          trigger: 'change'
        }],
        idCard: [{
          required: true,
          message: '请输入身份证号：',
          trigger: 'blur'
        }],
        nationId: [{
          required: true,
          message: '请选择民族：',
          trigger: 'change'
        }],
        politicId: [{
          required: true,
          message: '请选择政治面貌：',
          trigger: 'change'
        }],
        nativePlace: [{
          required: true,
          message: '请输入籍贯：',
          trigger: 'blur'
        }],
        email: [],
        phone: [{
          required: true,
          message: '请输入联系电话：',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入联系地址：',
          trigger: 'blur'
        }],
        tiptopDegree: [{
          required: true,
          message: '请输入学历',
          trigger: 'blur'
        }],
        school: [{
          required: true,
          message: '请输入毕业院校：',
          trigger: 'blur'
        }],
        specialty: [{
          required: true,
          message: '请输入专业名称',
          trigger: 'blur'
        }],
        workID: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur'
        }],
        departmentId: [{
          required: true,
          message: '请选择部门：',
          trigger: 'change'
        }],
        minister: [{
          required: true,
          message: '请选择部门：',
          trigger: 'change'
        }],
        beginDate: [{
          required: true,
          message: '请选择入职日期：',
          trigger: 'change'
        }],
        beginContract: [{
          required: true,
          message: '请选择起始合同日期：',
          trigger: 'change'
        }],
        endContract: [{
          required: true,
          message: '请选择结束合同日期：',
          trigger: 'change'
        }],
        conversionTime: [],
        field125: [{
          required: true,
          message: '请选择合同起始：',
          trigger: 'change'
        }],
        field126: [{
          required: true,
          message: '请选择合同终止：',
          trigger: 'change'
        }],
        engageForm: [{
          required: true,
          message: '聘用形式：不能为空',
          trigger: 'change'
        }],
        wedlock: [{
          required: true,
          message: '婚姻状况：不能为空',
          trigger: 'change'
        }],
      },
      genderOptions: [{
        "label": "男",
        "value": "男"
      }, {
        "label": "女",
        "value": "女"
      }],
      engageFormOptions: [{
        "label": "劳动合同",
        "value": "劳动合同"
      }, {
        "label": "劳务合同",
        "value": "劳务合同"
      }],
      ministerOptions:[{
        "label": "部长",
        "value": "0"
      },{
        "label": "员工",
        "value": "1"
      }],
      wedlockOptions: [{
        "label": "已婚",
        "value": "已婚"
      }, {
        "label": "未婚",
        "value": "未婚"
      }],
      tiptopDegreeOptions: [{
        "label": "博士",
        "value": "博士"
      }, {
        "label": "硕士",
        "value": "硕士"
      }, {
        "label": "本科",
        "value": "本科"
      }, {
        "label": "大专",
        "value": "大专"
      }, {
        "label": "高中",
        "value": "高中"
      }, {
        "label": "初中",
        "value": "初中"
      }, {
        "label": "小学",
        "value": "小学"
      }, {
        "label": "其他",
        "value": "其他"
      }],

      empDialog: false,
    }
  },
  mounted() {
    this.initEmp();
  },
  methods: {
    //导出
    downloadInfo(){
      this.downloadRequest('/employee/basic/export');
    },
    //获得最大工号
    getMaxWorkId(){
      this.getRequest('/employee/basic/get-max-WorkID').then(resp=>{
        if (resp){
          this.empDataApply.workID = resp.obj
        }
      })
    },
    toAddOrEdit(edit){
      if(this.isEmpEdit == false){
        this.$refs.empDataForm.validate((valid) => {
          if (valid) {
            this.postRequest('/employee/basic/addEmp', this.empDataApply).then(resp=> {
              if (resp) {
                this.initEmp()
                this.empDialog = false
              }
            })
          }else{
            this.$message.error('有必填项为空！')
          }
        })
      }
      else{
        this.$refs.empDataForm.validate((valid) => {
          if (valid) {
            this.putRequest('/employee/basic/update',this.empDataApply).then(resp=>{
              if (resp) {
                this.initEmp()
                this.empDialog = false
              }
            })
          }else {
            this.$message.error('有必填项为空！')
          }
        })
      }
    },
    showAdd(edit){
      this.empDialog = true
      this.isEmpEdit = edit
      this.getMaxWorkId()
      this.restDialog()
    },
    showUpdata(index,data,edit){
      this.isEmpEdit = edit
      this.empDialog = true
      Object.assign(this.empDataApply,data)
    },
    restDialog(){
      this.empDataApply.name=null,
          this.empDataApply.gender=null,
          this.empDataApply.birthday=null,
          this.empDataApply.idCard=null,
          this.empDataApply.nationId=null,
          this.empDataApply.politicId=null,
          this.empDataApply.nativePlace=null,
          this.empDataApply.email=null,
          this.empDataApply.phone=null,
          this.empDataApply.address=null,
          this.empDataApply.tiptopDegree=null,
          this.empDataApply.school=null,
          this.empDataApply.specialty=null,
          this.empDataApply.departmentId=null,
          this.empDataApply.beginDate=null,
          this.empDataApply.conversionTime=null,
          this.empDataApply.beginContract=null,
          this.empDataApply.endContract=null,
          this.empDataApply.engageForm=null,
          this.empDataApply.wedlock=null
    },
    deleteEmp(index,data){
      //删除用户
      this.$confirm('此操作将永久删除该['+data.name+']员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/employee/basic/delete/'+data.id).then(resp=>{
          if (resp){
            this.initEmp();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initEmp(type){
      //把后端的currentPage，size传过来
      let url = '/employee/basic/list?currentPage='+this.currentPage + '&size=' +this.size;
      if(type && type == 'change'){
        if (this.empVo.name){
          url +='&name=' +this.empVo.name;
        }
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.allEmp = resp.data
          this.total=resp.total
          console.log(this.allEmp)
        }
      })
      //获得政治面貌
      this.getRequest('/employee/basic/get-politics-status').then(resp => {
        if (resp) {
          this.allStatus = resp
        }
      })
      //获得民族
      this.getRequest('/employee/basic/get-all-Nation').then(resp => {
        if (resp) {
          this.allNation = resp
        }
      })
      //获得部门
      this.getRequest('/employee/basic/allDepartment').then(resp => {
        if (resp) {
          this.allDep = resp
        }
      })
    },
    //当每页条码改变的时候
    currentChange(currentPage){
      this.currentPage= currentPage;
      this.initEmp();
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      //重新查询数据
      this.initEmp();
    },
  },
  handleSelectionChange(val){
    this.multipleSelection = val;
    // console.log(val);
  },
}
</script>

<style>
.slide-fade-enter-active{
  transition: all .8s ease;
}
.slide-fade-leave-active{
  transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>