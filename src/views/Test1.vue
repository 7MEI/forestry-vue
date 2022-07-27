<el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
<el-row :gutter="15">
  <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
    <el-col :span="18">
      <el-form-item label="部门名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入部门名" clearable
                  prefix-icon='el-icon-s-marketing' :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="18">
      <el-form-item label="联系电话" prop="departmentId">
        <el-input v-model="formData.departmentId" placeholder="请输入联系电话" clearable
                  prefix-icon='el-icon-phone' :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</el-row>
<div slot="footer">
  <el-button @click="close">取消</el-button>
  <el-button type="primary" @click="handelConfirm">确定</el-button>
</div>
</el-dialog>
