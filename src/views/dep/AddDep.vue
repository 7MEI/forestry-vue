<!--<template>-->
<!--  <div>-->
<!--    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="添加用户信息">-->
<!--      <el-row :gutter="15">-->
<!--        <el-form ref="elForm" :model="user" :rules="rules" size="medium" label-width="100px">-->
<!--          <el-col :span="24">-->
<!--            &lt;!&ndash; 用户头像 &ndash;&gt;-->
<!--            <el-form-item label="头像">-->

<!--              &lt;!&ndash; 头衔缩略图 &ndash;&gt;-->
<!--              <pan-thumb :image="image"/>-->
<!--              &lt;!&ndash; 文件上传按钮 &ndash;&gt;-->
<!--              <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像-->
<!--              </el-button>-->

<!--              &lt;!&ndash;-->
<!--                v-show：是否显示上传组件-->
<!--                :key：类似于id，如果一个页面多个图片上传控件，可以做区分-->
<!--                :url：后台上传的url地址-->
<!--                @close：关闭上传组件-->
<!--                @crop-upload-success：上传成功后的回调 &ndash;&gt;-->
<!--              <image-cropper-->
<!--                  v-show="imagecropperShow"-->
<!--                  :width="300"-->
<!--                  :height="300"-->
<!--                  :key="imagecropperKey"-->
<!--                  :url="'/uploadImgFile'"-->
<!--                  field="file"-->
<!--                  @close="closeImage"-->
<!--                  @crop-upload-success="cropSuccess"/>-->

