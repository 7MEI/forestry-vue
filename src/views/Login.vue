<template>
  <div>
    <div class="home_warp">
      <section>
        <!-- 登录;区域 -->
        <div class="form_box">
          <!-- 左边图片 -->
          <img
              class="left_img"
              src="https://forestrys1.oss-cn-guangzhou.aliyuncs.com/2021/10/03/75e48015a2cf4a5eab65ec6747a37291.png"
              alt=""
          />
          <!-- 右侧表单 -->
          <el-form
              :rules="rules"
              :model="loginForm"
              ref="loginForm"
              label-width="60px"
              class="login_form"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <div class="top_box">
              <h2>LOGIN</h2>
              <img
                  class="top_img"
                  src="https://cdn.jsdelivr.net/gh/WaterChen520/Drawingbed/img/20210601110842.png"
              />
            </div>

            <!-- 用户名 -->
            <el-form-item label="账号" prop="username">
              <el-input
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                  clearable
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input
                  type="password"
                  show-password
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
<!--            验证码-->
            <el-form-item prop="code" label="验证">
              <el-input type="text" auto-complete="false" v-model="loginForm.code"
                        placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px">
              </el-input>
              <img :src="captchaUrl" @click="updateCaptcha">
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" style="background-color: #61c091" @click="submitLogin">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <!-- 页脚 -->
      <div class="footer">
        <p>© 2020 Water | <a href="https://qwq3.top/">关于</a></p>
      </div>
    </div>
  </div>
</template>
<script>

    import {getRequest} from "@/utils/api";

    export default {
        name: "Login",
        data() {
            return {
                //加一个时间，保证调用后端 /captcha 接口不是给的同一张验证码
                captchaUrl: '/captcha?time=' + new Date(),
              isEmployee:[],
                loginForm: {
                    //表单默认值
                    username: 'admin',
                    password: '123',
                    code: ''
                },

              userr:'',
                //点击登录的后的加载动画，设置默认关闭状态，点击之后在做处理
                loading: false,
                checked: true,
                rules: {
                    username: [{
                        required: true, message: '请输入用户名', trigger:
                            'blur'
                    }],
                    password: [{
                        required: true, message: '请输入密码', trigger:
                            'blur'
                    }],
                    code: [{
                        required: true, message: '请输入验证码', trigger:
                            'blur'
                    }]
                },
            }
        },
        methods: {

            //点击验证码图片刷新，单机事件js
            updateCaptcha() {
                //点击之后，重新调用这个接口，加一个时间，保证每次发送请求的数据不一样，防止验证码重复返回同一张
                this.captchaUrl = '/captcha?time=' + new Date();
            },
          // 重置按钮方法
          resetLoginForm() {
            // console.log(this);
            this.$refs.loginFormRef.resetFields();
          },
            submitLogin() {
                //验证表单账号、密码、验证码是否全都有数据，如果不合法提示错误信息
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //点击登录后开启的加载等待的css样式  this.loading = true;
                        this.loading = true;
                        //验证登录表单数据，得到该接口的返回值
                        this.postRequest('/login', this.loginForm).then(getReturnValue => {
                            //成功了返回token，没成功返回错误信息，returnToken此时返回的是null
                            //访问接口得到返回值后（不管返回值对象是null，还是登录成功有值），关闭加载动
                            this.loading = false;
                            //判断登录成功后的返回信息存不存在，不存在说明有错误响应被拦截，接口的返回值是空的
                            if (getReturnValue) {
                                //存储登录返回的token
                                const tokenStr = getReturnValue.obj.tokenHead + getReturnValue.obj.token;
                                //将登录成功，拼接后的token存入全局，
                                window.sessionStorage.setItem('tokenStr', tokenStr);
                                // replace 不能回退到上一个界面，跳转页面到home
                                //这里的路径应该是js中的 path，path: '/home',
                                // this.$router.replace('/home');
                              this.$router.replace('/UserHome');

                                // push 可以点击浏览器的返回，回退到上一个界面
                                // this.$router.push("/home")
                            }
                        })
                    } else {
                        //this.$ 引用 element-ui 类库的 css 错误提示样式
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                })
            }
        }
    }

</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  font-family: FiraCode, sans-serif;
}
.home_warp {
  height: 100vh;
  background: url(https://forestrys1.oss-cn-guangzhou.aliyuncs.com/2021/10/03/b0fced9bf8864e88bb35b437b72f0c14.jpg) no-repeat fixed center;
  /*兼容浏览器版本*/
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .form_box {
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    transition: 0.5s;
    margin-top: 77px;
    border-radius: 14px;
    box-shadow: 0 15px 50px rgba(203, 210, 231, 0.521);
    .left_img {
      width: 300px;
      height: 400px;
      border-radius: 18px;
    }
  }
}
.el-form {
  padding-left: 20px;
  .top_box {
    position: absolute;
    width: 370px;
    height: 33px;
    h2 {
      position: absolute;
      bottom: 24px;
      left: 130px;
      font-size: 25px;
      font-weight: 600;
      text-transform: uppercase; /*文本转化为大写*/
      letter-spacing: 2px; /*设置h2的字间距*/
      width: 100%;
      color: #555;
      z-index: 99;
    }
    .top_img {
      width: 10vw;
      position: absolute;
      top: -6vw;
      right: 8vw;
      display: block;
    }
  }
}
.footer {
  display: block;
  width: 100%;
  color: white;
  float: left;
  text-align: center;
  position: fixed;
  bottom: 0;
  margin-bottom: 30px;
  /* background-color: blue; */
  font-family: FiraCode, sans-serif;
  z-index: 99;
  a {
    text-decoration: none;
    color: white;
    &:hover {
      color: rgb(0, 81, 255);
    }
  }
}
//    .loginContainer {
//        border-radius: 15px;
//        background-clip: padding-box;
//        margin: 180px auto;
//        width: 350px;
//        padding: 15px 35px 15px 35px;
//        background: #fff;
//        border: 1px solid #eaeaea;
//        box-shadow: 0 0 25px #cac6c6;
//
//    }
//.photo_box img{
//      width: 100px;
//      height: 100px;
//  margin-left: 127px;
//  margin-top: -60px;
//      /*margin: -65px auto;*/
//      border-radius: 50%;
//}
//    /*//头像*/
//
//
//
//    .loginTitle {
//        margin: 0px auto 40px auto;
//        text-align: center;
//    }
//
//    .loginRemember {
//
//        text-align: left;
//        margin: 0px 0px 15px 0px;
//    }
//
//    .el-form-item__content {
//        display: flex;
//        align-items: center;
//    }
//

</style>