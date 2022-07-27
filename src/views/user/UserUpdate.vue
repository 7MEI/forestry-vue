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
<!--                @crop-upload-suc-->
<!--                &ndash;&gt;-->
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
<!--            <el-form-item label="真实姓名" prop="name">-->
<!--              <el-input v-model="user.name" placeholder="请输入真实姓名" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="用户名" prop="username">-->
<!--              <el-input v-model="user.username" placeholder="请输入用户名" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="密码" prop="password">-->
<!--              <el-input type="password" v-model="user.password" placeholder="请输入密码" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="性别" prop="sex">-->
<!--              <el-radio-group v-model="user.sex" size="medium" style="margin-top: 10px">-->
<!--                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"-->
<!--                          :disabled="item.disabled">{{item.label}}</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--&lt;!&ndash;            <el-form-item label="部门" prop="departmentId">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-select v-model="user.departmentId" placeholder="请选择部门" clearable&ndash;&gt;-->
<!--&lt;!&ndash;                         :style="{width: '100%'}">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-option v-for="(item, index) in departments" :key="item.id" :label="item.name"&ndash;&gt;-->
<!--&lt;!&ndash;                           :value="item.id" :disabled="item.disabled"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                <el-option&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                    v-for="item in departments"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                    :key="item.id"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                    :label="item.name"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                    :value="item.id">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                  <span style="float: left">{{ item.name }}</span>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                </el-option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;              </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--            <el-form-item label="手机号码" prop="phone">-->
<!--              <el-input v-model="user.phone" placeholder="请输入手机" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="地址" prop="email">-->
<!--              <el-input v-model="user.address" placeholder="请输入邮箱" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="家庭联系方式" prop="telephone">-->
<!--              <el-input v-model="user.telephone" placeholder="请输入家庭联系方式" clearable :style="{width: '100%'}">-->
<!--              </el-input>-->
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
<!--// import initUser from '../../views/user/UserInfo'-->
<!--export default {-->
<!--  name: "UserUpdate",-->
<!--  inheritAttrs: false,-->
<!--  components: {-->
<!--    ImageCropper,-->
<!--    PanThumb-->
<!--  },-->
<!--  props: {-->
<!--    UpdateVisible: {-->
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
<!--        picture: null,-->
<!--        username: undefined,-->
<!--        name: undefined,-->
<!--        sex: undefined,-->
<!--        password: undefined,-->
<!--        phone: undefined,-->
<!--        telephone: undefined,-->
<!--        address: null,-->
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
<!--        // departmentId: [{-->
<!--        //   required: true,-->
<!--        //   message: '请输入部门',-->
<!--        //   trigger: 'blur'-->
<!--        // }],-->
<!--        name: [{-->
<!--          required: true,-->
<!--          message: '请输入真实姓名',-->
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
<!--        address: [{-->
<!--          required: true,-->
<!--          message: '请输入地址',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--        phone: [{-->
<!--          required: true,-->
<!--          message: '请输入联系电话',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--       telephone: [{-->
<!--          required: true,-->
<!--          message: '请输入家庭联系电话',-->
<!--          trigger: 'blur'-->
<!--        }],-->
<!--      },-->
<!--      pictureAction: 'https://jsonplaceholder.typicode.com/posts/',-->
<!--      picturefileList: [],-->
<!--      sexOptions: [{-->
<!--        "label": "男",-->
<!--        "value": 0-->
<!--      }, {-->
<!--        "label": "女",-->
<!--        "value": 1-->
<!--      }],-->
<!--    }-->
<!--  },-->
<!--  computed: {},-->
<!--  watch: {// 监听 UpdateVisible 改变-->
<!--    UpdateVisible(oldVal, newVal) {-->
<!--      this.showDialog = this.UpdateVisible-->
<!--    },-->
<!--  },-->
<!--  created() {-->

<!--  },-->
<!--  mounted() {-->

<!--  },-->
<!--  methods: {-->

<!--    //添加用户-->
<!--    // addUser(){-->
<!--    //   if (this.user){-->
<!--    //     this.postRequest('/system/admin/addAdmin',this.user).then(resp=>{-->
<!--    //       if (resp){-->
<!--    //-->
<!--    //       }-->
<!--    //       this.$parent.initUser();-->
<!--    //       this.$parent.initDepartment();-->
<!--    //       this.$emit('changeShow','false')-->
<!--    //     })-->
<!--    //   }else {-->
<!--    //     this.$message.error('有必填项为空！')-->
<!--    //   }-->
<!--    // },-->
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
<!--          this.showDialog=false;-->
<!--          this.addUser();-->
<!--          // this.$parent.initUser();-->
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
<!--      console.log("上传成功")-->
<!--      console.log(data)-->
<!--      const oldImage = this.image-->
<!--      this.imagecropperShow = false-->
<!--      this.user.picture = this.image = data.data.url;-->
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
<!--    //删除被替换的头像-->
<!--    deleteAvatar(oldImage) {-->
<!--      this.postRequest('/deleteImgFile').then(resp => {-->
<!--        if (resp) {-->

<!--          console.log("删除以前头像")-->
<!--          // this.Users = resp;-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    // async deleteAvatar(oldImage){-->
<!--    //    const {data} = await deleteImgFile(oldImage)-->
<!--    //   console.log(data)-->
<!--    // }-->
<!--    }-->
<!--}-->

<!--</script>-->
<!--<style>-->
<!--.el-upload__tip {-->
<!--  line-height: 1.2;-->
<!--}-->

<!--</style>-->