<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="用户名" prop="username">-->
<!--              <el-input v-model="user.username" placeholder="请输入用户名" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="昵称" prop="nickname">-->
<!--              <el-input v-model="user.nickname" placeholder="请输入昵称" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="密码" prop="password">-->
<!--              <el-input v-model="user.password" placeholder="请输入密码" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="手机" prop="phoneNumber">-->
<!--              <el-input v-model="user.phoneNumber" placeholder="请输入手机" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="部门" prop="departmentId">-->
<!--              <el-select v-model="user.departmentId" placeholder="请选择部门" clearable-->
<!--                         :style="{width: '100%'}">-->
<!--                <el-option v-for="(item, index) in departments" :key="item.id" :label="item.name"-->
<!--                           :value="item.id" :disabled="item.disabled"></el-option>-->
<!--&lt;!&ndash;                <el-option&ndash;&gt;-->
<!--&lt;!&ndash;                    v-for="item in departments"&ndash;&gt;-->
<!--&lt;!&ndash;                    :key="item.id"&ndash;&gt;-->
<!--&lt;!&ndash;                    :label="item.name"&ndash;&gt;-->
<!--&lt;!&ndash;                    :value="item.id">&ndash;&gt;-->
<!--&lt;!&ndash;                  <span style="float: left">{{ item.name }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-option>&ndash;&gt;-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="性别" prop="sex">-->
<!--              <el-radio-group v-model="user.sex" size="medium">-->
<!--                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"-->
<!--                          :disabled="item.disabled">{{item.label}}</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="邮箱" prop="email">-->
<!--              <el-input v-model="user.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="生日" prop="birth">-->
<!--              <el-date-picker v-model="user.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"-->
<!--                              :style="{width: '100%'}" placeholder="请选择生日" clearable></el-date-picker>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-form>-->
<!--      </el-row>-->
<!--      <div slot="footer">-->
<!--        <el-button @click="close">取消</el-button>-->
<!--        <el-button type="primary" @click="handelConfirm">确定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import ImageCropper from '../../components/ImageCropper'-->
<!--import PanThumb from '../../components/PanThumb'-->
<!--import {deleteImgFile, saveUser} from "@/api/users";-->

<!--export default {-->
<!--  inheritAttrs: false,-->
<!--  components: {-->
<!--    ImageCropper,-->
<!--    PanThumb-->
<!--  },-->
<!--  props: {-->
<!--    addOrUpdateVisible: {-->
<!--      type: Boolean,-->
<!--      default: false-->
<!--    },-->
<!--    departments:{-->
<!--      type: Array,-->
<!--      default: () =>[],-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      user: {-->
<!--        avatar: null,-->
<!--        username: undefined,-->
<!--        departmentId: undefined,-->
<!--        nickname: undefined,-->
<!--        sex: undefined,-->
<!--        password: undefined,-->
<!--        email: undefined,-->
<!--        phoneNumber: undefined,-->
<!--        birth: null,-->
<!--      },-->
<!--     -->
<!--      showDialog: false,-->
<!--      imagecropperShow: false, // 是否显示上传组件-->
<!--      imagecropperKey: 0, // 上传组件id-->
<!--      //https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191-->
<!--      image: 'https://forestrys.oss-cn-guangzhou.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720211005134058.jpg',-->
<!--      rules: {-->
<!--        username: [{-->
<!--          required: true,-->
<!--          message: '请输入用户名',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        departmentId: [{-->
<!--          required: true,-->
<!--          message: '请输入部门',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        nickname: [{-->
<!--          required: true,-->
<!--          message: '请输入昵称',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        sex: [{-->
<!--          required: true,-->
<!--          message: '性别不能为空',-->
<!--          trigger: 'change'-->
<!--        }],-->
<!--        password: [{-->
<!--          required: true,-->
<!--          message: '请输入密码',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        email: [{-->
<!--          required: true,-->
<!--          message: '请输入邮箱',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        phoneNumber: [{-->
<!--          required: true,-->
<!--          message: '请输入联系电话',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        birth: [{-->
<!--          required: true,-->
<!--          message: '请选择出生日期',-->
<!--          trigger: 'change'-->
<!--        }],-->
<!--      },-->
<!--      avatarAction: 'https://jsonplaceholder.typicode.com/posts/',-->
<!--      avatarfileList: [],-->
<!--      sexOptions: [{-->
<!--        "label": "男",-->
<!--        "value": 1-->
<!--      }, {-->
<!--        "label": "女",-->
<!--        "value": 2-->
<!--      }],-->
<!--    }-->
<!--  },-->
<!--  computed: {},-->
<!--  watch: {// 监听 addOrUpdateVisible 改变-->
<!--    addOrUpdateVisible(oldVal, newVal) {-->
<!--      this.showDialog = this.addOrUpdateVisible-->
<!--    },-->
<!--  },-->
<!--  created() {-->
<!--  },-->
<!--  mounted() {-->
<!--  },-->
<!--  methods: {-->
<!--    //添加用户-->
<!--    async addUser(){-->
<!--      const {data: res } = await saveUser(this)-->
<!--      if(res.code ==200){-->
<!--        this.$notify.success({-->
<!--          title: '操作成功',-->
<!--          message: '用户添加成功',-->
<!--        })-->
<!--      //  关闭-->
<!--        this.$emit('changeShow','false')-->
<!--        this.user = {}-->
<!--        // await this.$parent.getfindUser()-->
<!--        this.$emit('getfindUser')-->
<!--        // await this.$parent.getfindDeptAndCount()-->
<!--        this.$emit('getfindDeptAndCount')-->
<!--      }else {-->
<!--        return this.$message.error('用户添加失败：'+ res.message)-->
<!--      }-->
<!--    },-->
<!--    // 弹出框关闭后触发-->
<!--     handleClose() {-->
<!--      // 子组件调用父组件方法，并传递参数-->
<!--      this.$emit('changeShow', 'false')-->
<!--      },-->
<!--      onOpen() {-->
<!--      },-->
<!--      onClose() {-->
<!--        this.$refs['elForm'].resetFields()-->
<!--        this.$emit('changeShow', 'false')-->
<!--      },-->
<!--      close() {-->
<!--        this.$emit('update:visible', false)-->
<!--        this.$emit('changeShow', 'false')-->
<!--      },-->
<!--      handelConfirm() {-->
<!--        this.$refs['elForm'].validate(valid => {-->
<!--          if (!valid) {-->
<!--            return-->
<!--          }-->
<!--          console.log(this.user)-->
<!--          this.addUser()-->
<!--        })-->
<!--      },-->
<!--      avatarBeforeUpload(file) {-->
<!--        let isRightSize = file.size / 1024 / 1024 < 2-->
<!--        if (!isRightSize) {-->
<!--          this.$message.error('文件大小超过 2MB')-->
<!--        }-->
<!--        return isRightSize-->
<!--      },-->
<!--    // 上传成功后的回调函数-->
<!--    cropSuccess(data) {-->
<!--      console.log(data)-->
<!--      var oldImage = this.image-->
<!--      this.imagecropperShow = false-->
<!--      this.user.avatar = this.image = data.data.url;-->
<!--      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果-->
<!--      this.imagecropperKey = this.imagecropperKey + 1-->
<!--    //  上传成功之后删除之前的头像-->
<!--      this.deleteAvatar(oldImage);-->

<!--    },-->

<!--    // 关闭上传组件-->
<!--    closeImage() {-->
<!--      this.imagecropperShow = false-->
<!--      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果-->
<!--      this.imagecropperKey = this.imagecropperKey + 1-->
<!--    },-->
<!--    async deleteAvatar(oldImage){-->
<!--       const {data} = await deleteImgFile(oldImage)-->
<!--      console.log(data)-->
<!--    }-->
<!--    }-->
<!--}-->

<!--</script>-->
<!--<style>-->
<!--.el-upload__tip {-->
<!--  line-height: 1.2;-->
<!--}-->

<!--</style>-->
